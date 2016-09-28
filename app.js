(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController )
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyList = this;

  toBuyList.name = "";
  toBuyList.quantity = "";

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function(itemIndex){
    var item = ShoppingListCheckOffService.getOneBoughtItem(itemIndex);
    ShoppingListCheckOffService.buyItem(itemIndex);
    ShoppingListCheckOffService.addItem(item.name, item.quantity);
    console.log(toBuyList.items.length);
  };

  toBuyList.toBuyItem = function(){
    ShoppingListCheckOffService.toBuyItem(toBuyList.name,toBuyList.quantity);
  }
};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
};

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [
    ({
      name : "Cookies",
      quantity : 15
    }),
    ({
      name : "Pasta",
      quantity : 2
    }),
    ({
      name : "Bread",
      quantity : 20
    }),
    ({
      name : "Coke",
      quantity : 100
    }),
    ({
      name : "Chips",
      quantity : 10
    }),
  ];
  var boughtItems = [];

  service.buyItem = function(itemIndex){
    toBuyItems.splice(itemIndex,1)
  };

  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);
    };

    service.toBuyItem = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        toBuyItems.push(item);
      };

  service.getToBuyItems = function(){
    return toBuyItems;
  };

  service.getBoughtItems = function(){
    return boughtItems;
  };

  service.getOneBoughtItem = function(index){
    return toBuyItems[index];
  };
}


})();
