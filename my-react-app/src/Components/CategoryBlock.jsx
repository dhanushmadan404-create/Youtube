import React from 'react'
import Category from './Category'
import { Data } from '../Backend/Data'
import "../styles/Category.css"
import gameIcon from "../assets/gamingLogo.png"
import entertainmentLogo from "../assets/entertainment.png"
import edu from "../assets/edu.png"
import tech from "../assets/tech.png"
import { useNavigate } from 'react-router-dom'

function CategoryBlock() {
  const navigate = useNavigate()
  const [cate, SetCate] = React.useState([
    {
      img: entertainmentLogo,
      name: "Entertainment",
      fuc: () => { navigate("/category?type=Entertainment") }
    }, {
      name: "Gaming",
      img: gameIcon,
      fuc: () => { navigate("/category?type=Gaming") }
    }, {
      name: "Technology",
      img: tech,
      fuc: () => { navigate("/category?type=Technology") }
    }, {
      name: "Education",
      img: edu,
      fuc: () => { navigate("/category?type=Education") }
    }
  ])

  return (
    <div className='CategoryBlock'>{cate.map((value, index) => (<Category key={index} content={value} />))}</div>
  )
}

export default CategoryBlock