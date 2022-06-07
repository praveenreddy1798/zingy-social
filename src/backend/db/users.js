import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profilePic: null,
    portfolio: null,
    bio: "Traveller",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Praveen",
    lastName: "Kumar",
    username: "praveenkumar",
    password: "@praveenkumar123",
    bio: "Software Engineer trying to make a difference",
    portfolio: "https://www.google.com",
    profilePic:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Darshan",
    lastName: "Reddy",
    username: "darshanreddy",
    password: "darshanreddy123",
    profilePic: null,
    portfolio: "https://www.facebook.com",
    bio: "Sportsman",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubam",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "shubhamsoni12345",
    profilePic: null,
    portfolio: null,
    bio: null,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Soham",
    lastName: "Shah",
    username: "sohamshah",
    password: "sohamshah12345",
    portfolio: 'https://www.twitter.com',
    bio: "Love every aspect of nature",
    profilePic:
      "https://res.cloudinary.com/praveen-kumar/image/upload/v1613891306/yxqbzhfxbfrlwcmjmqty.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
