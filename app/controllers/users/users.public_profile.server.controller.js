'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');



/**
 * Public list of users
 */
exports.publicList = function(req, res) {
	var fields = {
		'displayName': 1, 
		'actualPosition': 1, 
		'profilePicture': 1, 
		'homeTown': 1,
		'available': 1
		};
	var finder = {};
	
	if(req.params.id)
		finder = {_id :req.params.id};
		
	User.find(finder).sort('-created').select(fields).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};
