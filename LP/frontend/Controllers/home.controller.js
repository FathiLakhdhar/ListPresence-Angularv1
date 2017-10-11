(function() {
    'use strict';

    angular
        .module('app-lp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope'];

    function HomeController($rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];

        initController();

        function initController() {}

    }

})();