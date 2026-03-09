import { useState } from "react"
import category from "../assets/react.svg"
import "../styles/SideBar.css"
import Btn from "./Btn"
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import typography from "@mui/material/Typography"
function SideBar() {
    const [open, Setopen] = useState(false)
    // let Categories=[{
    //     image:category,
    //     name:Cate1
    // },{
    //     image:category,
    //     name:Cate2
    // },{
    //     image:category,
    //     name:Cate3
    // },{
    //     image:category,
    //     name:Cate4
    // },{
    //     image:category,
    //     name:Cate5
    // }]
    // let Channel=[{
    //     image:category,
    //     name:Channel1
    // },{
    //     image:category,
    //     name:Channel2
    // },{
    //     image:category,
    //     name:Channel3
    // },{
    //     image:category,
    //     name:Channel4
    // },{
    //     image:category,
    //     name:Channel5
    // }]

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

                <div className="Align"><img src={category} alt="This is logo" /> <div>
                    <Typography variant="h5" component="div" sx={{
                        flexGrow: 1, color: "white", transition: "opacity 0.3s ease",
                        whiteSpace: "nowrap",
                        overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, display: { xs: 'none', sm: 'block' }
                    }}>
                        Category
                    </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
                }}>
                    Category
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
                }}>
                    Category
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
                }}>
                    Category
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden", width: open ? "auto" : 0,opacity: open ? 1 : 0, color: "white"
                }}>
                    Category
                </Typography></div></div>
                <div className="Align"><img src={category} alt="This is logo" /> <div> <Typography variant="h5" component="div" sx={{
                    flexGrow: 1, transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",width: open ? "auto" : 0, opacity: open ? 1 : 0, color: "white"
                }}>
                    Category
                </Typography></div></div>


            </div>

            <div className="HeadAlign"><img src={category} alt="This is logo" /> <div> <Typography variant="h4" component="div" sx={{
                flexGrow: 1, transition: "opacity 0.3s ease",
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