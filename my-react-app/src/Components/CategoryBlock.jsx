import React from 'react'
import Category from './Category'
import { Data } from '../Backend/Data'
import "../styles/Category.css"
const count=[1,2,3,4,5,6,7,8,9,0]
function CategoryBlock() {
  const Value = Data.video
    console.log(Value)
  return (
    <div className='CategoryBlock'>{count.map((value,index)=>(<Category key={index}/>))}</div>
  )
}

export default CategoryBlock