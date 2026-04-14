import React, { useCallback, useEffect, useState } from 'react';
import Profile from '../Components/Profile';
import ProfileVideoContainer from '../Components/ProfileVideoContainer';
import { getUserById } from '../Redux/Slice/UserSlice';
import { getFollowers, getFollowing } from '../Redux/Slice/FollowerSlice'; // Removed checkFollowers - doesn't exist
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function ProfileInfo() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [response, setResponse] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Renamed from 'status' for clarity
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // FIXED: Get current user ID once
  const currentUserId = localStorage.getItem("userid");
  const profileUserId = location.state?.User_id;

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
        setResponse(userData);
        console.log(userData)
        // Set personal info
        setPersonal({
          name: userData.name,
          user_id: userData._id,
          profile: userData.profileImage
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
        data={response} 
        fuc={isOwner}  // 'fuc' indicates if it's the user's own profile
        isSubscribed={isSubscribed} 
        setIsSubscribed={setIsSubscribed}
        subscriberCount={subscriberCount}
      />
      <ProfileVideoContainer 
        Data={{ 
          video: response.videos || [], 
          personal: personal, 
          status: isOwner 
        }} 
      />
    </div>
  );
}

export default ProfileInfo;
