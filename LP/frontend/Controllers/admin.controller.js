(function() {
    'use strict';

    angular
        .module('app-lp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', 'UserService', 'FlashService'];

    function AdminController($rootScope, UserService, FlashService) {
        var vm = this;
        vm.item = 0;

        vm.teachers = [];
        vm.workers = [];
        vm.InsertListPresent = InsertListPresent;
        vm.EnableAccount = EnableAccount;
        vm.lp = [];
        vm.lpWorker = [];
        vm.datetimeT = '';
        vm.students = [];

        initController();

        function initController() {
            circliful();
            chart();
            getAllTeacher();
            getAllWorkers();
            getAllStudents();
            $('#datetimeT').datetimepicker({
                daysOfWeekDisabled: [0, 6],
                viewMode: 'years',
                format: 'YYYY-MM-DD HH:mm:ss'
            }).on('dp.change', function(e) {
                var newdate = $('#datetimeT').val();
                vm.datetimeT = newdate;
                console.log($('#datetimeT').val());
            });


            $('#datetimeW').datetimepicker({
                daysOfWeekDisabled: [0, 6],
                viewMode: 'years',
                format: 'YYYY-MM-DD HH:mm:ss'
            }).on('dp.change', function(e) {
                var newdate = $('#datetimeW').val();
                vm.datetimeW = newdate;
                console.log($('#datetimeW').val());
            });
        }


        function getAllTeacher() {
            UserService.GetByRole(['ROLE_TEACHER'], function(response) {
                console.log(response);
                if (response) {
                    vm.teachers = response;
                    generateListPresentTeachers();
                    $('#AllTeachers').DataTable({
                        data: vm.teachers,
                        columns: [
                            { title: "#Id" },
                            { title: "firstName" },
                            { title: "surname" },
                            { title: "email" },
                            { title: "gender" },
                            { title: "age" },
                            { title: "registered" },
                            { title: "isActive" },
                            { title: "phone" },
                            { title: "address" },
                            { title: "about" },
                        ]
                    });
                } else {}
            });

        }

        function getAllWorkers() {
            UserService.GetByRole(['ROLE_WORKER'], function(response) {
                console.log(response);
                if (response) {
                    vm.workers = response;
                    generateListPresentWorkers();
                    $('#AllWorkers').DataTable({
                        data: vm.workers,
                        columns: [
                            { title: "#Id" },
                            { title: "firstName" },
                            { title: "surname" },
                            { title: "email" },
                            { title: "gender" },
                            { title: "age" },
                            { title: "registered" },
                            { title: "isActive" },
                            { title: "phone" },
                            { title: "address" },
                            { title: "about" },
                        ]
                    });
                } else {}
            });

        }

        function getAllStudents() {
            UserService.GetByRole(['ROLE_STUDENT'], function(response) {
                console.log(response);
                if (response) {
                    vm.students = response;
                } else {}
            });
        }

        function InsertListPresent(lp, datetimeLP) {
            //console.log(lp, datetimeLP);
            UserService.InsertListPresent(datetimeLP, lp, function(response) {
                console.log(response);
                if (response.success) {
                    FlashService.Success(response.message);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }



        function generateListPresentTeachers() {
            vm.teachers.forEach(function(t) {
                vm.lp.push({
                    id_user: t.id,
                    isPresent: false
                });
            });
            //console.log(vm.lp);
        }

        function generateListPresentWorkers() {
            vm.workers.forEach(function(t) {
                vm.lpWorker.push({
                    id_user: t.id,
                    isPresent: false
                });
            });
            //console.log(vm.lp);
        }

        function EnableAccount(user) {
            user.isActive = !user.isActive;
            UserService.EnableAccount(user.id, user.isActive, function(response) {
                if (response.success) {
                    FlashService.Success(response.message);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }


        function circliful() {

            $(".circliful-chart").circliful({
                animation: 1,
                animationStep: 6,
                foregroundBorderWidth: 5,
                backgroundBorderWidth: 1,
                percent: 88,
                iconColor: '#3498DB',
                iconSize: '40',
                iconPosition: 'middle'
            });
        }




        function chart() {

            Highcharts.chart('container-chart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly Average Presence'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number Presence'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Admin',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                }, {
                    name: 'Workers',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                }, {
                    name: 'Teachers',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                }, {
                    name: 'Students',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                }]
            });

        }









    }

})();