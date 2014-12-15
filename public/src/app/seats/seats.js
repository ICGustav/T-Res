(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('seats', {
            url: '/seats',
            views: {
                "main": {
                    controller: 'SeatsController',
                    templateUrl: 'seats/seats.tpl.html'
                }
            },
            data:{ pageTitle: 'Seats' }
        });
    });

    app.controller('SeatsController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.

            var States = $resource('/states');
            $scope.states = States.query({});

            var Tables = $resource('/tables');
            $scope.tables = Tables.query({});

            var Seats = $resource('/seats');
            $scope.seats= Seats.query({});
        };

        // modifying Seat
        $scope.SaveSeat = function (seat, changedSeat) {
            console.log("Seat: " + seat.order + "\t Selected state: "+ changedSeat.state.name + "\t Selected table: "+ changedSeat.table.order);
            seat.state = changedSeat.state._id;
            seat.table = changedSeat.table._id;
            var Seats = $resource('/seats');
            Seats.save(seat);
            $scope.seats = Seats.query({});
        };

        // clean Seat
        $scope.CleanSeat = function (seat) {
            seat.full_name =  "";
            seat.below_18 = false;
            seat.state = $scope.states[0]._id;
            seat.table = seat.table._id;
            console.log("Seat: " + seat.order + '\t Selected state: '+ $scope.states[0].name);
            var Seats = $resource('/seats');
            Seats.save(seat);
            $scope.seats = Seats.query({});
        };

        // delete Seat
        $scope.DeleteSeat = function (seat) {
            console.log("Seat: " + seat.order);
            var Seat = $resource('/seats/:id'),
                Seats = $resource('/seats');
            Seat.delete({id: seat._id});
            $scope.seats = Seats.query({});
        };

        // adding new Seat
        $scope.AddSeat = function (seat) {
            var seatTemplate = {order: $scope.seats.length, below_18: false};
            var States = $resource('/states');
            var state = States.query({}, function(){
                if (seat === undefined) {
                    seat = {
                        full_name: "",
                        order: seatTemplate.order,
                        below_18: seatTemplate.below_18,
                        state: state[0]._id,
                        table: $scope.tables[0]._id
                    };
                } else {
                    seat.state = state[1]._id;
                    seat.order = seatTemplate.order;
                    seat.below_18 = seatTemplate.below_18;
                    if (seat.table === undefined) {
                        seat.table = $scope.tables[0]._id;
                    } else {
                        seat.table = seat.table._id;
                    }
                }
                console.log("Seat: " + seat.order + '\t Selected state: '+ state[0].name);
                var newSeat = $resource('/seats/add');
                newSeat.save(seat);
                var Seats = $resource('/seats');
                $scope.seats = Seats.query({}, function (data){
                    $scope.addSeat = undefined;
                    return data;

                });

            });

        };

        init();
    });

}(angular.module("T-Res-App.seats", [
    'ui.router'
])));