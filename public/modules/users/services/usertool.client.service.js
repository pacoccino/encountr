'use strict';

// Authentication service for user variables
angular.module('users').factory('UserTool', ['$http',
	function($http) {
		var tool = {};

		tool.toggleAvailability = function(call) {
			$http.put('/users/toggleAvailability').success(function(response) {
				call(response);
			}).error(function(response) {
				call('error');
			});
		};
		
		tool.setPosition = function(pos, call) {
			
			var LatLng = pos.split(',');
			var Lat = parseFloat(LatLng[0]);
			var Lng = parseFloat(LatLng[1]);
			console.log(Lat + ',' + Lng);
			var data = {
				position : { latitude :Lat, longitude: Lng }
			};
			$http.put('/users/updatePosition', data).success(function(response) {
				call(response);
			}).error(function(response) {
				call('error');
			});
		};

		return tool;
	}
]);