(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });

    app.run(function () {});

    app.controller('AppController', function ($scope) {

    });

}(angular.module("Table-Reservation-App", [
    'Table-Reservation-App.home',
    'Table-Reservation-App.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
])));
