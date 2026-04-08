import React from 'react'
import '../styles/Vcn.css'
import Content from './Content'
import { useNavigate } from 'react-router-dom';
function ProfileVideoContainer({ Data }) {
  const navigate = useNavigate();
  console.log(Data)


  if (!Data || !Data.video || !Array.isArray(Data.video) || Data.video.length === 0) {
    return <div style={{ color: "white" }}>Loading...</div>; // 👈 prevents crash
  }


  return (
    <div className='Container'>

      {Data.video.map((item) => {
        return (
          <div key={item._id} className="Content" onClick={() => {
            navigate("/vdoplayer",{
              state:{
                item:item,
                personal:Data.personal }
            })
          }}>
            <div className="Top">
              <img className="thumbnail" src={item.thumbnail} alt="This is my thambnile" />
            </div>
            <div>

              <b className="Title">{item.title}</b>
            </div>
            <div className="ContentBox">


              <div>
                <img src={item.thumbnail} alt="This is my profile" />

              </div>
              <div>
                <div className="middlePart">
                  <p>{Data.personal.name}</p>
                  <p><b>Views:</b>78</p>
                </div>

                <p>{item.category}</p>
              </div>



            </div>
          </div>
        );
      })}

    </div>
  )
}

export default ProfileVideoContainer