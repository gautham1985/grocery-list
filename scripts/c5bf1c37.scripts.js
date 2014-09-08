"use strict";angular.module("ApplicationSettings",[]).constant("ApplicationSettings",{LocalDatabase:{enabled:!1}}),angular.module("utilities.module",["ApplicationSettings"]),angular.module("utilities.module").service("$localStorage",[function(){var a=window.localStorage;return a||(a={}),{get:function(b){var c;try{c=JSON.parse(a[b])}catch(d){c=a[b]}return c},set:function(b,c){var d=function(){return"object"==typeof c?void(a[b]=JSON.stringify(c)):void(a[b]=c)};d()}}}]).service("$localDatabase",["$q","$localStorage","ApplicationSettings",function(a,b,c){function d(){j=openDatabase(k.name,k.version,k.description,k.size)}function e(){return h=a.defer(),j.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS "+l.name+" ("+l.columns[1]+" VARCHAR UNIQUE,"+l.columns[2]+" TEXT)",[],function(){h.resolve(!0)})}),h.promise}function f(b,c){return h=a.defer(),j.transaction(function(a){a.executeSql("INSERT OR REPLACE INTO "+l.name+" ("+l.columns[1]+","+l.columns[2]+") VALUES (?, ?)",[b,c],function(){h.resolve(!0)})}),h.promise}function g(b){return h=a.defer(),j.transaction(function(a){a.executeSql("SELECT * FROM "+l.name+" WHERE key = ?",[b],function(a,b){var c,d=b.rows.length;for(c=0;d>c;c++)h.resolve(b.rows.item(c).value)})}),h.promise}var h,i=!1;if(!window.openDatabase||!c.LocalDatabase.enabled)return{isAvailable:i,get:function(c){return h=a.defer(),h.resolve(b.get(c)),h.promise},set:function(c,d){return h=a.defer(),h.resolve(b.set(c,d)),h.promise}};i=!0;var j,k={name:"StorageData",version:"1.0",description:"Stores the key and value data",size:2097152},l={name:"StorageTable",columns:{1:"key",2:"value"}};return d(),e(),{isAvailable:i,get:function(a){return g(a)},set:function(a,b){return f(a,b)}}}]),angular.module("groceryListApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.router","ApplicationSettings","ngTouch","utilities.module","ui.keypress"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/main",{templateUrl:"views/menu-panel.html",controller:"MenuPanelCtrl"}).when("/main/list",{templateUrl:"/views/list-board.html",controller:"ListBoardCtrl",resolve:{ShoppingListService:"ShoppingListService"}}).when("/main/list/:id",{templateUrl:"/views/item-list.html",controller:"ItemListCtrl"}).when("/main/create",{templateUrl:"/views/add-shopping-items.html",controller:"AddShoppingItemsCtrl"}).when("/main/register",{templateUrl:"/views/register-online.html",controller:"RegisterOnlineCtrl"}).otherwise({redirectTo:"/main"})}]).run(["$rootScope","$location",function(a,b){FastClick.attach(document.body,null),a.$location=b}]),angular.module("groceryListApp").controller("MainCtrl",[function(){}]),angular.module("groceryListApp").controller("ListBoardCtrl",["$scope","ShoppingListService",function(a,b){var c=b.getShoppingList();a.lists=c}]),angular.module("groceryListApp").controller("ItemListCtrl",["$scope","ShoppingListService","$routeParams",function(a,b,c){var d=b.getAList(parseInt(c.id));a.lists=d.list.items}]),angular.module("groceryListApp").controller("MenuPanelCtrl",["$scope","$rootScope","$location",function(a,b,c){b.menuActive=!0,a.menu={create:{},view:{},online:{},exit:{}},a.goState=function(a){switch(b.menuActive=!1,a){case 0:c.path("main/create");break;case 1:c.path("main/list");break;case 2:break;case 3:}}}]),angular.module("groceryListApp").service("ShoppingListService",["$localDatabase",function(a){function b(a){for(var b in e)if(e[b].title===a)return!0;return!1}function c(){a.set(f,e),d()}function d(){a.get(f).then(function(a){e=a||[]})}var e=[],f="shopping-list";return d(),{getShoppingList:function(){return e},getShoppingListCount:function(){return e.length},getAList:function(a){return e[a]},addShoppingList:function(a,f){f||(f=!1),a.list.title&&!b(a.list.title)&&(d(),a.list.default=f,e||(e=[]),e.push(a),c())}}}]),angular.module("groceryListApp").controller("AddNewListCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("groceryListApp").controller("AddShoppingItemsCtrl",["$scope","ShoppingListService","$state",function(a,b,c){var d={},e={};d.itemsEnabled=!1,d.list={title:null,added:null},d.itemTitle=null,d.quantity=null,d.items=[],d.measure="lb",d.createList=function(){d.list.title&&(d.list.added=new Date,d.itemsEnabled=!0,e.list={title:d.list.title,added:d.list.added})},d.addItems=function(){d.itemTitle&&d.quantity&&d.measure&&(d.items.push({item:angular.copy(d.itemTitle),quantity:angular.copy(d.quantity),measure:angular.copy(d.measure)}),d.itemTitle=null,d.quantity=null,d.measure="lb")},d.saveList=function(){e.list.items=d.items,b.addShoppingList(e),c.go("main.list")},a.shopping=d}]),angular.module("groceryListApp").controller("HeaderCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("groceryListApp").controller("RegisterOnlineCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);