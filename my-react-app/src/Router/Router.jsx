import { createBrowserRouter } from 'react-router-dom'
import AuthRouter from "./AuthRouter";
import MainRouter from './MainRouter';

const Router = createBrowserRouter([AuthRouter, MainRouter])

export default Router