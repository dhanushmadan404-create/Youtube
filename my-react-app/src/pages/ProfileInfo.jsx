import React, { useCallback, useEffect, useRef, useState } from 'react';
import Profile from '../Components/Profile';
import ProfileVideoContainer from '../Components/ProfileVideoContainer';
import { getUserById } from '../Redux/Slice/UserSlice';
import { getFollowers, getFollowing ,checkFollowers} from '../Redux/Slice/FollowerSlice'; // Removed checkFollowers - doesn't exist
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function ProfileInfo() {
  const dispatch = useDispatch();
  const [searchparams]=useSearchParams()
    const profileUserId =searchparams.get("user_id")
  console.log(profileUserId)
  const [response, setResponse] = useState(null);
  const [personal, setPersonal] = useState(null);

  const [isOwner, setIsOwner] = useState(false); // Renamed from 'status' for clarity
  const [isSubscripted,setIsSubscribed]=useState()
  // isSubscripted
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // FIXED: Get current user ID once
  const currentUserId = localStorage.getItem("userid");


  // FIXED: Properly defined check function with useCallback
  const checkSubscriptionStatus = useCallback(async (targetUserId) => {
    if (!currentUserId || !targetUserId || targetUserId === currentUserId) return;
    
    try {
      const followingList = await dispatch(getFollowing(currentUserId)).unwrap();
      const isFollowed = followingList.some((f) => f.user_id === targetUserId);
      setIsSubscribed(isFollowed);
    } catch (err) {
      console.error("Check subscription error:", err);
    }
  }, [dispatch, currentUserId]);

  // FIXED: Fetch subscriber count
  const fetchSubscriberCount = useCallback(async (userId) => {
    try {
      const followersResponse = await dispatch(getFollowers(userId)).unwrap();
      setSubscriberCount(followersResponse?.length || 0);
    } catch (err) {
      console.error("Fetch subscribers error:", err);
      setSubscriberCount(0);
    }
  }, [dispatch]);

  useEffect(() => {
    // FIXED: Early return if no userId provided
    if (!profileUserId) {
      console.error("No user ID provided in location state");
      setIsLoading(false);
      return;
    }

    // FIXED: Determine if viewing own profile
    const isOwnProfile = profileUserId === currentUserId;
    setIsOwner(isOwnProfile);

    async function getData() {
      setIsLoading(true);
      try {
        // Fetch user data
        const userData = await dispatch(getUserById({ Id: profileUserId })).unwrap();
        console.log("start")
        const check=await dispatch(checkFollowers({body:{user_id:currentUserId,fan_id:profileUserId}}))
        
        setIsSubscribed(check.payload)
        console.log(check)
        setResponse(userData);
        console.log(userData)
        // Set personal info
        setPersonal({
          name: userData.result.name,
          user_id: userData.result._id,
          profile: userData.result.profileImage,
          followers:userData.subscribers
        });

        // Fetch subscriber count
        await fetchSubscriberCount(profileUserId);

        // Check if subscribed (only if viewing someone else's profile)
        if (!isOwnProfile) {
          await checkSubscriptionStatus(profileUserId);
        }

      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
    
    // REMOVED: duplicate check() call - now integrated into getData
  }, [profileUserId, currentUserId, dispatch, checkSubscriptionStatus, fetchSubscriberCount]);

  // Loading state
  if (isLoading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading profile...</div>;
  }

  // Error state - no response
  if (!response) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Failed to load profile</div>;
  }

  return (
    <div>
      <Profile 
        data={response.result}
        subCount={response.subscribers} 
        fuc={isOwner}  
        isSubscribed={isSubscripted} 
        setIsSubscribed={setIsSubscribed}
      />
      <ProfileVideoContainer 
        Data={{ 
          video: response.result.videos || [], 
          personal: personal, 
          status: isOwner 
        }} 
      />
    </div>
  );
}

export default ProfileInfo;
