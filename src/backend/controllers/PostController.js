import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to post are present here.
 * */

/**
 * This handler handles gets all posts in the db.
 * send GET Request at /api/posts
 * */

export const getAllpostsHandler = function () {
  return new Response(200, {}, { posts: this.db.posts });
};

/**
 * This handler gets post by postId in the db.
 * send GET Request at /api/posts/:postId
 * */

export const getPostHandler = function (schema, request) {
  const postId = request.params.postId;
  try {
    const post = schema.posts.findBy({ _id: postId }).attrs;
    return new Response(200, {}, { post });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler gets posts of a user in the db.
 * send GET Request at /api/posts/user/:username
 * */

export const getAllUserPostsHandler = function (schema, request) {
  const { username } = request.params;
  try {
    const posts = schema.posts.where({ username })?.models;
    return new Response(200, {}, { posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles creating a post in the db.
 * send POST Request at /api/user/posts/
 * body contains {title and description}
 * */

export const createPostHandler = async function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postData = request.requestBody;
    const title = postData.get("title");
    const description = postData.get("description");
    let post = {
      _id: uuid(),
      title: title,
      description: description,
      likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: [],
      },
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic || null,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    if (postData.get("file") !== "null") {
      postData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );
      postData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      const { url } = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: postData,
        }
      )
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          console.log(err);
        });
      post = { ...post, photo: url };
    }
    this.db.posts.insert(post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a post in the db.
 * send POST Request at /api/posts/edit/:postId
 * body contains { postData }
 * */
export const editPostHandler = async function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ _id: postId }).attrs;
    if (post.username !== user.username) {
      return new Response(
        400,
        {},
        {
          errors: ["Cannot edit a Post doesn't belong to the logged in User."],
        }
      );
    }
    const postData = request.requestBody;
    const title = postData.get("title");
    const description = postData.get("description");
    const isPicRemoved = postData.get("isPicRemoved");
    post = {
      ...post,
      _id: postId,
      title,
      description,
      photo: isPicRemoved ? null : post.photo,
    };
    if (!(postData.get("file") === null)) {
      postData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );
      postData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      const { url } = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: postData,
        }
      )
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          console.log(err);
        });
      post = { ...post, photo: url };
    }
    this.db.posts.update({ _id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles liking a post in the db.
 * send POST Request at /api/posts/like/:postId
 * */

export const likePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;

    const post = schema.posts.findBy({ _id: postId }).attrs;

    if (
      post.likes.likedBy.some((currUser) => currUser.username === user.username)
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot like a post that is already liked. "] }
      );
    }

    post.likes.dislikedBy = post.likes.dislikedBy.filter(
      (currUser) => currUser.username !== user.username
    );

    post.likes.likeCount += 1;

    post.likes.likedBy.push(user);

    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });

    return new Response(201, {}, { posts: this.db.posts, post });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles disliking a post in the db.
 * send POST Request at /api/posts/dislike/:postId
 * */

export const dislikePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ _id: postId }).attrs;
    if (post.likes.likeCount === 0) {
      return new Response(
        400,
        {},
        { errors: ["Cannot decrement like less than 0."] }
      );
    }
    if (
      post.likes.dislikedBy.some(
        (currUser) => currUser.username === user.username
      )
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot dislike a post that is already disliked. "] }
      );
    }
    post.likes.likeCount -= 1;
    const updatedLikedBy = post.likes.likedBy.filter(
      (currUser) => currUser.username !== user.username
    );
    post.likes.dislikedBy.push(user);
    post = { ...post, likes: { ...post.likes, likedBy: updatedLikedBy } };
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts, post });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles deleting a post in the db.
 * send DELETE Request at /api/user/posts/:postId
 * */
export const deletePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ _id: postId }).attrs;
    if (post.username !== user.username) {
      return new Response(
        400,
        {},
        {
          errors: [
            "Cannot delete a Post doesn't belong to the logged in User.",
          ],
        }
      );
    }
    this.db.posts.remove({ _id: postId });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
