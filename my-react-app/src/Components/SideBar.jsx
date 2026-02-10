import category from "../assets/react.svg"
import "../styles/SideBar.css"
function SideBar(){
    return(
        <div className="Side">
            <button>☰</button>
            <h1>⋮Category</h1>
            <ul>
                <l1><img src={category} alt="This is logo" />Category1</l1>
                <l1><img src={category} alt="This is logo" />Category2</l1>
                <l1><img src={category} alt="This is logo" />Category3</l1>
                <l1><img src={category} alt="This is logo" />Category4</l1>
                <l1><img src={category} alt="This is logo" />Category5</l1>
            </ul>
            <h1>⋮Channel</h1>
            <ul>
                <l1><img src={category} alt="This is logo" />Channel1</l1>
                <l1><img src={category} alt="This is logo" />Channel2</l1>
                <l1><img src={category} alt="This is logo" />Channel3</l1>
                <l1><img src={category} alt="This is logo" />Channel4</l1>
                <l1><img src={category} alt="This is logo" />Channel5</l1>
            </ul>
        </div>
    )
}

export default SideBar