angular.module('myApp')
.controller(
  'SchematicController', ['$scope', 'ProjectService', '$routeParams', function ($scope, ProjectService, $routeParams) {

    $scope.projectId = localStorage.getItem('currentProject');

    ProjectService.getProjectById()
    .then(function (project) {
      $scope.project = {


      };
    });


  }]);