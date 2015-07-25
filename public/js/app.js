'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',

    // 3rd party dependencies
    'btford.socket-io',
    'toaster',
    'ui.calendar'

]).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/overview', {
                templateUrl: 'partials/overview',
                controller: 'MyCtrl1'
            }).
            when('/postazioni', {
                templateUrl: 'partials/postazioni',
                controller: 'MyCtrl2'
            }).
            when('/macchinari', {
                templateUrl: 'partials/macchinari',
                controller: 'MyCtrl2'
            }).
            otherwise({
                redirectTo: '/overview'
            });

        $locationProvider.html5Mode(true);
    });
