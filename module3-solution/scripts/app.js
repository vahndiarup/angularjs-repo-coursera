(function () {

    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);


    function FoundItems() {

        var ddo = {
            scope: {
                items: "<",
                onRemove: '&',
                errorMessage: "<"
            },
            templateUrl: '../module3-solution/directives/foundItems.html',
            controller: NarrowItDownController,
            controllerAs: 'narrowIt',
            bindToController: true
        };

        return ddo;
    }


    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {

        var service = this;
        var restEndPoint = "https://davids-restaurant.herokuapp.com/menu_items.json";
        var filteredItems = [];

        service.getMatchedMenuItems = function(searchTerm) {

            var searchTermLower = searchTerm.toLowerCase();
            return $http.get(restEndPoint).then(function (result) {
                // process result and only keep items that match
                var foundItems = result.data;
                // return processed items
                filteredItems =  foundItems.menu_items.filter(function(obj) {
                    return obj['name'].toLowerCase().includes(searchTermLower);
                });
                if (searchTerm == '') {
                    return [];
                }
                else {
                    return filteredItems;
                }
            });
        };

        service.removeItem = function(index) {
            filteredItems.splice(index, 1);
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {

        var narrowIt = this;
        narrowIt.found = [];
        narrowIt.searchTerm = '';
        narrowIt.errorMessage = '';

        narrowIt.getMatchedMenuItems = function(searchTerm) {

            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
                    narrowIt.found = response;
                    if (narrowIt.found.length == 0) {
                        narrowIt.errorMessage = 'Nothing Found';
                    }
                    else {
                        narrowIt.errorMessage = '';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        };

        narrowIt.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };

    }

})();
