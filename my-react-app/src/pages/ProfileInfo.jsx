import React from 'react'
import Profile from '../Components/Profile'
import VideoContainer from '../Components/VideoContainer'
import { getUserByEmail } from '../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function ProfileInfo() {
  const [response,SetResponse]=React.useState(null)
  const dispatch = useDispatch()
  const { getByEmail, isLoading, isError } = useSelector((state) => state.user)
  React.useEffect(() => {
    async function getData() {
      try {
        const  email=localStorage.getItem("email")
        const response = await dispatch(getUserByEmail({email:email})).unwrap()
        console.log(response)
        SetResponse(response)

      } catch (err) {
        console.log(err)
      }

    }
    getData()

  }, [dispatch])
  if (isLoading) { return <h1>Loading</h1> }
  else if (isError) {
    return <h1>Error</h1>
  }
  return (
    <div>
      <Profile data={response} />
      <VideoContainer />


    </div>
  )
}

export default ProfileInfo