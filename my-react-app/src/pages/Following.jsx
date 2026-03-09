import React, { useState } from 'react'
import Button from '@mui/material/Button'
import VideoContainer from '../Components/VideoContainer'
import "../styles/Following.css"
import { Typography } from '@mui/material'
import { Data } from '../Backend/Data'
function Following() {
    const [Active,SetActive]=useState("Videos")
    const [For, SetFor] = useState({
        heading: 'Videos',
        Data: Data
    })
    const Change = (e) => {
        const heading=String( e.currentTarget.value)
        let NewState
        switch (heading) {
            case "Videos":
                SetActive(heading)
                console.log("Videos")
                NewState=Data
                break;
            case "Categories":
                SetActive(heading)
                NewState=Data
                console.log("categories")
                break;
            case "Channels":
                SetActive(heading)
                NewState=Data
                console.log("Channel")
                break;
            default:
                SetActive(heading)
                NewState=Data
        }
    SetFor({
        heading:heading,
        value:NewState
    })



    }
    return (
        <div className='FollowingContainer'>
            <div className='TopFollow'>
                <Typography variant='h1' component="h1" >
                    {For.heading}
                </Typography>
                <div><Button className={Active=="Videos"?"Option sel":"Option"} value={"Videos"} onClick={Change}>Videos</Button>
                    <Button className={Active=="Categories"?"Option sel":"Option"}value={"Categories"} onClick={Change}>Categories</Button>
                    <Button className={Active=="Channels"?"Option sel":"Option"}value={"Channels"} onClick={Change}>Channels</Button>
                </div>
            </div>
            <div>
                <VideoContainer Data={For.Data} />
            </div>
        </div>
    )
}

export default Following