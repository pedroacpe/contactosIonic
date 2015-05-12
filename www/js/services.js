angular.module('starter.services', [])

//     .service('LoginService', function($q) {
//     return {
//         loginUser: function(name, pw) {
            



//             var deferred = $q.defer();
//             var promise = deferred.promise;

//             if (name == 'usuario' && pw == '1234') {
//                 deferred.resolve('Welcome ' + name + '!');
//             } else {
//                 deferred.reject('Wrong credentials.');
//             }
//             promise.success = function(fn) {
//                 promise.then(fn);
//                 return promise;
//             }
//             promise.error = function(fn) {
//                 promise.then(null, fn);
//                 return promise;
//             }
//             return promise;
//         }
//     }
// })






    .factory('$superCache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
        }])


    .factory('dataService', ['$http','config','$q', function($http, config,$q) {
        var instance = {};
        console.log(config);

    instance.getUsers = function(){
        var DeferValue = $q.defer();
        doGet("/users", DeferValue.resolve, DeferValue.reject);
        return DeferValue.promise;
    };
    
    instance.LoginUsers = function(datosUsuario){

        var DeferValue = $q.defer();
        doPost("/login", datosUsuario, DeferValue.resolve, DeferValue.reject);
        return DeferValue.promise;
    };

    instance.RegisterUser = function(idToken){

        var DeferValue = $q.defer();
        doPost("/register", idToken, DeferValue.resolve, DeferValue.reject);
        return DeferValue.promise;
    };

//probando enviar mensaje
    instance.SendText = function(envioMensaje){

        console.log("pasa por SendText");
        console.log(envioMensaje);

        var DeferValue = $q.defer();
        doPost("/push", envioMensaje, DeferValue.resolve, DeferValue.reject);
        return DeferValue.promise;
    };
//probando enviar mensaje
    instance.sendText2 = function(envioMensaje, onSuccess, onError){
        doPost("/push",envioMensaje,
          function(data){
            onSuccess(data);
          }, 
          function(error){
            onError(error);
          }
        );
    };

//Make get request
    doGet = function(url, onSuccessCallback, onErrorCallback){
        var req = {
            method: 'GET',
            url: config.endPoint + url,
            
        }

        $http(req)
        .success(function( data ){
            if( onSuccessCallback !==null ){
                onSuccessCallback( data );
            }
        })
        .error(function( data, status ){
            if( onErrorCallback!==null ){
                onErrorCallback( data, status );
            }else{
                alert('Error conectando con el servidor');
            }
        });
    };



//Make post request
    doPost = function(url, data, onSuccessCallback, onErrorCallback){
        console.log(data); //lo que pongo yo en el login
        var req = {
            method: 'POST',
            url: config.endPoint + url,
            data: data
            }

        $http(req)
        .success(function( data ){
            if( onSuccessCallback !==null ){
                onSuccessCallback( data );
            }


             //console.log(data); //el usuario que coge del servidor
        })
        .error(function( data, status ){
            if( onErrorCallback!==null ){
                onErrorCallback( data, status );
            }else{
                alert('Error conectando con el servidor');
            }
        });
    };

    return instance;


}]);
