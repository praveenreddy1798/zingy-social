import axios from "axios";

export const loginService = async (payload) =>
  await axios.post("/api/auth/login", {
    ...payload,
  });

export const signupService = async (payload) =>
  await axios.post("/api/auth/signup", {
    ...payload,
  });
