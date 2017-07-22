angular.module('app.air', []).controller('Air', function($scope, $http, $ionicLoading) {
  var MAKE_GRAPH_PATH, def, fmttm, levelColor, levels, sname, stations, url;
  MAKE_GRAPH_PATH = "http://airquality.moepp.gov.mk/graphs/site/pages/MakeGraph.php?";
  def = {
    station: 'SkopjeRegion',
    parameter: "PM10",
    timemode: "Day",
    time: Math.round((new Date()).getTime()),
    language: "mk",
    date: (new Date()).toISOString().slice(0, 10)
  };
  url = MAKE_GRAPH_PATH + ("language=" + def.language) + ("&parameter=" + def.parameter + "&station=" + def.station) + ("&i=" + def.time + "&endDate=" + def.date + "&timeMode=" + def.timemode) + "&graph=StationLineGraph&background=false";
  fmttm = function(s) {
    return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6, 8) + " " + s.slice(9, 11) + ":00";
  };
  levels = {
    good: {
      low: 0,
      high: 51
    },
    moderate: {
      low: 51,
      high: 101
    },
    sensitive: {
      low: 101,
      high: 251
    },
    unhealthy: {
      low: 251,
      high: 351
    },
    veryUnhealthy: {
      low: 351,
      high: 431
    },
    hazardous: {
      low: 431,
      high: 2000
    }
  };
  stations = {
    Centar: "Центар",
    Karpos: "Карпош",
    Lisice: "Лисиче",
    GaziBaba: "Гази Б.",
    Rektorat: "Ректор.",
    Miladinovci: "Милад.",
    Mrsevci: "Мршевци",
    Bitola1: "Битола 1",
    Bitola2: "Битола 2",
    Kicevo: "Кичево",
    Lazaropole: "Лазарополе",
    Tetovo: "Тетово",
    Veles1: "Велес 1",
    Veles2: "Велес 2",
    Kocani: "Кочани",
    Kavadarci: "Кавадарци",
    Kumanovo: "Куманово"
  };
  sname = function(s) {
    return stations[s];
  };
  $scope.sname = sname;
  levelColor = function(v) {
    if (!v) {
      return "#000";
    }
    if ((levels.good.low <= v && v < levels.good.high)) {
      return "#339933";
    } else if ((levels.moderate.low <= v && v < levels.moderate.high)) {
      return "#99ff33";
    } else if ((levels.sensitive.low <= v && v < levels.sensitive.high)) {
      return "#ff9966";
    } else if ((levels.unhealthy.low <= v && v < levels.unhealthy.high)) {
      return "#ff3366";
    } else if ((levels.veryUnhealthy.low <= v && v < levels.veryUnhealthy.high)) {
      return "#cc0066";
    } else if ((levels.hazardous.low <= v && v < levels.hazardous.high)) {
      return "#990066";
    }
  };
  $scope.levelColor = levelColor;
  $ionicLoading.show();
  return $http.get(url).then(function(res) {
    var data, i, k, len, m, measurements, ref, s, t, tms, v;
    $ionicLoading.hide();
    data = res.data;
    $scope.stations = (function() {
      var i, len, ref, results;
      ref = data.stations;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s !== 'Mrsevci') {
          results.push(s);
        }
      }
      return results;
    })();
    $scope.data = res.data;
    tms = Object.keys(data.measurements).sort();
    $scope.tms = tms;
    measurements = [];
    for (i = 0, len = tms.length; i < len; i++) {
      t = tms[i];
      m = {};
      ref = data.measurements[t];
      for (k in ref) {
        v = ref[k];
        if (!!v) {
          m[k] = parseFloat(v);
        }
      }
      measurements.push({
        time: fmttm(t),
        values: m
      });
    }
    $scope.measurements = measurements;
    return console.log(data);
  });
}, function(res) {
  $ionicLoading.show({
    template: "Can't load air pollution data",
    duration: 3000
  });
  return console.log("error: " + res.status);
});

angular.module('app', ['ionic', 'app.air', 'app.map']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('current', {
    url: '/current',
    templateUrl: 'views/current.html'
  }).state('hourly', {
    url: '/hourly',
    templateUrl: 'views/hourly.html'
  }).state('daily', {
    url: '/daily',
    templateUrl: 'views/daily.html'
  }).state('root', {
    url: '/',
    templateUrl: 'views/home.html'
  }).state('air', {
    url: '/air',
    templateUrl: 'views/air.html',
    controller: 'Air'
  }).state('map', {
    url: '/map',
    templateUrl: 'views/map.html',
    controller: 'Map'
  });
  return $urlRouterProvider.otherwise('/current');
}).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).controller('Main', function($scope, $http, $ionicLoading) {
  var KEY, LAT, LNG, getWeather;
  KEY = '6376c1cdba2fa461f346e9a27524406d';
  LAT = 42;
  LNG = 21.43;
  getWeather = function() {
    var url;
    url = "https://api.darksky.net/forecast/" + KEY + "/" + LAT + "," + LNG + "?units=si";
    $ionicLoading.show();
    return $http.get(url).then(function(res) {
      $ionicLoading.hide();
      $scope.weather = res.data;
      return console.log(res.data);
    }, function(res) {
      $ionicLoading.show({
        template: "Can't load air pollution data",
        duration: 3000
      });
      return console.log("error: " + res.status);
    });
  };
  $scope.getWeather = getWeather;
  getWeather();
  $scope.mph2kmph = function(m) {
    return m * 1.609344;
  };
  $scope.mps2kmph = function(m) {
    return 3600.0 * m / 1000;
  };
  $scope.windArrow = function() {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if ($scope.weather == null) {
      return;
    }
    if ((0 <= (ref = $scope.weather.currently.windBearing) && ref < 22.5)) {
      return 'wi-direction-down';
    } else if ((22.5 <= (ref1 = $scope.weather.currently.windBearing) && ref1 < 67.5)) {
      return 'wi-direction-down-left';
    } else if ((67.5 <= (ref2 = $scope.weather.currently.windBearing) && ref2 < 112.5)) {
      return 'wi-direction-left';
    } else if ((112.5 <= (ref3 = $scope.weather.currently.windBearing) && ref3 < 157.5)) {
      return 'wi-direction-up-left';
    } else if ((157.5 <= (ref4 = $scope.weather.currently.windBearing) && ref4 < 202.5)) {
      return 'wi-direction-up';
    } else if ((202.5 <= (ref5 = $scope.weather.currently.windBearing) && ref5 < 247.5)) {
      return 'wi-direction-up-right';
    } else if ((247.5 <= (ref6 = $scope.weather.currently.windBearing) && ref6 < 292.5)) {
      return 'wi-direction-right';
    } else if ((292.5 <= (ref7 = $scope.weather.currently.windBearing) && ref7 < 337.5)) {
      return 'wi-direction-down-right';
    } else {
      return 'wi-direction-down';
    }
  };
  $scope.windArrowFor = function(deg) {
    if ($scope.weather == null) {
      return;
    }
    if ((0 <= deg && deg < 22.5)) {
      return 'wi-direction-down';
    } else if ((22.5 <= deg && deg < 67.5)) {
      return 'wi-direction-down-left';
    } else if ((67.5 <= deg && deg < 112.5)) {
      return 'wi-direction-left';
    } else if ((112.5 <= deg && deg < 157.5)) {
      return 'wi-direction-up-left';
    } else if ((157.5 <= deg && deg < 202.5)) {
      return 'wi-direction-up';
    } else if ((202.5 <= deg && deg < 247.5)) {
      return 'wi-direction-up-right';
    } else if ((247.5 <= deg && deg < 292.5)) {
      return 'wi-direction-right';
    } else if ((292.5 <= deg && deg < 337.5)) {
      return 'wi-direction-down-right';
    } else {
      return 'wi-direction-down';
    }
  };
  $scope.weatherIcon = function() {
    if ($scope.weather == null) {
      return;
    }
    switch ($scope.weather.currently.icon) {
      case 'clear-day':
        return 'wi-day-sunny';
      case 'clear-night':
        return 'wi-night-clear';
      case 'rain':
        return 'wi-rain';
      case 'snow':
        return 'wi-snow';
      case 'sleet':
        return 'wi-sleet';
      case 'wind':
        return 'wi-strong-wind';
      case 'fog':
        return 'wi-fog';
      case 'cloudy':
        return 'wi-cloudy';
      case 'partly-cloudy-day':
        return 'wi-day-cloudy';
      case 'partly-cloudy-night':
        return 'wi-night-alt-partly-cloudy';
      case 'hail':
        return 'wi-hail';
      case 'thunderstorm':
        return 'wi-thunderstorm';
      case 'tornado':
        return 'wi-tornado';
      default:
        return 'wi-na';
    }
  };
  return $scope.weatherIconFor = function(i) {
    switch (i) {
      case 'clear-day':
        return 'wi-day-sunny';
      case 'clear-night':
        return 'wi-night-clear';
      case 'rain':
        return 'wi-rain';
      case 'snow':
        return 'wi-snow';
      case 'sleet':
        return 'wi-sleet';
      case 'wind':
        return 'wi-strong-wind';
      case 'fog':
        return 'wi-fog';
      case 'cloudy':
        return 'wi-cloudy';
      case 'partly-cloudy-day':
        return 'wi-day-cloudy';
      case 'partly-cloudy-night':
        return 'wi-night-alt-partly-cloudy';
      case 'hail':
        return 'wi-hail';
      case 'thunderstorm':
        return 'wi-thunderstorm';
      case 'tornado':
        return 'wi-tornado';
      default:
        return 'wi-na';
    }
  };
});

angular.module('app.map', []).controller('Map', function($scope) {
  var APPID, baseMaps, city, clouds, layerControl, map, osm, overlayMaps;
  APPID = '74caac32fcc2d61b715c249e789a875e';
  osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'some attribution'
  });
  map = L.map("map-id", {
    center: new L.LatLng(42, 21.43),
    zoom: 6,
    layers: [osm]
  });
  clouds = L.OWM.clouds({
    showLegend: false,
    opacity: 0.5,
    appId: APPID
  });
  city = L.OWM.current({
    intervall: 15,
    lang: 'mk'
  });
  baseMaps = {
    "OSM Standard": osm
  };
  overlayMaps = {
    "Clouds": clouds,
    "Cities": city
  };
  layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
  return map.on('locationerror', function(e) {
    return console.log("Leaflet loc err: ", e);
  });
});
