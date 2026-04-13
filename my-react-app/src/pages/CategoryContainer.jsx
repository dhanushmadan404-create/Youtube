import React from "react";
import VideoContainer from "../Components/VideoContainer";
import CategoryBlock from "../Components/CategoryBlock";
import Typography from "@mui/material/Typography";
import "../styles/CategoryContainer.css";
import { useSearchParams } from "react-router-dom";
import { getVideoByCategory } from "../Redux/Slice/VIdeoSlice";
import { useSelector, useDispatch } from "react-redux";

function CategoryContainer() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [cateName, setCateName] = React.useState("");
  const cateVideo =
    useSelector((state) => state.video?.cateVideo) || [];

  React.useEffect(() => {
    const name = searchParams.get("type");

    if (name) {
      setCateName(name);
     dispatch(getVideoByCategory({ category: name }));
    }
}, [searchParams, dispatch]);

console.log(cateVideo)
  return (
    <div>
      <div className="catHeader">
        <Typography variant="h3">Category</Typography>

        <Typography variant="h3">{cateName}</Typography>
      </div>

      <CategoryBlock />

      {/* Pass category videos properly */}
      <VideoContainer Data={cateVideo} />
    </div>
  );
}

export default CategoryContainer;