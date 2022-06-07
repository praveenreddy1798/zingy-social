import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    title: "Fitness",
    description: "Keeping urself fit is the most important aspect",
    photo:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "praveenkumar",
    firstName: "Praveen",
    lastName: "Kumar",
    profilePic:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
    createdAt: "2022-04-06T23:21:11+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        profilePic: null,
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "praveenkumar",
        text: "Interesting hehe",
        profilePic:
          "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        profilePic:
          "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    title: "Nature",
    description: "Nature is love",
    photo:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1604228086/sample.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    profilePic: null,
    username: "shubhamsoni",
    firstName: "Shubham",
    lastName: "Soni",
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Amazing",
        profilePic: null,
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Fabulous!",
        profilePic:
          "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-03-06T23:21:11+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    title: "Wanderer",
    description: "I am a wanderer",
    photo:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1604306985/myldey5p92fq1mg3ccxb.jpg",
    likes: {
      likeCount: 2,
      likedBy: ["adarshbalika", "sohamshah"],
      dislikedBy: [],
    },
    profilePic: null,
    username: "shubhamsoni",
    firstName: "Shubham",
    lastName: "Soni",
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Amazing",
        profilePic: null,
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Fabulous!",
        profilePic:
          "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-03-06T23:21:11+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    title: "Labrador",
    description: "My lifeline",
    photo:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1613900365/ueqmzwexpacsrrcpbgms.jpg",
    likes: {
      likeCount: 1,
      likedBy: ["adarshbalika"],
      dislikedBy: [],
    },
    profilePic: null,
    username: "shubhamsoni",
    firstName: "Shubham",
    lastName: "Soni",
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Amazing",
        profilePic: null,
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Fabulous!",
        profilePic:
          "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-01-06T23:21:11+05:30",
    updatedAt: formatDate(),
  },
];
