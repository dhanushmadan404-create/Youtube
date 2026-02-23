import { useState } from "react"
import category from "../assets/react.svg"
import "../styles/SideBar.css"
import Btn from "./Btn"
function SideBar(){
    const[open,Setopen]=useState(false)
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
    
    return(
        <div className={open?"Side active":"Side"}>
            <button onClick={()=>Setopen(!open)}>☰</button>
              <h1><img src={category} alt="This is logo" /><Btn Content="Category"/></h1>
            <div>
                <b><img src={category} alt="This is logo" /><Btn Content="Category"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="Category"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="Category"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="Category"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="Category"/></b>
            </div>
          
            <h1><img src={category} alt="This is logo" /><Btn Content="channel"/></h1>
           <div>
                <b><img src={category} alt="This is logo" /><Btn Content="channel"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="channel"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="channel"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="channel"/></b>
                <b><img src={category} alt="This is logo" /><Btn Content="channel"/></b>
            </div>
        </div>
    )
}

export default SideBar