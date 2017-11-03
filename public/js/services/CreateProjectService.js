angular.module('myApp')
.service('CreateProjectService', ['$http', function ($http) {
  return {
      createNewProject: function (project) {
        return $http.post('/api/projects', project)
        .then(function (project) {
          return project;
        });
      },
       getProjectById: function (id) {
        return $http.get(`/api/projects/${id}`)
        .then(function (project) {
          return project;
        });
      }
    };
  }
]);