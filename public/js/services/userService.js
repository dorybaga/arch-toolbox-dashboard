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

    setUser: function (user) {
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('user', user.name);
      localStorage.setItem('loggedIn', true);
    },

    logout: function () {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
      localStorage.setItem('loggedIn', '');
    }
    };
  }
]);