'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'Users', 'UserTool',
	function($scope, $http, Authentication, Users, UserTool) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		$scope.userList = Users.query();
		
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		
		//$scope.toggleAvailability = SettingsController.toggleAvailability();
		$scope.toggleAvailability = function() {
			UserTool.toggleAvailability(function(stat) {
				console.log(stat);
				$scope.authentication.user.available = stat;
				$scope.reloadList();
			});
		};
		
		$scope.reloadList = function() {
			console.log('reload');
			$scope.userList = Users.query();
		};
		
		$scope.coordToString = function(stat) {
			return stat.latitude + ',' + stat.longitude;
		};
		
		if(Authentication.user && Authentication.user.actualPosition)
			$scope.positionString = $scope.coordToString(Authentication.user.actualPosition);
		
		$scope.setPos = function() {
			UserTool.setPosition($scope.positionString, function(ret) {
				$scope.positionString = $scope.coordToString(ret);
				$scope.reloadList();
			});
		};

	}
]);