angular.module('myApp')
.controller(
  'HomeController', ['$scope', 'ProjectService', function ($scope, ProjectService) {
    $scope.projects = [];


    $scope.project_id = localStorage.getItem('currentProject');

    ProjectService.getProjects()
    .then(function (projects) {
      $scope.projects = projects;
    });

    $scope.setProjectId = function (id) {
      localStorage.removeItem('currentProject');
      localStorage.setItem('currentProject', id);

      $scope.result = localStorage.getItem('currentProject');

    };

  }]);