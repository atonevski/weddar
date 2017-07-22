#
# weddar
# v0.0.1
# 
# Copyright 2016 Andreja Tonevski, https://github.com/atonevski/weddar
# For license information see LICENSE in the repository
#

# Ionic Starter App
#
# angular.module is a global place for creating, registering and retrieving
# Angular modules 'app' is the name of this angular module example (also set
# in a <body> attribute in index.html) the 2nd parameter is an array of
# 'requires'
angular.module 'app', ['ionic', 'app.air', 'app.map']

# routing
.config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
    .state 'current', {
      url:          '/current'
      templateUrl:  'views/current.html'
    }
    .state 'hourly', {
      url:          '/hourly'
      templateUrl:  'views/hourly.html'
    }
    .state 'daily', {
      url:          '/daily'
      templateUrl:  'views/daily.html'
    }
    .state 'root', {
      url:          '/'
      templateUrl:  'views/home.html'
    }
    .state 'air', {
      url:          '/air'
      templateUrl:  'views/air.html'
      controller:   'Air'
    }
    .state 'map', {
      url:          '/map'
      templateUrl:  'views/map.html'
      controller:   'Map'
    }

  $urlRouterProvider.otherwise '/current'


.run ($ionicPlatform) ->
  $ionicPlatform.ready () ->
    if window.cordova && window.cordova.plugins.Keyboard
      # Hide the accessory bar by default (remove this to show the accessory
      # bar above the keyboard for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

      # Don't remove this line unless you know what you are doing. It stops
      # the viewport from snapping when text inputs are focused. Ionic
      # handles this internally for a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll true
    if window.StatusBar
      StatusBar.styleDefault()
.controller 'Main', ($scope, $http, $ionicLoading) ->
  KEY = '6376c1cdba2fa461f346e9a27524406d'
  LAT = 42
  LNG = 21.43
  getWeather = () ->
    url = "https://api.darksky.net/forecast/#{ KEY}/#{ LAT },#{ LNG }?units=si"
    $ionicLoading.show()
    $http.get url
      .then (res) ->
        $ionicLoading.hide()
        $scope.weather = res.data
        console.log res.data
      , (res) ->
        $ionicLoading.show {
          template: "Can't load air pollution data"
          duration: 3000
        }
        console.log "error: #{ res.status }"
  
  $scope.getWeather = getWeather
  getWeather()

  # miles per hour to kilometers per hour
  $scope.mph2kmph = (m) -> m * 1.609344

  # meters per second to kilometers per hour
  $scope.mps2kmph = (m) -> 3600.0 * m / 1000

  # wind arrow icon for current wind angle
  $scope.windArrow = () ->
    return unless $scope.weather?
    if          0 <= $scope.weather.currently.windBearing <  22.5
      'wi-direction-down'
    else if  22.5 <= $scope.weather.currently.windBearing <  67.5
      'wi-direction-down-left'
    else if  67.5 <= $scope.weather.currently.windBearing < 112.5
      'wi-direction-left'
    else if 112.5 <= $scope.weather.currently.windBearing < 157.5
      'wi-direction-up-left'
    else if 157.5 <= $scope.weather.currently.windBearing < 202.5
      'wi-direction-up'
    else if 202.5 <= $scope.weather.currently.windBearing < 247.5
      'wi-direction-up-right'
    else if 247.5 <= $scope.weather.currently.windBearing < 292.5
      'wi-direction-right'
    else if 292.5 <= $scope.weather.currently.windBearing < 337.5
      'wi-direction-down-right'
    else
      'wi-direction-down'

  # wind arrow icon for given wind angle
  $scope.windArrowFor = (deg) ->
    return unless $scope.weather?
    if          0 <= deg <  22.5
      'wi-direction-down'
    else if  22.5 <= deg <  67.5
      'wi-direction-down-left'
    else if  67.5 <= deg < 112.5
      'wi-direction-left'
    else if 112.5 <= deg < 157.5
      'wi-direction-up-left'
    else if 157.5 <= deg < 202.5
      'wi-direction-up'
    else if 202.5 <= deg < 247.5
      'wi-direction-up-right'
    else if 247.5 <= deg < 292.5
      'wi-direction-right'
    else if 292.5 <= deg < 337.5
      'wi-direction-down-right'
    else
      'wi-direction-down'

  # weather icon for current weather
  $scope.weatherIcon = () ->
    return unless $scope.weather?
    switch $scope.weather.currently.icon
      when 'clear-day'    then 'wi-day-sunny'
      when 'clear-night'  then 'wi-night-clear'
      when 'rain'         then 'wi-rain'
      when 'snow'         then 'wi-snow'
      when 'sleet'        then 'wi-sleet'
      when 'wind'         then 'wi-strong-wind'
      when 'fog'          then 'wi-fog'
      when 'cloudy'       then 'wi-cloudy'
      when 'partly-cloudy-day'    then 'wi-day-cloudy'
      when 'partly-cloudy-night'  then 'wi-night-alt-partly-cloudy'
      when 'hail'         then 'wi-hail'
      when 'thunderstorm' then 'wi-thunderstorm'
      when 'tornado'      then 'wi-tornado'
      else 'wi-na'

  # weather icon for given icon descriptor
  $scope.weatherIconFor = (i) ->
    switch i
      when 'clear-day'    then 'wi-day-sunny'
      when 'clear-night'  then 'wi-night-clear'
      when 'rain'         then 'wi-rain'
      when 'snow'         then 'wi-snow'
      when 'sleet'        then 'wi-sleet'
      when 'wind'         then 'wi-strong-wind'
      when 'fog'          then 'wi-fog'
      when 'cloudy'       then 'wi-cloudy'
      when 'partly-cloudy-day'    then 'wi-day-cloudy'
      when 'partly-cloudy-night'  then 'wi-night-alt-partly-cloudy'
      when 'hail'         then 'wi-hail'
      when 'thunderstorm' then 'wi-thunderstorm'
      when 'tornado'      then 'wi-tornado'
      else 'wi-na'

# .controller 'Main', ($scope, $http, $ionicLoading) ->
#   $scope.daywi =
#     'clear sky':        'wi-day-sunny'
#     'few clouds':       'wi-day-cloudy'
#     'scattered clouds': 'wi-cloud'
#     'broken clouds':    'wi-cloudy'
#     'overcast clouds':  'wi-cloudy'
#     'shower rain':      'wi-showers'
#     'rain':             'wi-day-showers'
#     'light rain':       'wi-sprinkle'
#     'thunderstorm':     'wi-day-thunderstorm'
#     'snow':             'wi-day-snow'
#     'mist':             'wi-fog'
#   $scope.nightwi =
#     'clear sky':        'wi-night-clear'
#     'few clouds':       ' wi-night-alt-cloudy'
#     'scattered clouds': 'wi-cloud'
#     'broken clouds':    'wi-cloudy'
#     'overcast clouds':  'wi-cloudy'
#     'shower rain':      'wi-showers'
#     'rain':             'wi-night-alt-showers'
#     'light rain':       'wi-sprinkle'
#     'thunderstorm':     ' wi-night-alt-thunderstorm'
#     'snow':             'wi-night-snow'
#     'mist':             'wi-fog'
# 
#   $scope.currentwi = () ->
#     if $scope.weather?
#       if $scope.time.getHours() < 19 # daily
#         $scope.daywi[$scope.weather]
#       else
#         $scope.nightwi[$scope.weather]
#     else
#       'wi-na'
#   
#   $scope.winddegRound = () ->
#     unless $scope.winddeg?
#       0
#     else
#       Math.round (Math.round ($scope.winddeg + 11.25)/22.5)*22.5
# 
#   $scope.currentWeather = () ->
#     url = "http://api.openweathermap.org/data/2.5/weather?q=Skopje&" +
#           "units=metric&appid=74caac32fcc2d61b715c249e789a875e"
#     $ionicLoading.show()
#     $http.get url
#       .success (data, status) ->
#         $ionicLoading.hide()
#         $scope.weather = data.weather[0].description
#         $scope.temp = data.main.temp
#         $scope.lat  = data.coord.lat
#         $scope.lng  = data.coord.lon
#         $scope.pressure = data.main.pressure
#         $scope.humidity = data.main.humidity
#         $scope.time = new Date(data.dt * 1000)
#         $scope.wind = data.wind.speed * 3600.0/1000.0
#         $scope.clouds   = data.clouds.all
#         $scope.sunrise  = new Date(data.sys.sunrise * 1000)
#         $scope.sunset   = new Date(data.sys.sunset * 1000)
#         $scope.winddeg  = data.wind.deg
#         console.log data
# 
#         uvurl = "http://api.openweathermap.org/data/2.5/uvi?" +
#                 "appid=74caac32fcc2d61b715c249e789a875e&" +
#                 "lat=#{ $scope.lat }&lon=#{ $scope.lng }"
#         $http.get uvurl
#           .success (data, status) ->
#             console.log "got uv data:", data
#             $scope.uvtime = new Date(data.date * 1000)
#             $scope.uv = data.value
#       .error (err) ->
#         $ionicLoading.show {
#           template: "Can't load weather data (#{ err })"
#           duration: 3000
#         }
# 
#   $scope.currentWeather()

# current time:
# http://api.openweathermap.org/data/2.5/weather?q=Skopje&units=metric&appid=74caac32fcc2d61b715c249e789a875e
#
# Parameters:
# 
# coord
#   coord.lon City geo location, longitude
#   coord.lat City geo location, latitude
# weather (more info Weather condition codes)
#   weather.id Weather condition id
#   weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
#   weather.description Weather condition within the group
#   weather.icon Weather icon id
# base Internal parameter
# main
#   main.temp Temperature. Unit Default: Kelvin, Metric: Celsius,
#     Imperial: Fahrenheit.
#   main.pressure Atmospheric pressure (on the sea level, if there is 
#     no sea_level or grnd_level data), hPa
#   main.humidity Humidity, %
#   main.temp_min Minimum temperature at the moment. This is deviation 
#     from current temp that is possible for large cities and megalopolises
#     geographically expanded (use these parameter optionally). Unit Default:
#     Kelvin, Metric: Celsius, Imperial: Fahrenheit.
#   main.temp_max Maximum temperature at the moment. This is deviation from
#     current temp that is possible for large cities and megalopolises 
#     geographically expanded (use these parameter optionally). Unit Default:
#     Kelvin, Metric: Celsius, Imperial: Fahrenheit.
#   main.sea_level Atmospheric pressure on the sea level, hPa
#   main.grnd_level Atmospheric pressure on the ground level, hPa
# wind
#   wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec,
#     Imperial: miles/hour.
#   wind.deg Wind direction, degrees (meteorological)
# clouds
#   clouds.all Cloudiness, %
# rain
#   rain.3h Rain volume for the last 3 hours
# snow
#   snow.3h Snow volume for the last 3 hours
# dt Time of data calculation, unix, UTC
# sys
#   sys.type Internal parameter
#   sys.id Internal parameter
#   sys.message Internal parameter
#   sys.country Country code (GB, JP etc.)
#   sys.sunrise Sunrise time, unix, UTC
#   sys.sunset Sunset time, unix, UTC
#   id City ID
#   name City name
#   cod Internal parameter
#



# current uv:
# http://api.openweathermap.org/data/2.5/uvi?appid=74caac32fcc2d61b715c249e789a875e&lat=42&lon=21.43
#
# lat  float - latitude for returned data
# lon  float - longitude for returned data
# date_iso  string - date and time corresponding to returned date
# date  integer - ISO 8601 timestamp
# value  float - ultraviolet index
