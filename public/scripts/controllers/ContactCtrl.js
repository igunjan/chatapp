angular.module('ContactCtrl',[]) 
.controller('ContactController', function($scope, $rootScope, $http, Geek, $timeout) {
        'use strict';
		

		var geocoder = new google.maps.Geocoder();
		
		$scope.address = {}

		$scope.map = '';

		$scope.geocodePosition = function(pos) {

			geocoder.geocode({
				latLng: pos
			}, function(responses) {
			  console.log(responses.length)
				if (responses && responses.length > 0) {
					$scope.updateMarkerAddress(responses[0]);
				} else {
					$scope.error = 'I feel free..!!!';
				}
				$scope.address.contact = $scope.address.city +','+ $scope.address.country;
			});
			
		};	

		
	
		$scope.updateMarkerAddress = function(str) {

			var split_address = str.formatted_address.split(',')

			$scope.address.full_address = split_address[0];
			
			// document.getElementById('full_address').innerHTML  = split_address[0];

			for (var i = 0; i < str.address_components.length; i++) {
				for (var j = 0; j < str.address_components[i].types.length; j++) {
					if (str.address_components[i].types[j] == 'administrative_area_level_2') {
						$scope.address.city = str.address_components[i].long_name;
						document.getElementById('city').innerHTML = str.address_components[i].long_name;

					}

					if (str.address_components[i].types[j] == 'country') {
						$scope.address.country = str.address_components[i].long_name;
						document.getElementById('country').innerHTML = str.address_components[i].long_name;
					}
				}
			}
			
		};
		$scope.updateMarkerPosition = function(latLng) {
			$scope.address.latlon = [
				latLng.lat(),
				latLng.lng()
			].join(', ');
			// document.getElementById('latlon').value = $scope.address.latlon;
		};

		$scope.initMapMarker = function(marker_latlon) {
			var lat_lon = marker_latlon;
			if (lat_lon === null) {
				lat_lon = '52.2166667, 6.9';
				lat_lon = lat_lon.split(",");
			} else {
				lat_lon = lat_lon.split(",");
			}
			var latLng = new google.maps.LatLng(lat_lon[0], lat_lon[1]);
			$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
				zoom: 12,
				center: latLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			var marker = new google.maps.Marker({
				position: latLng,
				title: 'Marker',
				map: $scope.map,
				draggable: true
			});

			// Update current position info.
			$scope.geocodePosition(latLng);

			google.maps.event.addListener(marker, 'drag', function() {
				$scope.updateMarkerPosition(marker.getPosition());
			});

			google.maps.event.addListener(marker, 'dragend', function() {
				$scope.geocodePosition(marker.getPosition());
			});
		};
		
		$scope.initMapMarker('52.2166667, 6.9');

		$scope.CreateUser = function(){
			 $scope.user = Geek.getData();	 
			  var data ={
            username : $scope.user.username,
            description : $scope.user.description, 
             age : $scope.user.age,
			 address :$scope.address.contact   
     	   }		
		
             $http.post('/geek', data).success(function (data, headers) {
                    if (data)
                    console.log('created');		
                    });
    	 }
	

	});



