(function () {
    'use strict';

    angular.module('LunchCheckApp', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope']
    function LunchCheckController($scope) {

        $scope.lunchDishesCsv = "";
        $scope.message = "";
        $scope.getLunchDishes = function () {
            if ($scope.lunchDishesCsv.trim() == "") {
                return [];
            }
            return $scope.lunchDishesCsv
                .split(",")
                .map(function (str) {
                    return str.trim()
                });
        };
        $scope.numberOfDishes = function() {
            return $scope.getLunchDishes().length;
        };
        $scope.hasChoices = function() {
            return $scope.numberOfDishes() > 0;
        };
        $scope.checkIfTooMuch = function() {
            if ($scope.numberOfDishes() == 0) {
                $scope.message = "Please enter data first"
            }
            else if ($scope.numberOfDishes() <=3){
                $scope.message = "Enjoy!";
            }
            else {
                $scope.message = "Too Much!";
            }
        };
    }

})();