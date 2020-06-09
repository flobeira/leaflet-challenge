// Data: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

// Creating map object
var myMap = L.map("map", {
    center: [39.059470, -102.968722],
    zoom: 8
  });

// Adding title layer to the map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: pk.eyJ1IjoiZmxvYmVpcmEiLCJhIjoiY2thb29pYzFhMDR2OTJ3cWlrbXNqaDN4cCJ9.Qwstu7yDKcCm-_XdQEzfxg
  });

// Store API quary Variables 
var BaseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var limit = "&$limit=10000";

// Assemble API quary URL
var url = BaseURL + limit

// Grab the data with d3 
d3.json(url, function(response) {


    for (var i = 0; i < response.length; i++) {

        // Conditionals for earthquake magnitude
        var magnitude = response[i].mag;
    
        var color = "";
        if (magnitude > 5) {
            color = "Red";
        }
        else if (magnitude > 3) {
            color = "Organe";
        }
        else if (magnitude > 1) {
            color = "Yellow";
        }
        else {
            color = "Gray";
        }

    // Add circles to map
    L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: magnitude * 5000
    }).addTo(myMap);
    }
});

            