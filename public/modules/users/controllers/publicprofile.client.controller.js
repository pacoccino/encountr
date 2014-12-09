'use strict';


angular.module('core').controller('PublicProfileController', ['$scope', '$stateParams', '$http',
	function($scope, $stateParams, $http) {
		// This provides Authentication context.
		$scope.userId = $stateParams.id;
		
		$http.get('users/'+ $stateParams.id).then(function(res) {
			console.log("caca");
			console.log(res.data[0]);
			$scope.user = res.data[0];
		});
		
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


		/*var User = $resource('/users/:userId');
		$scope.user = User.query({userId: $stateParams.id})[0];
		
		
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		
		$scope.test = function() {
			
			console.log($scope.user);
		}*/
	}
]);