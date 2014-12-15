(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('tables', {
            url: '/tables',
            views: {
                "main": {
                    controller: 'TablesController',
                    templateUrl: 'tables/tables.tpl.html'
                }
            },
            data:{ pageTitle: 'Tables' }
        });
    });

    app.controller('TablesController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var States = $resource('/states');
            $scope.states = States.query({});

            var Tables = $resource('/tables');
            $scope.tables = Tables.query({});

            var Parts = $resource('/parts');
            $scope.parts = Parts.query({});


        };

        // modifying Seat if input box
        $scope.SaveTable = function (table) {
            console.log("Selected table order: "+ table.order + " and assigned to tha part_id: " + table.part);
            var Tables = $resource('/tables');
            Tables.save(table);
            $scope.tables = Tables.query({});
        };

        // modifying Seat if selectbox
        //$scope.SaveTable = function (table, changedTable) {
        //    console.log("Selected table order: "+ changedTable.order);
        //    table.order = changedTable.order;
        //    var Tables = $resource('/tables');
        //    Tables.save(table);
        //    $scope.tables = Tables.query({});
        //};

        // clean Seat
        $scope.CleanTable = function (table) {
        //    table.full_name =  "";
        //    table.below_18 = false;
        //    table.state = $scope.states[0]._id;
        //    console.log("Table: " + table.order);
        //    var Tables = $resource('/tables');
        //    Tables.save(table);
        //    $scope.tables = Tables.query({});
        };

        // delete Table
        $scope.DeleteTable = function (table) {
            console.log("Table: " + table.order);
            var Table = $resource('/tables/:id'),
                Tables = $resource('/tables');
            Table.delete({id: table._id});
            $scope.tables = Tables.query({});
        };

        // adding new Table
        $scope.AddTable = function () {
            var table = {
                            order: $scope.tables.length,
                            part: $scope.parts[0]._id
                        };
            console.log("Seat: " + table.order);

            var newTable = $resource('/tables/add');
            newTable.save(table);
            var Tables = $resource('/tables');
            $scope.tables = Tables.query({});
        };


        init();
    });

}(angular.module("T-Res-App.tables", [
    'ui.router'
])));