(function() {
    'use strict';

    angular
        .module('app-lp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', '$rootScope', 'FlashService'];

    function RegisterController(AuthenticationService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        vm.gender = "male";

        function register() {
            vm.dataLoading = true;
            console.log(vm.firstname, vm.surname, vm.email, vm.password, vm.age, vm.gender);
            AuthenticationService.Register(vm.firstname, vm.surname, vm.email, vm.password, vm.age, vm.gender, function(response) {
                console.log(response);
                if (response.success) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });

        }
    }

})();