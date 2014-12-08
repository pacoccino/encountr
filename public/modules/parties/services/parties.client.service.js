'use strict';

//Parties service used for communicating with the parties REST endpoints
angular.module('parties').factory('Parties', ['$resource',
	function($resource) {
		return $resource('parties/:partyId', {
			partyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);