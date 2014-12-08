'use strict';

// Setting up route
angular.module('parties').config(['$stateProvider',
	function($stateProvider) {
		// parties state routing
		$stateProvider.
		state('listParties', {
			url: '/parties',
			templateUrl: 'modules/parties/views/list-parties.client.view.html'
		}).
		state('createParties', {
			url: '/parties/create',
			templateUrl: 'modules/parties/views/create-party.client.view.html'
		}).
		state('viewParty', {
			url: '/parties/:partyId',
			templateUrl: 'modules/parties/views/view-party.client.view.html'
		}).
		state('editParty', {
			url: '/parties/:partyId/edit',
			templateUrl: 'modules/parties/views/edit-party.client.view.html'
		}).
		state('askParty', {
			url: '/parties/:partyId/ask',
			templateUrl: 'modules/parties/views/ask-party.client.view.html'
		});
	}
]);