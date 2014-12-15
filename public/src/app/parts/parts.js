(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('parts', {
            url: '/parts',
            views: {
                "main": {
                    controller: 'PartsController',
                    templateUrl: 'parts/parts.tpl.html'
                }
            },
            data:{ pageTitle: 'Parts' }
        });
    });

    app.controller('PartsController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var States = $resource('/states');
            $scope.states = States.query({});

            var Tables = $resource('/tables');
            $scope.tables = Tables.query({});

            var Parts = $resource('/parts');
            $scope.parts = Parts.query({});

            var Rooms = $resource('/rooms');
            $scope.rooms = Rooms.query({});

        };

        // modifying Part if input box
        $scope.SavePart = function (part) {
            console.log("Selected part order: "+ part.order);
            var Parts = $resource('/parts');
            Parts.save(part);
            $scope.parts = Parts.query({});
        };

        // modifying Part if selectbox
        //$scope.SavePart = function (part, changedPart) {
        //    console.log("Selected Part order: "+ changedPart.order);
        //    part.order = changedPart.order;
        //    var Parts = $resource('/parts');
        //    Parts.save(part);
        //    $scope.parts = Parts.query({});
        //};

        // clean Part
        $scope.CleanPart = function (part) {
            part.name =  "";
            part.positioning = "";
            console.log("Part: " + part.order);
            var Parts = $resource('/parts');
            Parts.save(part);
            $scope.parts = Parts.query({});
        };

        // delete Part
        $scope.DeletePart = function (part) {
            console.log("Part: " + part.name);
            var Part = $resource('/parts/:id'),
                Parts = $resource('/parts');
            Part.delete({id: part._id});
            $scope.parts = Parts.query({});
        };

        // adding new Part
        $scope.AddPart = function (part) {
            if ($scope.parts === undefined) {
                $scope.parts = {
                    order: 0,
                    room: $scope.rooms[0]._id
                };
            }
            var partTemplate = {
                            name: "",
                            positioning: "",
                            order: $scope.parts.length,
                            room: $scope.rooms[0]._id
                        };
            if (part === undefined) {
                part = partTemplate;
            }
            console.log("Part: " + part.order);
            var newPart = $resource('/parts/add');
            newPart.save(part);
            var Parts = $resource('/parts');
            $scope.parts = Parts.query({});
            $scope.newPart = undefined;
        };


        init();
    });

}(angular.module("T-Res-App.parts", [
    'ui.router'
])));