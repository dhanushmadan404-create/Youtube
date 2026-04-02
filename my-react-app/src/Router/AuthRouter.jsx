import { Children } from 'react'

import { lazy } from 'react'
const Login = lazy(() => import('../Components/Login'))
const Register = lazy(() => import('../Components/Register'))
import Auth from '../Layout/Auth'


const AuthRouter =
{
    path: '/',
    element: <Auth />,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]
}

export default AuthRouter