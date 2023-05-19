import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import GoogleConfirm from "./routes/GoogleConfrim";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
        path: "social",
        children: [
            {
            path: "github",
            element: <GithubConfirm />,
            },
            {
            path: "kakao",
            element: <KakaoConfirm />,
            },
            {
            path: "google",
            element: <GoogleConfirm />,
            },
        ],
        }
      ]
    }
]);
export default router;