import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos } from '../Redux/Slice/VIdeoSlice';
import VideoContainer from '../Components/VideoContainer';
import { useSearchParams } from 'react-router-dom';

function SearchBar() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const searchResult = useSelector((state) => state.video.searchResult);
  const isLoading = useSelector((state) => state.video.isLoading);

  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      dispatch(searchVideos(query));
    }
  }, [query, dispatch]);

  return (
    <div className='SearchPage' style={{ padding: '20px', minHeight: '80vh' }}>

      {isLoading ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          Searching...
        </div>
      ) : searchResult.length > 0 ? (
        <>


          <VideoContainer Data={searchResult} />
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#aaa' }}>
          {query ? "No results found." : "Search something..."}
        </div>
      )}

    </div>
  );
}

export default SearchBar;