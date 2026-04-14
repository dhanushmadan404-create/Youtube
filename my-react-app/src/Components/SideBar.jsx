import React from "react";
import reactLogo from "../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTopChannelsThunk } from "../Redux/Slice/FollowerSlice";
import "../styles/SideBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'

// icons
import gameIcon from "../assets/gamingLogo.png";
import entertainmentLogo from "../assets/entertainment.png";
import edu from "../assets/edu.png";
import tech from "../assets/tech.png";

function SideBar({ isActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const topChannels =
    useSelector((state) => state.followers?.topChannels) || [];

  React.useEffect(() => {
    dispatch(getTopChannelsThunk());
  }, [dispatch]);

  const sidebarItems = [
    { icon: gameIcon, label: "Gaming", path: "/category?type=Gaming" },
    { icon: entertainmentLogo, label: "Entertainment", path: "/category?type=Entertainment" },
    { icon: edu, label: "Education", path: "/category?type=Education" },
    { icon: tech, label: "Technology", path: "/category?type=Technology" },
  ];

  return (
    <aside className={`Side ${isActive ? "active" : ""}`}>
      <div
        className="HeadAlign"
         onClick={() => navigate("/category?type=Gaming")}
      ><div className="logo">

<FontAwesomeIcon icon={faLayerGroup} size="2x" />
      </div>
        <span className="typography-body1">Category</span >
      </div>
      <div className="Category">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="HeadAlign"
            onClick={() => navigate(item.path)}
          >
            <img
              className="logo"
              src={item.icon}
              alt={item.label}
              title={item.label}
            />
            <span className="typography-body1">{item.label}</span>
          </div>
        ))}
      </div>


    </aside>
  );
}

export default SideBar;