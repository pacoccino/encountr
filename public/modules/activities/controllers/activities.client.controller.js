'use strict';

angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities',
	function($scope, $stateParams, $location, Authentication, Activities) {
		$scope.authentication = Authentication;
		$scope.locationString = '0,0';

		$scope.toCoords = function(text) {
			console.log(text);
			var LatLng = text.split(',');
			var Lat = parseFloat(LatLng[0]);
			var Lng = parseFloat(LatLng[1]);
			var coords = { latitude :Lat, longitude: Lng };
			return coords;
		};

		$scope.toString = function(pos) {
			return pos.latitude + ',' + pos.longitude;
		};

		$scope.create = function() {
			var activity = new Activities({
				title: this.title,
				content: this.content,
				date: this.date,
				location: $scope.toCoords(this.location)
			});
			activity.$save(function(response) {
				$location.path('activities/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		

		$scope.remove = function(activity) {
			if (activity) {
				activity.$remove();

				for (var i in $scope.activities) {
					if ($scope.activities[i] === activity) {
						$scope.activities.splice(i, 1);
					}
				}
			} else {
				$scope.activity.$remove(function() {
					$location.path('activities');
				});
			}
		};

		$scope.update = function() {
			var activity = $scope.activity;
			activity.location = $scope.toCoords($scope.locationString);

			activity.$update(function() {
				$location.path('activities/' + activity._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.participate = function(activity) {
			if ( activity.participants.indexOf($scope.authentication.user._id) === -1 ) {
				activity.participants.push($scope.authentication.user._id);
			}
			//activity.participants = [];

			activity.$update(function() {
				$location.path('activities/' + activity._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.activities = Activities.query();
		};

		$scope.findOne = function() {
			$scope.activity = Activities.get({
				activityId: $stateParams.activityId
			},
			function() {
				$scope.locationString = $scope.toString($scope.activity.location);
			});
		};
	}
]);

angular.module('activities').filter('filterOld', function() {
    return function(items) {
        var retn = [];
        
        angular.forEach(items, function(item){
        	var d = new Date(item.date);
        	console.log(d.getTime());
        	console.log(Date.now());
            if(d.getTime() > Date.now()){
              retn.push(item); 
            }
        });
        
        return retn;
    };
});

angular.module('activities').filter('filterNew', function() {
    return function(items) {
        var retn = [];
        
        angular.forEach(items, function(item){
        	var d = new Date(item.date);
        	console.log(d.getTime());
        	console.log(Date.now());
            if(d.getTime() <= Date.now()){
              retn.push(item); 
            }
        });
        
        return retn;
    };
});