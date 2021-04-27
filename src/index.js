import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
// import Map_old from "./Map_old";
import Map from "./Map";
import { Popup } from "./Popup";
import "./style.css";
import Loader from "./Loader";

function App() {
  const [pointsLists, pointsTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = useState({
    show: false,
<<<<<<< HEAD
    text: '',
    air: ''
})
    const titleHandler = (title, indexAir) => {
    setTitle(title,indexAir)
    }
=======
    text: "",
    air: "",
  });
  const [info, setInfo] = useState();
  const infoHandler = (data) => {
    setInfo(data);
  };
  const titleHandler = (title) => {
    setTitle(title);
  };
>>>>>>> pr/2

  const mapRef = useRef();

  useEffect(() => {
    if (loading) {
      fetch("http://localhost:3001/getJson")
        .then((response) => response.json())
        .then((json) => {
          setTimeout(() => {
            setLoading(false);
            pointsTodos(json);
          }, 2000);
        });
    }
  }, []);

  return (
    <>
<<<<<<< HEAD
        {title.show ? <div className="title">{title.text} : {title.air}</div>: null }
=======
      {title.show ? <div className="title">{title.text}</div> : null}
>>>>>>> pr/2

      <Popup info={info} />
      <div className="window">
        <div className="category_1">AQI: от 100 до макс</div>
        <div className="category_2">AQI: от 90 до 120</div>
        <div className="category_3">AQI: от 70 до 90</div>
        <div className="category_4">AQI: от 50 до 70</div>
        <div className="category_5">AQI: от 0 до 50</div>
      </div>

      {loading && <Loader />}
      {/*{pointsLists.length ? null : ( loading? null : <Map_old points={pointsLists} />) }  */}
      {/*{pointsLists.length ? <Map_old data={pointsLists}/> : null}*/}
      {!loading ? (
        <div id="map" ref={mapRef}>
          <Map
            data={pointsLists}
            titleHandler={titleHandler}
            infoHandler={infoHandler}
          />
        </div>
      ) : null}
    </>
  );
}
render(<App />, document.getElementById("root"));
