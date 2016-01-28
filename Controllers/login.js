/**
 * Created by Shahzib on 1/22/2016.
 */
var app = angular.module("myApp");

app.controller("loginController",['$state','$timeout','firebaseRef',loginCtrl]);

function loginCtrl ($state,$timeout,firebaseRef){
    var self = this;
    var ref = new Firebase(firebaseRef);
    self.loader = false;
    this.loginUser = function(email,pass){
        self.loader = true;
        ref.authWithPassword({
            email: email,
            password: pass
        },function(error,authData){
            if(error){
                document.getElementById('error').innerHTML = error;
                $timeout(function(){
                    self.loader = false
                },2)

            }
            else{
                document.getElementById('error').innerHTML = null;
                //localStorage.setItem('uid',authData.uid);
                console.log("Successfully created user account with uid:", authData.uid);
                localStorage.setItem('uid',authData.uid);
                $state.go('dashboard');
            }

        });

    }
}