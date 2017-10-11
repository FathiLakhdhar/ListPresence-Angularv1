(function() {
    'use strict';

    angular
        .module('app-lp')
        .factory('ClassService', ClassService);

    ClassService.$inject = ['$http', '$rootScope'];

    function ClassService($http, $rootScope) {
        var service = {};

        service.GetClassByTeacher = GetClassByTeacher;
        service.GetAll = GetAll;
        service.addClass = addClass;
        service.archive = archive;

        return service;

        function GetAll(callback) {
            $http.get('/LP/backend/getClass.php')
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }

        function GetClassByTeacher(email, callback) {
            $http.get('/LP/backend/getClassByTeacher.php', { params: { email: email } })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }

        function addClass(email, name, callback) {
            $http.post('/LP/backend/addClass.php', { email: email, name: name })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }


        function archive(id_class, id_teacher, archive, callback) {
            $http.post('/LP/backend/archiveClass.php', { id_class: id_class, id_teacher: id_teacher, archive: archive })
                .then(function(response) {
                    callback(response.data);
                }, function(response) {
                    callback(response);
                });
        }




    }


})();