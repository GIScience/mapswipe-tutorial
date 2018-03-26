/*Main function: Initialises the map, loads data
 see: http://leafletjs.com/reference-1.2.0.html#map
      https://github.com/socib/Leaflet.TimeDimension
      */
function show_map() {
L.timeDimension.layer.Result = function(layer, options) {
  return new L.TimeDimension.Layer.Result(layer, options);
};

var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
map = L.map('leaflet_map', {
  fullscreenControl: true,
  touchZoom: false,
  scrollWheelZoom: false,
  zoomDelta: 0,
  timeDimensionControl: true,
  attributionControl: false,
  zoomControl: false,
  doubleClickZoom: false,
  dragging: false,
  timeDimensionControlOptions: {
    backwardButton: false,
    forwardButton: false,
    playButton: false,
    displayDate : false,
    position: 'bottomleft',
    autoPlay: false,
    timeSlider: false,
    speedSlider: false,
    playerOptions: {
        transitionTime: 5000,
        loop: false,
        startOver: true,
        buffer: 100
    },
  },
  timeDimensionOptions: {
    period: 'PT2S'
  },
  timeDimension: true,
  center: [0, 0],
  zoom: 3,
});
//loads and animates the geojson data
loadData();

//Loads and adds the following baaselayer to the map and mapControl: Bing imagery
createBaseLayers();


map.timeDimension.setCurrentTime(0);

}

/*goes forward in the  leaflet timeDimension animation
d = number of steps forward (positive)/ backward (negative). */
function timeNav(d) {
 map.timeDimension.setCurrentTime(map.timeDimension.getCurrentTime() +2*d*1000);
}

//extracts the time from a geojson for leaflet timeDimension
L.TimeDimension.Layer.Result = L.TimeDimension.Layer.GeoJson.extend({
  _getFeatureTimes: function(feature) {
      if (!feature.properties) {
          return [];
      }
      if (feature.properties.hasOwnProperty('time')) {
          return feature.properties.times;
      }
      if (feature.properties.hasOwnProperty('new_id')) {
          return [feature.properties.new_id * 2000];
      } else {
        console.log("No time dimension found! Check input data.")
        return [];
      }
  },
});

//Loads and adds the following baselayer to the map and mapControl: Bing imagery
function createBaseLayers(){


  // Bing Layer
  var bing_key = 'AopsdXjtTu-IwNoCTiZBtgRJ1g7yPkzAi65nXplc-eLJwZHYlAIf2yuSY_Kjg3Wn'
  bing = L.tileLayer.bing(bing_key);
  map.addLayer(bing);

}



/* Loads data from geojson file, assigns color based on properties
creates timeDimension interaction
*/
function loadData() {
 $.getJSON('data/tut_examples.geojson', function(data) {
   //set Style: color, weight
     var resultLayer = L.geoJson(data, {
         style: function(feature) {
             var color = "#FFF";
             if (feature.properties.result == 1) { //yes
                 color = "#10cc10";
             } else if (feature.properties.result == 2) { //maybe
                 color = "yellow";
             } else if (feature.properties.result == 3) {//bad Imagery
                 color = "red";
             }
             return {
                 "color": color,
                 "weight": 3,
                 "opacity": 1,
                 "fill": false,
             };
         }
     });

     // create the timeLayer
     resultTimeLayer = L.timeDimension.layer.Result(resultLayer, {
         updateTimeDimension: true,
         updateTimeDimensionMode: 'replace',
         addlastPoint: false,
         duration: 'PT1S',
     });
     resultTimeLayer.addTo(map);
     map.fitBounds(resultTimeLayer.getBounds());
     //Fill info for first feature
     var prop = resultTimeLayer._currentLayer._layers[resultTimeLayer._currentLayer._leaflet_id-1].feature.properties;
     document.getElementById("tut_description").innerHTML = prop.tut;
     document.getElementById("tut_progress").innerHTML =String(prop.new_id) + "/" + resultTimeLayer._availableTimes.length;

     //this happens everytime the user uses the forward or backwards bottom
     map.timeDimension.on('timeload', function(data) {
     var date = new Date(map.timeDimension.getCurrentTime());
     if (data.time == map.timeDimension.getCurrentTime()) {
         var totalTimes = map.timeDimension.getAvailableTimes().length;
         var position = map.timeDimension.getAvailableTimes().indexOf(data.time);
         $(map.getContainer()).find('.animation-progress-bar').width((position*100)/totalTimes + "%");
         // update map bounding box
         map.fitBounds(resultTimeLayer.getBounds());
         var prop = resultTimeLayer._currentLayer._layers[resultTimeLayer._currentLayer._leaflet_id-1].feature.properties;
         document.getElementById("tut_description").innerHTML = prop.tut;
         document.getElementById("tut_progress").innerHTML =String(prop.new_id) + "/" + resultTimeLayer._availableTimes.length;
       }
 });

 //To DO: show 'finished message in infobox' when finished

 });
}

function showContactView() {
 document.getElementById('ContactBtn').style.display = 'none';
 document.getElementById('MapViewBtn').style.display = 'inline';
 document.getElementById('contact').style.display = 'block';
 document.getElementById('leaflet_map').style.display = 'none';
 document.getElementById('analytics').style.display = 'none';
}


function showMapView() {
 document.getElementById('ContactBtn').style.display = 'inline';
 document.getElementById('MapViewBtn').style.display = 'none';

 document.getElementById('contact').style.display = 'none';

 document.getElementById('leaflet_map').style.display = 'block';

 // Check whether class of map is col-md-12 or col-md-8
 if (document.getElementById('leaflet_map').className == 'col-md-8'){
   document.getElementById('analytics').style.display = 'inline';
 }
 map.invalidateSize()
}


//creates google stats about website traffic
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-97247301-1', 'auto');
ga('send', 'pageview');
