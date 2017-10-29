
angular.module('myApp')
  .controller('HomeController', ['$scope' , '$window', 'HomeService', function($scope, $window, HomeService) {
$scope.projects = [
  {creator: "scott", body: "jdhsafljkgjdf"},
  {creator: "luke", body: "jdhsafljkgjdf"},
  {creator: "dory", body: "jdhsafljkgjdf"},
  {creator: "josh", body: "jdhsafljkgjdf"},
  {creator: "heather", body: "jdhsafljkgjdf"},
  {creator: "niya", body: "jdhsafljkgjdf"},
  {creator: "frisbee", body: "jdhsafljkgjdf"},
  {creator: "luke", body: "jdhsafljkgjdf"}
];


}]);