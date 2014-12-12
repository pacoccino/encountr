'use strict';

(function() {
	// Activities Controller Spec
	describe('ActivitiesController', function() {
		// Initialize global variables
		var ActivitiesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Activities controller.
			ActivitiesController = $controller('ActivitiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one activity object fetched from XHR', inject(function(Activities) {
			// Create sample activity using the Activities service
			var sampleActivity = new Activities({
				title: 'An Activity about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample activities array that includes the new activity
			var sampleActivities = [sampleActivity];

			// Set GET response
			$httpBackend.expectGET('activities').respond(sampleActivities);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.activities).toEqualData(sampleActivities);
		}));

		it('$scope.findOne() should create an array with one activity object fetched from XHR using a activityId URL parameter', inject(function(Activities) {
			// Define a sample activity object
			var sampleActivity = new Activities({
				title: 'An Activity about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.activityId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/activities\/([0-9a-fA-F]{24})$/).respond(sampleActivity);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.activity).toEqualData(sampleActivity);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Activities) {
			// Create a sample activity object
			var sampleActivityPostData = new Activities({
				title: 'An Activity about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample activity response
			var sampleActivityResponse = new Activities({
				_id: '525cf20451979dea2c000001',
				title: 'An Activity about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Activity about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('activities', sampleActivityPostData).respond(sampleActivityResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the activity was created
			expect($location.path()).toBe('/activities/' + sampleActivityResponse._id);
		}));

		it('$scope.update() should update a valid activity', inject(function(Activities) {
			// Define a sample activity put data
			var sampleActivityPutData = new Activities({
				_id: '525cf20451979dea2c000001',
				title: 'An Activity about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock activity in scope
			scope.activity = sampleActivityPutData;

			// Set PUT response
			$httpBackend.expectPUT(/activities\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/activities/' + sampleActivityPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid activityId and remove the activity from the scope', inject(function(Activities) {
			// Create new activity object
			var sampleActivity = new Activities({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new activities array and include the activity
			scope.activities = [sampleActivity];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/activities\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleActivity);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.activities.length).toBe(0);
		}));
	});
}());