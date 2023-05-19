import Cookie from "js-cookie";
// import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
// import { formatDate } from "./lib/utils";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    //   process.env.NODE_ENV === "development"
    //     ? "http://127.0.0.1:8000/api/v1/"
    //     : "https://backend.https://airbnbclonetest.xyz/api/v1/",
    withCredentials: true,
  });

export const githubLogIn = (code:string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )

    .then((response) => response.status)
    

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const getMe = () =>
    instance.get(`users/me`).then((response) => response.data);


export const logOut = () =>
  instance
    .post(`users/log-out/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
