
angular.module('myApp')
  .controller('userController', ['$scope' , '$window', 'UserService', function($scope, $window, UserService) {
    $scope.user = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        user_role:''
      };

      $scope.createUser = function(){
        newUser ={
          firstName:$scope.user.firstName,
          lastName:$scope.user.lastName,
          email:$scope.user.email,
          password:$scope.user.password,
          user_role:$scope.user.user_role
        };
        UserService.createUser(newUser)
        .then(user => {
          $scope.user.firstName = '';
          $scope.user.firstName = '';
          $scope.user.email = '';
          $scope.user.password = '';
          $scope.user.user_role = '';
        });
      };

      // $scope.user = { firstName: '' };
      // $scope.login = function () {
      //   UserService.login($scope.user)
      //   .then(function (response) {
      //     UserService.setUser(response.firstName);
      //     $window.location.href = '/';

      //   });
      // };


}]);