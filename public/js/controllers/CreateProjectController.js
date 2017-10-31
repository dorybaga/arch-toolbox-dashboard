
angular.module('myApp')
  .controller('CreateProjectController', ['$scope' , '$window', 'CreateProjectService', function($scope, $window, CreateProjectService) {

  $scope.project = {
        title:'',
        address:'',
        job_number:'',
        client_name:'',
        creator:''
      };

      $scope.createProject = function(){
        newProject ={
          title:$scope.project.title,
          address:$scope.project.address,
          job_number:$scope.project.job_number,
          client_name:$scope.project.client_name,
          creator:$scope.project.creator,
        };

        CreateProjectService.createNewProject(newProject)
        .then(project => {
          $scope.project.title = '';
          $scope.project.address = '';
          $scope.project.job_number = '';
          $scope.project.client_name = '';
          $scope.project.creator = '';
        });
      };
}]);