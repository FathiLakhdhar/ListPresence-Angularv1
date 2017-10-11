(function() {
    'use strict';

    angular
        .module('app-lp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];

    function UserService($http, $rootScope) {
        var service = {};

        service.GetByRole = GetByRole;
        service.InsertListPresent = InsertListPresent;
        service.EnableAccount = EnableAccount;

        return service;

        function GetByRole(roles, callback) {
            $http.get('/LP/backend/getUsers.php', { params: { roles: JSON.stringify(roles) } })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }


        function InsertListPresent(date, lp, callback) {
            $http.post('/LP/backend/insert-list-present.php', { date: date, list: lp })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }

        function EnableAccount(id_user, enable, callback) {
            $http.post('/LP/backend/enable.php', { id_user: id_user, enable: enable })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }


    }


})();