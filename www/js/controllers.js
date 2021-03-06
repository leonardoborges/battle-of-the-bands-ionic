function onError() {
  alert('onError!');
};

var GRAVITY= 9.8;

function absAcceleration(x, y, z){
  return Math.sqrt(x*x + y*y + z*z) - GRAVITY;
}


var SERVER = "http://10.11.2.19:3000";
//var SERVER = "http://192.168.1.102:3000";

angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope, $rootScope, $http) {
    $rootScope.acceleration = "0";
    $rootScope.accelerationInt = "0";
    var options = { frequency: 500 };
    var watchID = navigator.accelerometer.watchAcceleration(function(acceleration){
      var absAccel = absAcceleration(acceleration.x, acceleration.y, acceleration.z);
      $rootScope.accelerationInt = Math.abs(parseInt(absAccel));
      $rootScope.acceleration = Math.abs(parseInt(absAccel));
      $rootScope.$apply();
      console.log( "AbsAccel: ->( " + $scope.acceleration +" )<-");
      $http.post(SERVER + '/accelerations', JSON.stringify({
        accel: $rootScope.acceleration,
        uuid: device.uuid
      }))
        .success(function(){
        console.log( 'posted' );
      })
        .error(function(err){
          console.log( "error posting..." );
        });
    }, onError, options);
  })

  .controller('FriendsCtrl', function($scope, Friends) {
    $scope.friends = Friends.all();
  })

  .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
  })

  .controller('AccountCtrl', function($scope) {
  });
