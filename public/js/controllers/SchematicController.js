angular.module('myApp')
.controller(
  'SchematicController', ['$scope', 'ProjectService', '$routeParams', function ($scope, ProjectService, $routeParams) {

    var route = $routeParams.id;
    console.log('This is the route', route);


    $scope.projectId = localStorage.getItem('currentProject');

    $scope.setProjectId = function (id) {
      localStorage.removeItem('currentProject');
      localStorage.setItem('currentProject', id);

      $scope.result = localStorage.getItem('currentProject');

    };

    ProjectService.getProjectById(route)
    .then(function (project) {
      $scope.project = {

      };
    });


  }]);