import React from 'react'
import VideoContainer from "../Components/VideoContainer"
import CategoryBlock from '../Components/CategoryBlock'
import Typography from '@mui/material/Typography'
import "../styles/CategoryContainer.css"
function CategoryContain() {
    const [cateName, setCateName] = React.useState()
    return (
        <div>
            <div className='catHeader'>
                <div>

                    <Typography variant='h3' component="h4">
                        Category
                    </Typography>
                </div>
                <div>

                    <Typography variant='h3' component="h4">
                        Name
                    </Typography>
                </div>
            </div>
            <CategoryBlock />
            <VideoContainer />
        </div>
    )
}

export default CategoryContain