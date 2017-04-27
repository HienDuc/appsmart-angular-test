'use strict';
app.factory('Profile',['$q', function ($q) {
    var self = this;
    self.Profile = {};

    self.getCurrentProfile = function (uid) {
        var qLoad = $q.defer();
        if (!self.Profile) {
            var ref = firebase.database().ref();
            ref.child('users').child(uid).on("value", function (snapshot) {
                qLoad.resolve(snapshot.val());
                self.Profile = snapshot.val();
            }, function (errorObject) {
                qLoad.reject(errorObject);
            });
        }
        else {
            qLoad.resolve(self.Profile);
        }
        
        return qLoad.promise;
    };

    self.get = function (uid) {
        var qLoad = $q.defer();
        var ref = firebase.database().ref();
        ref.child('users').child(uid).on("value", function (snapshot) {
            qLoad.resolve(snapshot.val());
        }, function (errorObject) {
            qLoad.reject(errorObject);
        });
        return qLoad.promise;
    };

    return self;
}]);
