import React from 'react'
import Profile from '../Components/Profile'
import ProfileVideoContainer from '../Components/ProfileVideoContainer';
import { getUserById } from '../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
function ProfileInfo() {
  const [response, SetResponse] = React.useState(null)
  const [personal, SetPersonal] = React.useState(null)
  const [status, SetStatus] = React.useState(true)
  const dispatch = useDispatch()
  const { isLoading, isError } = useSelector((state) => state.user)
  const location = useLocation()

  React.useEffect(() => {
    if (location.state.User_id != localStorage.getItem("userid")) {
      SetStatus(false)
    }
    async function getData() {
      try {


        const response = await dispatch(getUserById({ Id: location.state.User_id })).unwrap()
        console.log(response)
        SetResponse(response)
        SetPersonal({ name: response.name, user_id: response._id, profile: response.profileImage })




      } catch (err) {
        console.log(err)
      }

    }
    getData()

  }, [])
  if (isLoading) {
    return <h1>Loading</h1>
  }
  else if (isError) {
    return <h1>Error</h1>
  }
  return (
    <div>
      <Profile data={response} fuc={status} />
      <ProfileVideoContainer  Data={response ? { video: response.videos, personal: personal,status:status } : null} />
    </div>
  )
}

export default ProfileInfo