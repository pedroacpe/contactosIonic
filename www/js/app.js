// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.constant('config',{
  endPoint: 'https://app.bahiasoftware.es/bs-contactos/api'
})

//http://bahia11s/bs-contactos/api


.run(function($ionicPlatform, $cordovaPush, $rootScope, dataService, $cordovaDevice) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


var androidConfig = {
    "senderID": "613234847493",
  };


//con el rootscope no lo ejecuta al iniciar
$rootScope.ejecutarRegistroUsuario = function(){

//alert('pasa por ejecutarRegistroUsuario');

$cordovaPush.register(androidConfig).then(function(result) {
      
        console.log("Register Success " + result);
      // Success
    }, function(err) {
      // Error
       console.log("Register error " + err)
    })

}



$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            //alert('registration ID = ' + notification.regid);

          //"platform":"android", "token":"1234", "username":"antoni"
          var datosToken = {};

          datosToken.platform = $cordovaDevice.getPlatform();
          datosToken.token = notification.regid;
          datosToken.username = $rootScope.username;

          //alert(JSON.stringify(datosToken));

          dataService.RegisterUser(datosToken).then(
            function(data){
                  alert('exito')
            },
            function(error) {

                  alert('fail')
             })
          }

          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });

  });
})










.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })



  .state('listaContactos', {
      url: '/listaContactos',
      templateUrl: 'templates/listaContactos.html',
      controller: 'ListaContactosCtrl'
  })

  .state('contactoDetalle', {
      url: '/contactoDetalle',
      templateUrl: 'templates/contactoDetalle.html',
      controller: 'ContactoDetalleCtrl'
  });



  //ruta predeterminada
  $urlRouterProvider.otherwise('/login');

})
























;

