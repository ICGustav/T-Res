(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            views: {
                "main": {
                    controller: 'ProfileController',
                    templateUrl: 'profile/profile.tpl.html'
                }
            },
            data:{ pageTitle: 'Profile' }
        });
    });

    app.factory("Profile", ["$firebase", function($firebase) {
        return function(username) {
            // create a reference to the user's profile
            var ref = new Firebase("https://blazing-fire-175.firebaseio.com/profiles/").child(username);
            // return it as a synchronized object
            return $firebase(ref).$asObject();
        };
    }]);

    app.controller('ProfileController', ["$scope", "Profile",

    function($scope, Profile) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        };

        init();
            // put our profile in the scope for use in DOM
            //$scope.profile = Profile("physicsmarie");
        // create a three-way binding to our Profile as $scope.profile
        //new Profile("physicsmarie").$bindTo($scope, "profile");

    }]);

}(angular.module("T-Res-App.profile", [
    'firebase',
    'ui.router'
])));