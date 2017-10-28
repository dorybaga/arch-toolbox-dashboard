angular.module('myApp', ['ngRoute']);

angular.module('myApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
      .when('/create-user', {
        templateUrl: 'createUser.html',
        controller: 'userController'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'loginController'
      })
      .otherwise({ redirectTo: '/' });

      $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', '$window','UserService', function ($rootScope, $window, UserService) {
      $rootScope.isLoggedIn = localStorage.loggedIn;
      $rootScope.loggedInUser = localStorage.user_id;
      $rootScope.loggedInUserName = localStorage.user.email;

      $rootScope.logout = function () {
        UserService.logout();
        $window.location.href = '/';
      };
    }
  ]);



