angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'scripts/views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'scripts/views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'scripts/views/geek.html',
			controller: 'GeekController'	
		})
		
		.when('/contact', {
			templateUrl: 'scripts/views/contact.html',
			controller: 'ContactController'	
		})

		.when('/profile', {
			templateUrl: 'scripts/views/profile.html',
			controller: 'ProfileController'	
		})
		
		.otherwise({
       redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
	

		


}]);