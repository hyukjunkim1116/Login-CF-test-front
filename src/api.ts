import Cookie from "js-cookie";
import axios from "axios";
export interface ICreatePhotoVariables {
  description: string;
  file: string;
}
export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}
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
export const googleLogin = (code: string) =>
  instance
    .post(
      `users/google`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
export const getMe = () =>
    instance.get(`users/me/`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);






//to django , give me one time url!
export const getUploadURL = () =>
    instance
      .post(`medias/photos/get-url`, null, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data);

      //real upload
export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {

        const form = new FormData();
        form.append("file", file[0]);
        console.log(file[0])
        return axios
          .post(uploadURL, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => response.data);
      };

export const createPhoto = ({
        description,
        file,
      }: ICreatePhotoVariables) =>
        instance
          .post(
            `medias/photos/get-photos`,
            { description, file },
            {
              headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
              },
            }
          )
          .then((response) => response.data);

          //백엔드에 생성된 사진 프론트로 불러오기
export const getPhotos = () =>
          instance.get("medias/photos/get-photos").then((response) => response.data);