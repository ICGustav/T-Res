(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

    app.controller('AppController', function ($scope, $mdDialog, $mdToast, $location) {
        var tabs = [
            { title: 'Miestnosti', route: "rooms", order: 0, content: ""},
            { title: 'Časti v miestnotiach', route: "parts", order: 1, content: ""},
            { title: 'Stoly', route: "tables", order: 2, content: ""},
            { title: 'Miesta', route: "seats", order: 3, content: ""},
            { title: 'Stavy miest', route: "states", order: 4, content: ""},
            { title: 'Užívatelia', route: "users", order: 5, content: ""},
            { title: 'Register osôb', route: "profiles", order: 6, content: ""}
        ];
        //console.log("Current state: " + $location.path());
        $scope.tabs = tabs;
        $scope.selectedIndex = 2;
        $scope.announceSelected = announceSelected;
        $scope.announceDeselected = announceDeselected;

        function announceDeselected(tab) {
            $scope.farewell = 'Goodbye ' + tab.title + '!';
        }
        function announceSelected(tab) {
            $scope.greeting = 'Hello ' + tab.title + '!';
        }

        $scope.getNavPosition = function() {
            return Object.keys($scope.navPosition)
                .filter(function(pos) { return $scope.navPosition[pos]; })
                .join(' ');
        };
    });

}(angular.module("T-Res-App", [
    'T-Res-App.home',
    'T-Res-App.about',
    'T-Res-App.profile',
    'T-Res-App.rooms',
    'T-Res-App.parts',
    'T-Res-App.tables',
    'T-Res-App.seats',
    'T-Res-App.states',
    'T-Res-App.login',
    'T-Res-App.users',
    //'T-Res-App.userTypes',
    'T-Res-App.profiles',
    'ngMaterial',
    'ngResource',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'firebase'
])));
