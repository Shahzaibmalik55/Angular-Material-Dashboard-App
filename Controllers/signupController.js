/**
 * Created by Shahzib on 1/26/2016.
 */
var app = angular.module("myApp");

app.controller('signupController', ['firebaseRef','$firebaseobject','$state','$timeout',signupCtrl]);

    function signupCtrl(firebaseRef,$firebaseobject,$state,$timeout){
    var self = this;
    var ref = new Firebase(firebaseRef);


    self.createuser = function(email,pass,firstname,lastname){

        self.loader = true;
        ref.createUser({
            email    : email,
            password : pass
        },function(error, userData) {

            if (error) {
                document.getElementById('error').innerHTML = error;
                $timeout(function(){
                    self.loader = false;
                },2)

            } else {
                self.msgs = $firebaseobject(ref.child(userData.uid));
                self.msgs.push({ email: email, password: pass, firstname: firstname, lastname: lastname });
                console.log(self.msgs);
                document.getElementById('error').innerHTML = null;
                console.log("Successfully created user account with uid:", userData.uid);
                $state.go('login');
            }
        });

    }
};