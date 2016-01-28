/**
 * Created by Shahzib on 1/14/2016.
 */
var app = angular.module('myApp');

app.controller('myCtrl',['$mdBottomSheet','$mdSidenav','$mdDialog','$timeout','$firebaseArray','firebaseRef',dashboardCtrl]);
//var ref = new Firebase('https://materialtodoapp.firebaseio.com/');

function dashboardCtrl ($mdBottomSheet,$mdSidenav,$mdDialog,$timeout,$firebaseArray,firebaseRef) {
    var self = this;
    var ref = new Firebase(firebaseRef);
    var uid = localStorage.getItem('uid');
    ref = ref.child(uid);
    console.log(ref);

    self.tasks = $firebaseArray(ref);

    self.completedTask = 0;
    self.getTotalTodos = function(){
      return self.tasks.length
    };
    self.newTask = "";
    self.settings = [
        {
            icon: "dashboard",
            title: "Dashboard",
            link: "dashboard"
        },
        {
            icon: "logout",
            title: "Logout",
            link:"login"
        }

    ];
    self.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle()

    };


    self.showDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            controllerAs: "app",
            template: "<md-dialog><md-content class='md-padding'><md-input-container><label>Add Your Todo</label><input type='text' ng-model='app.newTask' layout-align='center center'></md-input-container></md-content></md-content><md-dialog-actions layout='row'><md-button ng-click='app.addTodo()' class='md-primary'>Add it !</md-button></md-dialog-actions></md-dialog>",
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function(answer){
            if(answer) {
                self.tasks.$add({task: answer, done: false});
                    console.log(self.tasks)



            }
        })


    };
    function DialogController($mdDialog){
        this.newTask;
        this.addTodo = function(){
            $mdDialog.hide(this.newTask);
        }
    }
    self.delete = function($index){
        self.tasks.splice($index,1)
    };
    self.complete = function(item){
        item.done = !item.done;
        --self.completedTask;
    };

    self.incomplete = function(item){
        item.done = !item.done;
        ++self.completedTask;
    }
    }
