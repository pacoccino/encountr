'use strict';

// Configuring the Articles module
angular.module('activities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Activities', 'activities', 'dropdown', '/activities(/create)?');
		Menus.addSubMenuItem('topbar', 'activities', 'List', 'activities');
		Menus.addSubMenuItem('topbar', 'activities', 'Create activity', 'activities/create');
	}
]);