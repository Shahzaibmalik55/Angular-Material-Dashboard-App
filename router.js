/**
 * Created by Shahzib on 1/22/2016.
 */

var app = angular.module("myApp",['ngMaterial','ngMdIcons','ui.router','firebase']);

//var ref = new Firebase('https://materialtodoapp.firebaseio.com/');
app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $stateProvider.state("dashboard",
        {

            url:"/",
            templateUrl:'Templates/dashboard.html',
            controller: 'myCtrl',
            controllerAs: 'app'

    })
    .state("login",
        {
            url:'/login',
            templateUrl:'Templates/login.html',
            controller: 'loginController',
            controllerAs: 'app'
        })
    .state("signup",
        {
            url:"/signup",
            templateUrl:'Templates/signup.html',
            controller: 'signupController',
            controllerAs:'app'
    });
    $urlRouterProvider.otherwise("/login");

});

app.constant("firebaseRef","https://materialtodoapp.firebaseio.com/");
