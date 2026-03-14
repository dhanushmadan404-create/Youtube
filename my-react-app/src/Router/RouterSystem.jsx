// Router System
import Layout from "../Layout/Layout"
import Auth from "../pages/Auth"
import EditProfile from "../pages/EditProfile"
import Following from "../pages/Following"
import Home from "../pages/Home"
import ProfileInfo from "../pages/ProfileInfo"
import SearchBar from "../pages/SearchBar"
import Upload from "../pages/Upload"
import VdoPlayer from "../pages/VdoPlayer"

export const RouterSystem = [
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: "/",
            element: <Home />

        }, {
            path: "/following",
            element: <Following />

        },
        {
            path:'/profile',
            element:<ProfileInfo/>
        },{
            path:"/auth",
            element:<Auth/>
        },{
            path:"/search",
            element:<SearchBar/>
        },{
            path:"/editProfile",
            element:<EditProfile/>
        },{
            path:"/upload",
            element:<Upload/>
        },{
            path:"/vdoplayer",
            element:<VdoPlayer/>
        }]
    }
] 