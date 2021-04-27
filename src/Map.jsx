import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./style.css";
import geojson from "./geojson.json";
import regions from "./ua-cities.json";
import { select } from "d3-selection";

const category_0 = "#ff000000";
const category_1 = "#b32f4a";
const category_2 = `#d7313e`;
const category_3 = `#f97041`;
const category_4 = `#faa247`;
const category_5 = `#acd6a9`;

function paramsColors(num) {
  if (num >= 0 && num <= 50) {
    return category_5;
  }

  if (num >= 51 && num <= 70) {
    return category_4;
  }

  if (num >= 71 && num <= 90) {
    return category_3;
  }

  if (num >= 91 && num <= 120) {
    return category_2;
  }

  if (num >= 121) {
    return category_1;
  }
}

const Map = (props) => {
  const zoomHandler = (newZoom) => {
    // zoom.zoom > newZoom? setZoom(newZoom,(zoom.scale - 0.4)) : setZoom(newZoom,(zoom.scale + 0.4))

    return 4 - newZoom / 2 < 0.5 ? 0.5 : 4 - newZoom / 2;
  };

  // const [{ data }] = useDataApi(url,[]);
  const data = geojson;
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([32.07, 49.23]).scale(4700));

  // console.log(projRef)

  // CREATES THE PROJECTION AND RENDERS CHART AND PARKS
  useEffect(() => {
    // GRAB CURRENT WIDTH/HEIGHT OF DIV ID="MAP"
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    // FINE TUNE THE POSITION THE MAP WITHING THE ELEMENT
    projRef.current.translate([width / 2, height / 2]);

    // ASSING THE PROJECTION A PROJECTION
    const path = d3.geoPath().projection(projRef.current);
    if (data.length) {
      renderChart(data[0].features, path);
    }
  }, [data]);

  // UPDATES THE MAP ONLY IF props.activeParks HAS CHANGED
  useEffect(() => {
    if (props.data.data) {
      renderParks(props.data.data);
    }
  }, [props.data]);

  // RENDER THE MAP
  useEffect(() => {
    // console.log(JSON.parse(regions));
    // console.log(regions);
    regions[0].regions.forEach((region) => {
      // console.log(region.cities);
      renderCties(region.cities);
    });
  }, []);

  const renderChart = (data, path) => {
    let g = d3
      .select(svgRef.current)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("class", (d) => {
        return d.properties.name;
      })
      .attr("d", path)
      .attr("stroke", "black")

      .style("fill", (d) => "#f5f5dc")
      .attr("title", (d) => d.properties.name)
      .on("mouseout", (e) => {
        props.titleHandler({ show: false, text: "" });
        select(e.target).attr("opacity", "1");
      })
      .on("mouseenter", (e) => {
        props.titleHandler({
          show: true,
          text: e.target.getAttribute("title"),
        });
        select(e.target).attr("opacity", "0.7");
      });
  };

  // .split(',')[0]

<<<<<<< HEAD




const Map = (props) => {

    const [zoom, setZoom] = useState({
        zoom: '1'
    })

    const zoomHandler = (newZoom) => {
        // zoom.zoom > newZoom? setZoom(newZoom,(zoom.scale - 0.4)) : setZoom(newZoom,(zoom.scale + 0.4))

        return (4 - newZoom/2) < 0.5? 0.5: (4 - newZoom/2)
    }




    // const [{ data }] = useDataApi(url,[]);
    const data = geojson
    const svgRef = useRef();
    const projRef = useRef(d3.geoMercator().center([32.07, 49.23]).scale(4700));

    // console.log(projRef)

    // CREATES THE PROJECTION AND RENDERS CHART AND PARKS
    useEffect(() => {
        // GRAB CURRENT WIDTH/HEIGHT OF DIV ID="MAP"
        const height = svgRef.current.clientHeight;
        const width = svgRef.current.clientWidth;
        // FINE TUNE THE POSITION THE MAP WITHING THE ELEMENT
        projRef.current.translate([width  / 2, height  / 2 ]);

        // ASSING THE PROJECTION A PROJECTION
        const path = d3.geoPath().projection(projRef.current);
        if (data.length) {
            renderChart(data[0].features, path);
        }
    }, [data]);

// UPDATES THE MAP ONLY IF props.activeParks HAS CHANGED
    useEffect(() => {

        if (props.data.data){
            renderParks(props.data.data)
        }

    },[props.data])

// RENDER THE MAP





    const renderChart = (data, path) => {

     let g =  d3.select(svgRef.current).selectAll('path').data(data).enter()
            .append('path')
            .attr('class', (d) => {
                return d.properties.name
            })
            .attr('d', path)
            .attr('stroke', 'black')
        

            .style('fill', (d) => '#f5f5dc')
            .attr('title', (d) => d.properties.name)
            .on('mouseout', (e) => {
                props.titleHandler({show: false, text: ''})
                select(e.target)
                    .attr('opacity', '1')
            })
            .on('mouseenter', (e) => {
                props.titleHandler({show: true, text: e.target.getAttribute('title')})
                select(e.target)
                    .attr('opacity', '0.7')
            })
            // .call(d3.zoom()
            //     .extent([[0, 0], [1000, 1000]])
            //     .scaleExtent([1, 8])
            //     .on("zoom", zoomed));


    };

    // .split(',')[0]
    

// RENDER THE PARKS
    const renderParks = (parks) => {
        const circles = d3.select(svgRef.current).selectAll('.parks').data(parks, (d) => d.name);
        circles.enter().append('g').append('circle')
            .attr('transform', d => 'translate(' + projRef.current([+d.longitude, +d.latitude]) + ')') 
            .attr('r', 4)
            .on('mouseout', (e) => {
                props.titleHandler({show: false, text: ''})
            })
            .on('mouseenter', (e) => {
               
                props.titleHandler({show: true, air: e.target.getAttribute('data-air'),  text: e.target.getAttribute('title')})
            })
            .attr('class', (d, i) => `parks park-${d.id}`)
            .attr('title', (d) => {
                return d.cityName
            })
            .attr('data-air', (d) => {
                return d.pollutants[d.pollutants.length - 1] ? d.pollutants[d.pollutants.length - 1].value : null
              
            })
            .style('fill', (d) => paramsColors(d.pollutants[d.pollutants.length - 1].value))
            .style('opacity', 0)
            .transition().duration(500).style('opacity',1)
    };

    


    function zoomed({ transform }) {
        d3.select(svgRef.current).selectAll('path').attr("transform", transform);
        d3.select(svgRef.current).selectAll('g').attr("transform", transform);
        d3.select(svgRef.current).selectAll('circle').attr('r', zoomHandler(transform.k));

 
        


    }
    const xg = d3.select(svgRef.current).call(d3.zoom()
        .extent([[0, 0], [10000000, 1000000]])
        // .scaleExtent([1, 8])
        .on("zoom", zoomed));


    return (
        <svg style={{"transition":" 0.8s"}} width={10} height={10}  id="boroughs-map" ref={svgRef}></svg>
    );
=======
  // RENDER THE PARKS
  const renderParks = (parks) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll(".parks")
      .data(parks, (d) => d.name);
    circles
      .enter()
      .append("g")
      .append("circle")
      .attr(
        "transform",
        (d) => "translate(" + projRef.current([+d.longitude, +d.latitude]) + ")"
      )
      .attr("r", 4)
      .on("mouseout", (e) => {
        props.titleHandler({ show: false, text: "" });
      })
      .on("mouseenter", (e) => {
        props.titleHandler({
          show: true,
          air: e.target.getAttribute("data-air"),
          text: e.target.getAttribute("title"),
        });
      })
      .on("click", (e) => {
        props.infoHandler(e.target.dataset.point);
      })
      .attr("class", (d, i) => `parks park-${d.id}`)
      .attr("title", (d) => {
        return d.cityName;
      })
      .attr("data-air", (d) => {
        return d.pollutants[d.pollutants.length - 1]
          ? d.pollutants[d.pollutants.length - 1].value
          : null;
      })
      .attr("data-point", (d) => JSON.stringify(d))
      .style("fill", (d) =>
        paramsColors(d.pollutants[d.pollutants.length - 1].value)
      )
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1)
      .style("cursor", "pointer");
  };

  const renderCties = (cities) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll(".cities")
      .data(cities, (d) => d.name);
    circles
      .enter()
      .append("g")
      .append("circle")
      .attr(
        "transform",
        (d) => "translate(" + projRef.current([+d.lng, +d.lat]) + ")"
      )
      // .attr("class", () => "class")
      .attr("r", 4)
      .on("mouseout", (e) => {
        props.titleHandler({ show: false, text: "" });
      })
      .on("mouseenter", (e) => {
        props.titleHandler({
          show: true,
          air: e.target.getAttribute("data-air"),
          text: e.target.getAttribute("title"),
        });
      })
      .attr("class", (d, i) => `parks park-${d.name} city`)
      // .attr("style", (d, i) => `parks park-${d.name} city`)
      .attr("title", (d) => {
        return d.name;
      })
      // .text(() => "город")
      // .attr("data-air", (d) => {
      //     return d.pollutants[d.pollutants.length - 1]
      //         ? d.pollutants[d.pollutants.length - 1].value
      //         : null;
      // })
      .style("fill", (d) => "#00000")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    const texts = d3
      .select(svgRef.current)
      .selectAll(".texts")
      .data(cities, (d) => d.name);
    texts
      .enter()
      .append("g")
      .append("text")
      .attr(
        "transform",
        (d) => "translate(" + projRef.current([+d.lng, +d.lat]) + ")"
      )
      .text((d) => "- " + d.name)
      .transition()

      .attr("title", (d) => {
        return d.name;
      })
      .attr("font-size", 8)
      .style("fill", (d) => "#00000")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);
  };

  function zoomed({ transform }) {
    d3.select(svgRef.current).selectAll("path").attr("transform", transform);
    d3.select(svgRef.current).selectAll("g").attr("transform", transform);
    d3.select(svgRef.current)
      .selectAll("circle")
      .attr("r", zoomHandler(transform.k));
    d3.select(svgRef.current)
      .selectAll("text")
      .attr("font-size", zoomHandler(transform.k) * 2);
  }
  const xg = d3.select(svgRef.current).call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [10000000, 1000000],
      ])
      // .scaleExtent([1, 8])
      .on("zoom", zoomed)
  );

  return (
    <svg
      style={{ transition: " 0.8s" }}
      width={10}
      height={10}
      id="boroughs-map"
      ref={svgRef}
    ></svg>
  );
>>>>>>> pr/2
};

export default Map;
