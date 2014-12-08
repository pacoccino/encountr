'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'Users',
	function($scope, $http, Authentication, Users) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		$scope.userList = Users.query();
		
		$scope.toggleAvailability = function() {
			$http.post('/users/toggleAvailability').success(function(response) {

			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);