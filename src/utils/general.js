/* eslint-disable default-case */
import dayjs from "dayjs";

export const checkIfAlreadyUpvoted = (votes, loggedUsername) =>
  votes.upvotedBy.map((user) => user.username).includes(loggedUsername);

export const checkIfAlreadyDownvoted = (votes, loggedUsername) =>
  votes.downvotedBy.map((user) => user.username).includes(loggedUsername);

export const getSortedPosts = (posts, sortBy) => {
  switch (sortBy) {
    case "LATEST":
      return [...posts].sort((postA, postB) =>
        dayjs(postA.createdAt).isBefore(dayjs(postB.createdAt)) ? 1 : -1
      );

    case "OLDEST":
      return [...posts].sort((postA, postB) =>
        dayjs(postA.createdAt).isAfter(dayjs(postB.createdAt)) ? 1 : -1
      );
    case "TRENDING":
      return [...posts].sort(
        (postA, postB) => postB.likes.likeCount - postA.likes.likeCount
      );
  }
};
