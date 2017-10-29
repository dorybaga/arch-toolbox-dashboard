angular.module('myApp', ['ngRoute']);

angular.module('myApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
      .when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/create-user', {
        templateUrl: 'createUser.html',
        controller: 'userController'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'userController'
      })
      .otherwise({ redirectTo: '/home' });

      $locationProvider.html5Mode(true);
  }])
  .run();



