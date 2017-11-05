angular.module('myApp')
.controller(
  'HomeController', ['$scope', 'ProjectService', function ($scope, ProjectService) {
    $scope.projects = [];

    // function filterProject () {

    //   return $scope.projects.filter((project) => {

    //     return project.id === $scope.currentProject;

    //   });
    // }

    // $scope.oneProject = filterProject();

    ProjectService.getProjects()
    .then(function (projects) {
      $scope.projects = projects;
    });

    $scope.setProjectId = function (id) {
      localStorage.removeItem('currentProject');
      localStorage.setItem('currentProject', id);

      var result = localStorage.getItem('currentProject');
      console.log(result);
    };

  }]);