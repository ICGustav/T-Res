(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });

    app.controller('AppController', function ($scope) {

    });

}(angular.module("T-Res-App", [
    'T-Res-App.home',
    'T-Res-App.about',
    'T-Res-App.admin',
    'T-Res-App.profile',
    'T-Res-App.rooms',
    'T-Res-App.parts',
    'T-Res-App.tables',
    'T-Res-App.seats',
    'T-Res-App.states',
    'T-Res-App.login',
    'T-Res-App.users',
    'T-Res-App.userTypes',
    'T-Res-App.profiles',
    'ngMaterial',
    'ngResource',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'firebase'
])));
