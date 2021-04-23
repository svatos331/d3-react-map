
import React, { useEffect } from "react";
import { render } from "react-dom";
import Map from "./Map";
import "./style.css";
import Loader from "./Loader";




function App() {
const [pointsLists, pointsTodos] = React.useState([]);
const [loading, setLoading] = React.useState(true);


useEffect(()=> {
  fetch('http://localhost:3001/getJson')
  .then(response => response.json())
  .then(json => {
    setTimeout(()=> {
      pointsTodos(json)
      setLoading(false)
    }, 2000)
    
  })
}, []) 




  return (
    <div>
       <div className="window">
        <div className="category_1">
        AQI: от 100 до макс
        </div>
        <div className="category_2">
        AQI: от 90 до 120 
        </div>
        <div className="category_3">
        AQI: от 70 до 90
        </div>
        <div className="category_4">
        AQI: от 50 до 70
        </div>
        <div className="category_5">
        AQI: от 0 до 50
        </div>
        </div>

        {loading && <Loader />}
        {pointsLists.length ? null : ( loading? null : <Map points={pointsLists} />) }  
       </div>
   );
}
render(<App />, document.getElementById("root"));
