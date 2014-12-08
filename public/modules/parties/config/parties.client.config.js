'use strict';

// Configuring the Articles module
angular.module('parties').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Soirees', 'parties', 'dropdown', '/parties(/create)?');
		Menus.addSubMenuItem('topbar', 'parties', 'Liste', 'parties');
		Menus.addSubMenuItem('topbar', 'parties', 'Creer soiree', 'parties/create');
	}
]);