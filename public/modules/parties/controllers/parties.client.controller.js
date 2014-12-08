'use strict';

angular.module('parties').controller('PartiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Parties',
	function($scope, $stateParams, $location, Authentication, Parties) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var party = new Parties({
				title: this.title,
				content: this.content
			});
			party.$save(function(response) {
				$location.path('parties/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		

		$scope.remove = function(party) {
			if (party) {
				party.$remove();

				for (var i in $scope.parties) {
					if ($scope.parties[i] === party) {
						$scope.parties.splice(i, 1);
					}
				}
			} else {
				$scope.party.$remove(function() {
					$location.path('parties');
				});
			}
		};

		$scope.update = function() {
			var party = $scope.party;

			party.$update(function() {
				$location.path('parties/' + party._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.parties = Parties.query();
		};

		$scope.findOne = function() {
			$scope.party = Parties.get({
				partyId: $stateParams.partyId
			});
		};
	}
]);