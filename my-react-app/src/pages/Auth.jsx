import React from 'react'
import '../styles/Auth.css'
import Login from '../components/Login'
import Register from '../components/Register'
function Auth() {
  const [isLogin, setIsLogin] = React.useState(true)
  return (
    <div className='Auth'>
{
  isLogin?<Login SetStatus={setIsLogin}/>:<Register SetStatus={setIsLogin}/>
}

    </div>
  )
}

export default Auth