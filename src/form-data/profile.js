export const profileFormDetails = [
  {
    label: "First name",
    name: "firstName",
    rules: [{ required: true, message: "Please enter your first name!" }],
  },
  {
    label: "Last name",
    name: "lastName",
    rules: [{ required: true, message: "Please enter your last name!" }],
  },
  {
    label: "Bio",
    name: "bio",
    rules: [{ required: false }],
  },
  {
    label: "Portfolio",
    name: "portfolio",
    rules: [
      {
        type: "url",
        message: "Please enter a valid URL",
      },
    ],
  },
  {
    label: "Update Profile Pic",
    name: "profilePic",
    type: "file",
    accept: ".png, .jpg, .jpeg",
  },
];
