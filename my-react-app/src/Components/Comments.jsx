import React, { useRef, useEffect } from 'react';
import '../styles/Comments.css';
import CommentCard from './CommentCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getVideoReviews, removeReview } from '../Redux/Slice/ReviewSlice';

function Comments({ videoId }) {
  const commentRef = useRef();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.review?.videoReviews) || [];
  const currentUserId = localStorage.getItem("userid");

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoReviews(videoId));
    }
  }, [videoId, dispatch]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentText = commentRef.current.value;
    if (!commentText.trim()) return;

    const body = {
      video_id: videoId,
      user_id: currentUserId,
      comment: commentText,
      rating: 5 // Default rating
    };

    const action = await dispatch(createReview(body));
    if (createReview.fulfilled.match(action)) {
      commentRef.current.value = "";
      dispatch(getVideoReviews(videoId));
    }
  };

  const handleDelete = async (reviewId) => {
    const action = await dispatch(removeReview(reviewId));
    if (removeReview.fulfilled.match(action)) {
      dispatch(getVideoReviews(videoId));
    }
  };

  return (
    <div className='CommentContainer'>
      <div className='hero'>
        <h5 className="typography-h5">Comments</h5>
      </div>

      <form className="comment-form" onSubmit={handleAddComment} style={{ marginBottom: '20px' }}>
        <div className="search-wrapper" style={{ display: 'flex', gap: '10px' }}>
          <input
            ref={commentRef}
            type="text"
            placeholder="Add a comment..."
            className="custom-input"
          />
          <button type="submit" className="custom-btn" style={{ padding: '8px 16px' }}>Post</button>
        </div>
      </form>

      <div className='Comments'>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard 
              key={comment._id} 
              data={comment} 
              onDelete={() => handleDelete(comment._id)}
              isOwner={comment.user_id === currentUserId}
            />
          ))
        ) : (
          <p className="typography-caption">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default Comments;