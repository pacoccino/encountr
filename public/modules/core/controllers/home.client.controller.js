'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'Users', 'UserTool', 'uiGmapGoogleMapApi',
	function($scope, $http, Authentication, Users, UserTool, uiGmapGoogleMapApi) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.userList = Users.query();
		
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		
		//$scope.toggleAvailability = SettingsController.toggleAvailability();
		$scope.toggleAvailability = function() {
			UserTool.toggleAvailability(function(stat) {
				$scope.authentication.user.available = stat;
				$scope.reloadList();
			});
		};

		$scope.locale = function(piece, value) {
			if(piece === 'available') {
				if(value)
					return 'Available';
				else
					return 'Unavailable';
			}
			return 'error';
		};
		
		$scope.reloadList = function() {
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

		uiGmapGoogleMapApi.then(function(maps) {

    	});

	}
]);


angular.module('activities').filter('availabler', function() {
    return function(stat) {
        return stat ? 'Available' : 'Unavailable';
    };
});