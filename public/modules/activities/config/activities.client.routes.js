'use strict';

// Setting up route
angular.module('activities').config(['$stateProvider',
	function($stateProvider) {
		// activities state routing
		$stateProvider.
		state('listActivities', {
			url: '/activities',
			templateUrl: 'modules/activities/views/list-activities.client.view.html'
		}).
		state('createActivities', {
			url: '/activities/create',
			templateUrl: 'modules/activities/views/create-activity.client.view.html'
		}).
		state('viewActivity', {
			url: '/activities/:activityId',
			templateUrl: 'modules/activities/views/view-activity.client.view.html'
		}).
		state('editActivity', {
			url: '/activities/:activityId/edit',
			templateUrl: 'modules/activities/views/edit-activity.client.view.html'
		}).
		state('askActivity', {
			url: '/activities/:activityId/ask',
			templateUrl: 'modules/activities/views/ask-activity.client.view.html'
		});
	}
]);