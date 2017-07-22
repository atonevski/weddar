#
# air.coffee
# weddar
# v0.0.1
# 
# 
# Copyright 2016 Andreja Tonevski, https://github.com/atonevski/weddar
# For license information see LICENSE in the repository
# 
# Module Air:
#   - handles air pollution for Skopje region
#
#


angular.module 'app.air', []

.controller 'Air', ($scope, $http, $ionicLoading) ->
  MAKE_GRAPH_PATH = "http://airquality.moepp.gov.mk/graphs/site/pages/MakeGraph.php?"
  def =
    station:    'SkopjeRegion'
    parameter:  "PM10"
    timemode:   "Day"
    time:       Math.round((new Date()).getTime())
    language:   "mk"
    date:       (new Date()).toISOString()[0 .. 9]

  url = MAKE_GRAPH_PATH + "language=#{ def.language }" +
    "&parameter=#{ def.parameter }&station=#{ def.station }" +
    "&i=#{ def.time }&endDate=#{ def.date }&timeMode=#{ def.timemode }" +
    "&graph=StationLineGraph&background=false"

  fmttm = (s) ->
    "#{ s[0..3] }-#{ s[4..5] }-#{ s[6..7] } #{ s[9..10] }:00"

  levels =
    good:          { low:   0, high:   51 }
    moderate:      { low:  51, high:  101 }
    sensitive:     { low: 101, high:  251 }
    unhealthy:     { low: 251, high:  351 }
    veryUnhealthy: { low: 351, high:  431 }
    hazardous:     { low: 431, high: 2000 }

  # station nanes
  stations =
      Centar:       "Центар"
      Karpos:       "Карпош"
      Lisice:       "Лисиче"
      GaziBaba:     "Гази Б."
      Rektorat:     "Ректор."
      Miladinovci:  "Милад."
      Mrsevci:      "Мршевци"
      
      Bitola1:      "Битола 1"
      Bitola2:      "Битола 2"
      Kicevo:       "Кичево"
      Lazaropole:   "Лазарополе"
      Tetovo:       "Тетово"

      Veles1:       "Велес 1"
      Veles2:       "Велес 2"
      Kocani:       "Кочани"
      Kavadarci:    "Кавадарци"
      Kumanovo:     "Куманово"
    
  sname = (s) -> stations[s]
  $scope.sname = sname

  levelColor = (v) ->
    return "#000" unless v
    if levels.good.low <= v < levels.good.high
      "#339933"
    else if levels.moderate.low <= v < levels.moderate.high
      "#99ff33"
    else if levels.sensitive.low <= v < levels.sensitive.high
      "#ff9966"
    else if levels.unhealthy.low <= v < levels.unhealthy.high
      "#ff3366"
    else if levels.veryUnhealthy.low <= v < levels.veryUnhealthy.high
      "#cc0066"
    else if levels.hazardous.low <= v < levels.hazardous.high
      "#990066"

  $scope.levelColor = levelColor

  $ionicLoading.show()
  $http.get url
    .then (res) -> # success
      $ionicLoading.hide()
      data = res.data
      $scope.stations = (s for s in data.stations when s != 'Mrsevci')
      $scope.data = res.data
      tms = Object.keys(data.measurements).sort()
      $scope.tms = tms

      measurements = []
      for t in tms
        m = { }
        for k, v of data.measurements[t]
          m[k] = parseFloat v if !! v
        measurements.push { time: fmttm(t), values: m }

      $scope.measurements = measurements
      console.log data
, (res) ->
  $ionicLoading.show {
    template: "Can't load air pollution data"
    duration: 3000
  }
  console.log "error: #{ res.status }"
