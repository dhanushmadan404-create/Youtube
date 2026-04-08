import { useState } from "react"
import category from "../assets/react.svg"
import "../styles/SideBar.css"
import Btn from "./Btn"
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import typography from "@mui/material/Typography"
import CardLabel from "./CardLabel";
import gameIcon from "../assets/gamingLogo.png"
import entertainmentLogo from "../assets/entertainment.png"
import edu from "../assets/education.png"
import { useNavigate } from "react-router-dom";

import tech from "../assets/tech.png"
function SideBar() {
    const [open, Setopen] = useState(false)
    const navigate=useNavigate()
    
    return (
        <div className={open ? "Side active" : "Side"}>
            <div className="Align">

                <IconButton onClick={() => Setopen(!open)}>
                    <MenuIcon />
                </IconButton>

            </div>

            <div className="HeadAlign"><img src={category} alt="This is logo" /> <div> 
                <Typography variant="h4" component="div" sx={{
                flexGrow: 1, transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
                overflow: "hidden", opacity: open ? 1 : 0,
                opacity: open ? 1 : 0, color: "white",
                width: open ? "auto" : 0
            }}>
                Category
            </Typography></div></div>
            <div className="Category">
                
             <CardLabel content={"Education"} open={open} img={edu} fuc={()=>{navigate("/category?type=Education")}}/>
<CardLabel content={"Technology"} open={open} img={tech}  fuc={()=>{navigate("/category?type=Technology")}}/>
<CardLabel content={"Gaming"} open={open} img={gameIcon}  fuc={()=>{navigate("/category?type=Gaming")}}/>
<CardLabel content={"Entertainment"} open={open} img={entertainmentLogo} fuc={()=>{navigate("/category?type=Entertainment")}}/>
              
            </div>

            <div className="HeadAlign"><img src={category} alt="This is logo" /> <div> <Typography variant="h4" component="div" sx={{
                flexGrow: 1, transition: "opacity 0.3s ease",cursor:"pointer",
                whiteSpace: "nowrap",
                overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
            }}>
                Channel
            </Typography></div></div>
            <div className="Category">
                <div className="Align"><img src={category} alt="This is logo" /><div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
                }}>
                    Channel
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /><div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, color: "white"
                }}>
                    Channel
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, color: "white"
                }}>
                    Channel
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, color: "white"
                }}>
                    Channel
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, color: "white"
                }}>
                    Channel
                </Typography></div></div>
            </div>
        </div>
    )
}

export default SideBar