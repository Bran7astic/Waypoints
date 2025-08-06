import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from "../../client";
import { Fade } from "react-awesome-reveal";

export default function MapView({posts}) {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.006, 40.7128],
      zoom: 9,
    });


    mapRef.current.on("load", () => {

        posts.map(item => {
            const el = document.createElement('div');
            el.style.cursor = 'pointer'
            el.style.width = '60px';
            el.style.height = '60px';
            el.style.borderRadius = '50%';
            el.style.border = '3px solid #81A094';
            el.style.backgroundSize = 'cover';
            el.style.backgroundImage = `url(${item.imageUrl})`
            el.style.transition = 'transition transform 0.3s'
        
            const popup = new mapboxgl.Popup({offset: 25}).setHTML(
                `<p><b>${item.username}:</b> ${item.caption}</p>
                 <a href="/home/${item.post_id}">View Post</a>
                `
            )

            new mapboxgl.Marker(el)
                .setLngLat([item.coordinates[1], item.coordinates[0]])
                .setPopup(popup)
                .addTo(mapRef.current)
        
    })

    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        paddingBottom: "5em",
        borderRadius: "20px",
        border: "3px solid #885A5A",
        backgroundColor: "#ffdcdc",
      }}
    >

      <h2>Map View</h2>

      <div
        style={{
            width: "60em",
            height: "40em",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            border: "3px solid #885A5A",
        }}
        >
        <div
          style={{ width: "100%", height: "100%" }}
          ref={mapContainerRef}
          className="map-container"
        />
      </div>
    </div>
  );
}
