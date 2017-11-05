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
        return $http.get('/api/projects/' + id)
        .then(function (project) {
          project.data.map(project => {
            console.log('Project by id', project.project);
            return project.project;
          });
        });
      },
       getProjects: function () {
        return $http.get('/api/projects')
        .then(function (projects) {
          // console.log('Data', projects.data);
          return projects.data;
        });
      }
    };
  }
]);