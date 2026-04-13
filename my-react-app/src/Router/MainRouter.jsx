import { lazy } from "react";
import { Navigate } from "react-router-dom";

const CheckRouter = lazy(() => import("./CheckRouter"));
// Router System
const Layout = lazy(() => import("../Layout/Layout"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Following = lazy(() => import("../pages/Following"));
const Home = lazy(() => import("../pages/Home"));
const ProfileInfo = lazy(() => import("../pages/ProfileInfo"));
const SearchBar = lazy(() => import("../pages/SearchBar"));
const Upload = lazy(() => import("../pages/Upload"));
const VdoPlayer = lazy(() => import("../pages/VdoPlayer"));
const About = lazy(() => import("../pages/About"));
const CategoryContain = lazy(() => import("../pages/CategoryContainer"));
const UpdateVideo = lazy(() => import("../pages/UpdateVideo"));

const MainRouter = {
    //parent "/"    /following
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/dashboard",

            element: (
                <CheckRouter>
                    <Home />
                </CheckRouter>
            ),
        },
        {
            path: "/following",
            element: (
                <CheckRouter>
                    <Following />
                </CheckRouter>
            ),
        },
        {
            path: "/about",
            element: (
                <CheckRouter>

                    <About />
                </CheckRouter>
            ),
        },
        {
            path: "/profile",
            element: (
                <CheckRouter>
                    <ProfileInfo />
                </CheckRouter>
            ),
        },
        {
            path: "editProfile",
            element: (
                <CheckRouter>
                    <EditProfile />
                </CheckRouter>
            ),
        },
        {
            path: "/search",
            element: (
                <CheckRouter>
                    <SearchBar />
                </CheckRouter>
            ),
        },
        {
            path: "/upload",
            element: (
                <CheckRouter>
                    <Upload />
                </CheckRouter>
            ),
        },
        {
            path: "/vdoplayer",
            element: (
                <CheckRouter>
                    <VdoPlayer />
                </CheckRouter>
            ),
        },
        {
            path: "/category",
            element: (
                <CheckRouter>
                    <CategoryContain />
                </CheckRouter>
            ),
        }, {
            path: "/updateVideo",
            element: (
                <CheckRouter>
                    <UpdateVideo />
                </CheckRouter>
            ),
        },
        {
            path: "/error",
            element: <h1>404 Not Found</h1>,
        },
    ],
};

export default MainRouter;