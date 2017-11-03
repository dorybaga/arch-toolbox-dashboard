angular.module('myApp')
.service('UserService', ['$http', function ($http) {
  return {
    createUser: function (user) {
      return $http.post('/api/users', user)
      .then(function (user) {
        return user;
      });
    },

    login: function (user) {
      return $http.post('/api/login', user)
      .then(function (response) {
        return response.data;
      });
    },

    logout: function () {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
      localStorage.setItem('loggedIn', '');
    }
   };
  }
]);

