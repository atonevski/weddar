#
#
# map.coffee
# weddar
# v0.0.1
# 
# 
# Copyright 2016 Andreja Tonevski, https://github.com/atonevski/weddar
# For license information see LICENSE in the repository
# 
# Module Map:
#   - weather (cloud) map using OpenWeatherMap and Leaflet
#
#

angular.module 'app.map', []

.controller 'Map', ($scope) ->
  # OWM api id
  APPID = '74caac32fcc2d61b715c249e789a875e'

  osm = L.tileLayer 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
    attribution: 'some attribution'
    # id: 'mapbox.streets'
  }
  map = L.map "map-id", {
    center: new L.LatLng(42, 21.43)
    zoom: 6
    layers: [osm]
  }
      
  # osm.addTo $scope.map
  clouds  = L.OWM.clouds { showLegend: false, opacity: 0.5, appId: APPID }
  city    = L.OWM.current {intervall: 15, lang: 'mk'}

  baseMaps      = { "OSM Standard": osm }
  overlayMaps   = { "Clouds": clouds, "Cities": city }
  layerControl  = L.control.layers(baseMaps, overlayMaps).addTo(map)


  map.on 'locationerror', (e) -> console.log "Leaflet loc err: ", e

#   $scope.map.setView [
#     42, 21.43
#     ], 6
#   # $scope.map.locate { setView: yes, maxZoom: 6 }

