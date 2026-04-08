import React from 'react'
import Profile from '../Components/Profile'
import ProfileVideoContainer from '../Components/ProfileVideoContainer';
import { getUserById} from '../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function ProfileInfo() {
  const [response,SetResponse]=React.useState(null)
    const [personal,SetPersonal]=React.useState(null)

  const dispatch = useDispatch()
  const { isLoading, isError } = useSelector((state) => state.user)
  React.useEffect(() => {
    async function getData() {
      try {
        const  id=localStorage.getItem("userid")
        console.log(`hello:${id}`)
        const response = await dispatch(getUserById({Id:id})).unwrap()
        console.log(response)
        SetResponse(response)
        SetPersonal({name:response.name,user_id:response._id,profile:response.profile_img})

       
      } catch (err) {
        console.log(err)
      }

    }
    getData()

  }, [dispatch])
  if (isLoading) {
    return <h1>Loading</h1> }
    else if (isError) {
      return <h1>Error</h1>
    }
  return (
    <div>
      <Profile data={response} />
<ProfileVideoContainer Data={response?{video:response.videos,personal:personal}:null}/>
    </div>
  )
}

export default ProfileInfo