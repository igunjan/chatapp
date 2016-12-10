angular.module('ProfileService', []).factory('Profile', ['$http', function($http) {

	    var dataObj = {
        };
        return {
                setData: function (data) {
                        dataObj.username = data.username;
                        dataObj.image = data.image;
                },
                getData: function () {
                        return dataObj;
                }
        };

}]);