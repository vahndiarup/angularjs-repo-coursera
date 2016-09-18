(function () {

    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    function ShoppingListCheckOffService() {

        var service = this;

        // Lists of to-buy and bought shopping items
        var itemsToBuy = [
            {name: 'Boxes of Cookies', quantity: 5},
            {name: 'Cheeseballs', quantity: 4},
            {name: 'Cans of Soda', quantity: 6},
            {name: 'Pints of Milk', quantity: 2},
            {name: 'Packets of Cereal', quantity: 3}
        ];
        var itemsBought = [];

        service.getItemsToBuy = function () {
          return itemsToBuy;  
        };

        service.getBoughtItems = function () {
            return itemsBought;
        };

        service.numberOfItemsToBuy = function() {
            return itemsToBuy.length;
        };

        service.numberOfItemsBought = function() {
            return itemsBought.length;
        };
        
        service.buyItem = function (itemIndex) {
            var boughtItem = itemsToBuy.splice(itemIndex, 1)[0];
            itemsBought.push(boughtItem);
        };

    }

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {

        var toBuy = this;

        toBuy.getItems = function(){
            return ShoppingListCheckOffService.getItemsToBuy();
        };
        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
        toBuy.numberOfItemsToBuy = function() {
            return ShoppingListCheckOffService.numberOfItemsToBuy();
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {

        var bought = this;

        bought.getItems = function() {
          return ShoppingListCheckOffService.getBoughtItems();
        };

        bought.numberOfItemsBought = function() {
            return ShoppingListCheckOffService.numberOfItemsBought();
        };

    }

})();
