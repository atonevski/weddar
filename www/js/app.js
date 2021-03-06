// Generated by CoffeeScript 1.9.3
(function() {
  angular.module('app', ['ionic', 'app.air']).config(function($stateProvider, $urlRouterProvider) {
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

}).call(this);
