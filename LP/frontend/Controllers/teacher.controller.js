(function() {
    'use strict';

    angular
        .module('app-lp')
        .controller('TeacherController', TeacherController);

    TeacherController.$inject = ['$rootScope', 'UserService', 'FlashService', 'ClassService'];

    function TeacherController($rootScope, UserService, FlashService, ClassService) {
        var vm = this;
        vm.item = 0;
        //vm.gender = "male";
        vm.class = [];
        vm.addClass = addClass;
        vm.archive = archive;
        vm.students = [];

        vm.updateListP = updateListP;
        vm.InsertListPresentStudents = InsertListPresentStudents;
        vm.lps = [];





        initController();

        function initController() {
            chart();
            getAllClass();
            getAllStudents();
            datetime();
        }



        function getAllClass() {
            ClassService.GetClassByTeacher($rootScope.globals.currentUser.email, function(response) {
                console.log(response);
                if (response.success) {
                    vm.class = response.class;
                } else {

                }
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


        function archive(c) {
            c.archive = !c.archive;
            ClassService.archive(c.id, c.id_teacher, c.archive, function(response) {
                console.log(response);
                if (response.success) {

                } else {
                    FlashService.Error(response.message);
                }
            });
        }


        function addClass() {
            ClassService.addClass($rootScope.globals.currentUser.email, vm.newClass, function(response) {
                if (response.success) {
                    getAllClass();
                } else {
                    FlashService.Error(response.message);
                }
            })
        }

        function updateListP() {
            vm.lps = [];
            angular.forEach(vm.students, function(value, key) {
                if (value.id_class === vm.select) {
                    vm.lps.push({
                        id_user: value.id,
                        isPresent: false
                    });
                }
            });
        }

        function InsertListPresentStudents() {
            console.log(vm.lps, vm.datetimeS);
            UserService.InsertListPresent(vm.datetimeS, vm.lps, function(response) {
                console.log(response);
                if (response.success) {
                    FlashService.Success(response.message);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }


        function datetime() {
            $('#datetimeS').datetimepicker({
                daysOfWeekDisabled: [0, 6],
                viewMode: 'years',
                format: 'YYYY-MM-DD HH:mm:ss'
            }).on('dp.change', function(e) {
                var newdate = $('#datetimeS').val();
                vm.datetimeS = newdate;
                console.log($('#datetimeS').val());
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