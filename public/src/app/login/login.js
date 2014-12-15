(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                "main": {
                    controller: 'LoginController',
                    templateUrl: 'login/login.tpl.html'
                }
            },
            data:{ pageTitle: 'Login' }
        });
    });

    //app.service('Login', ['$scope','$firebase', function (user){
    //
    //    var ref = new Firebase("https://blazing-fire-175.firebaseio.com");
    //
    //    ref.authWithPassword({
    //        email    : user.email,
    //        password : user.password
    //    }, function(error, authData) {
    //        if (error === null) {
    //            // user authenticated with Firebase
    //            console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
    //        } else {
    //            console.log("Error authenticating user:", error);
    //        }
    //    });
    //}]);

    app.controller('LoginController', ["$scope", "$firebase",

    function($scope, $firebase) {

        $scope.Login = function(user) {

            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var ref = new Firebase("https://blazing-fire-175.firebaseio.com");

            ref.authWithPassword({
                email    : user.email,
                password : user.password
            }, function(error, authData) {
                if (error === null) {
                    // user authenticated with Firebase
                    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
                } else {
                    console.log("Error authenticating user:", error);
                }
            });
        };
    }]);

}(angular.module("T-Res-App.login", [
    'firebase',
    'ui.router'
])));