'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	parties = require('../../app/controllers/parties.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/parties')
		.get(parties.list)
		.post(users.requiresLogin, parties.create);

	app.route('/parties/:partyId')
		.get(parties.read)
		.put(users.requiresLogin, parties.hasAuthorization, parties.update)
		.delete(users.requiresLogin, parties.hasAuthorization, parties.delete);

	// Finish by binding the article middleware
	app.param('partyId', parties.partyByID);
};