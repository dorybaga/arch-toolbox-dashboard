
angular.module('myApp')
  .controller('CreateProjectController', ['$scope' , '$window', 'ProjectService', function($scope, $window, ProjectService) {

      $scope.project = {
            title:'',
            address:'',
            job_number:'',
            client_name:'',
            creator:''
          };

      $scope.currentProjectId = localStorage.getItem('currentProject');

      $scope.currentProjectData = '';

      $scope.projectById = function(){
        ProjectService.getProjectById($scope.currentProject)
        .then(project => {
            var data = project.data;
            console.log(project);
            $scope.currentProjectData = data;
        });
      };

      $scope.createProject = function(){
        newProject ={
          title:$scope.project.title,
          address:$scope.project.address,
          job_number:$scope.project.job_number,
          client_name:$scope.project.client_name,
          creator:$scope.project.creator,
        };

        ProjectService.createNewProject(newProject)
        .then(project => {
          localStorage.removeItem('currentProject');
          localStorage.setItem('currentProject', project.data.id);
          $scope.project.title = '';
          $scope.project.address = '';
          $scope.project.job_number = '';
          $scope.project.client_name = '';
          $scope.project.creator = '';
          window.location.href = '/projects/{{currentProject}}/schematics';
        });
      };
}]);