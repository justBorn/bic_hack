'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AppCtrl', ['$scope', 'socket', 'toaster', function ($scope, socket, toaster) {
        socket.on('send:name', function (data) {
            $scope.name = data.name;
        });
    }]).
    controller('MyCtrl1', ['$scope', 'socket', 'toaster', function ($scope, socket, toaster) {
        window.sok = socket; //TODO TEST

        socket.emit('request:get-doors');
        socket.on('send:get-doors', function (data) {
            var door = $scope.doors = {};
            data.forEach(function (a) {
                door[a._id] = a;
            })
        })
        socket.emit('request:get-machines');
        socket.on('send:get-machines', function (data) {
            var door = $scope.machines = {};
            data.forEach(function (a) {
                door[a._id] = a;
            })
        })

        socket.on('send:time', function (data) {
            $scope.time = data.time;

        });
        socket.on('send:door-change-state', function (data) {
            $scope.name = data.name;
        });
        $scope.doorClick = function (id) {
            console.log(id);
        };


        //TODO MOVE ON MOBILE DEVICE
        socket.on('send:open_door', function (data) {
            if (data.result_code == 0) {
                //alert('aprendo la porta : ' + data.door_id);
                toaster.pop('success', "Approved", 'aprendo la porta : ' + data.door_id);
                $scope.doors[data.door_id].state = 1;

            } else if (data.result_code == -1) {
                //alert('Error : ' + data.msg);
                toaster.pop('error', "Error", data.msg);

            }
        });
        socket.on('send:close_door', function (data) {

            if (data.result_code == 0) {
                //alert('aprendo la porta : ' + data.door_id);
                toaster.pop('success', "Approved", 'chiudendo la porta : ' + data.door_id);
                $scope.doors[data.door_id].state = 0;

            }
        });


        setTimeout(function () {
            socket.emit('send:test-send', {
                to_log: 'looooging'
            });
        }, 10000);

    }]).
    controller('MyCtrl2', ['$scope', 'socket', 'toaster', 'uiCalendarConfig', function ($scope, socket, toaster, uiCalendarConfig) {
        window.sok = socket; //TODO TEST

        function room(name, current, cap) {
            this.name = name;
            this.current = current;
            this.capacity = cap;
        }

        // socket.emit('request:get-rooms');
        // socket.on('send:get-rooms',function(data){
        //     var door = $scope.rooms= {};
        //     data.forEach(function(a,b,c){
        //         door[a._id] = new room(a,b,c);
        //     })
        // })
        //calendar
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            console.log(date.title + ' was clicked ');
        };
        $scope.calendarConfig = {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,

            'businessHours': {
                start: '10:00', // a start time (10am in this example)
                end: '18:00', // an end time (6pm in this example)

                dow: [1, 2, 3, 4, 5]
                // days of week. an array of zero-based day of week integers (0=Sunday)
                // (Monday-Thursday in this example)
            },
            'dayNames': ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Domenica"],
            'dayNamesShort': ["Dom", "Lub", "Mar", "Mer", "Gio", "Ven", "Sab"]

        };
        $scope.eventSources = [];
        if (uiCalendarConfig.calendars['myCalendar1']) {

            uiCalendarConfig.calendars['myCalendar1'].
                uiCalendarConfig.calendars['myCalendar1'].fullCalendar('render');
        }

        setTimeout(function () {
            uiCalendarConfig.calendars['myCalendar1'].fullCalendar('changeView', 'agendaWeek');
        }, 0);
        $scope.rooms = [];
        $scope.rooms.push(new room('Stanza 1', 7, 8));
        $scope.rooms.push(new room('Stanza 2', 3, 8));
        $scope.rooms.push(new room('Stanza 3', 4, 12));
        $scope.rooms.push(new room('Stanza 4', 4, 6));

        $scope.getTimes = function (n) {
            var array = new Array(n)

            for (var i = 0; i < n; i++) {
                array[i] = i + 1;
            }

            return array
        };
    }]);