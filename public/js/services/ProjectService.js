angular.module('myApp')
.service('ProjectService', ['$http', function ($http) {
  return {
      createNewProject: function (project) {
        return $http.post('/api/projects', project)
        .then(function (project) {
          return project;
        });
      },
       getProjectById: function (id) {
        return $http.get('/api/projects/', id)
        .then(function (project) {
          console.log(project.data);
          return project.data;
        });
      },
       getProjects: function () {
        return $http.get('/api/projects')
        .then(function (projects) {
          return projects.data;
        });
      }
    };
  }
]);