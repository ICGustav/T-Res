/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take of the rest.
 */
(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeController',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data:{ pageTitle: 'Home' }
        });
    });

    app.factory('GetRooms', function ($resource){
        var resource = $resource('/rooms');
        return resource;
    });

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    app.controller('HomeController', function ($scope, $resource, $mdDialog) {

        var init = function() {
            var Rooms = $resource('/rooms');
            var rooms = Rooms.query({}, function(){
                $scope.rooms = rooms;
            });
        };

        $scope.alert = '';
        $scope.showAlert = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Vypis JSON Object-u vsetkych miestnosti...')
                    .content(JSON.stringify($scope.rooms, null, '\t'))
                    .ariaLabel('Password notification')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };

        $scope.someVar = 'blue';
        $scope.someList = ['one', 'two', 'three'];

        init();
    });

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("T-Res-App.home", [
    //'ngMaterial',
    'ui.router'
])));