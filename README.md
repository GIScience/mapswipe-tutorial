# MapSwipe Analytics Tutorial

A [tutorial](http://mapswipe.geog.uni-heidelberg.de/tutorial.html) for the [MapSwipe App](http://mapswipe.org/), designed to be accessed from mobile devices. It may get integrated in the Mapswipe App.

Created at [HeiGIT](http://www.geog.uni-heidelberg.de/gis/heigit_en.html) for [MapSwipeAnalytics](http://mapswipe.geog.uni-heidelberg.de/).

![screenshot](https://mapswipe.geog.uni-heidelberg.de/img/tutorialScreen.png")



## What to do

Multiple examples of contributions are shown to the user together with the result and instructions for the app.
Use the arrows th navigate through the single features.


## How it works

Leaflet, Leaflet time dimensions
example geojson, fields, color

## How to use the code

You can use this project as a base for your own tuturial for Maspwipe or other projects.

You need a [geojson](http://geojson.org/) as input file.
    data/tut_examples.geojson
The features need to following properties:



| Attribute     | Type          | Description  |
| ------------- |:-------------:| -----:|
| result      | `Integer` | Result coded as Integer |
| tut      | `String`      |   Short instruction shown above the feature |
| new_id | `Integer`      |    Unique, continious ID starting from 1. Features will be shown in this order |

Options to assign Strings and colors to the Result will be added later

## How to gather example data

P. e. using [Mapswipe API](https://docs.google.com/document/d/1RwN4BNhgMT5Nj9EWYRBWxIZck5iaawg9i_5FdAAderw/edit#heading=h.wp1a8ue6nwhv)

[Mapswipe Analytics](http://mapswipe.geog.uni-heidelberg.de/download/)

Use [QGis](https://www.qgis.org/de) to work with geojson data.
The [OpenLayers Plugin](https://plugins.qgis.org/plugins/openlayers_plugin/) can help to show the Bing Imagery used in the app.
Add the fields specified above.


## Bugs, issues and contributions

Feedback is always welcome!
For any wishes or notes about bugs please use a [issue](https://gitlab.gistools.geog.uni-heidelberg.de/giscience/mapswipe/MapSwipeTutorial/issues)!
