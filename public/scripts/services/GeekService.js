'use strict';
angular.module('GeekService', []).factory('Geek', ['$http', function ($http) {

        var dataObj = {};
        return {
                setData: function (data) {
                        dataObj.username = data.username;
                        dataObj.description = data.description;
                        dataObj.age = data.age;
                        dataObj.address = data.address;
                },
                getData: function () {
                        return dataObj;
                }
        };
}]);
