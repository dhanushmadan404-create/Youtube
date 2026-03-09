import React from 'react'
import Channel from '../Components/Channel'
import { Data } from '../Backend/Data'
import "../styles/Category.css"
function ChannelContainer() {
  const Value = Data.video
    console.log(Value)
  return (
    <div className='CategoryBlock'>{Value.map((value,index)=>(<Channel key={index}/>))}</div>
  )
}

export default ChannelContainer