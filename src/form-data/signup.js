export const signupFormDetails = [
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
    label: "Username",
    name: "username",
    rules: [{ required: true, message: "Please enter your username!" }],
  },
  {
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please enter your password!" }],
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    dependencies: ["password"],
    rules: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ],
  },
];
