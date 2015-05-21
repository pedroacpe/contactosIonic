angular.module('starter.services', [])

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
                                // instance.sendText2 = function(envioMensaje, onSuccess, onError){
                                //     doPost("/push",envioMensaje,
                                //       function(data){
                                //         onSuccess(data);
                                //       }, 
                                //       function(error){
                                //         onError(error);
                                //       }
                                //     );
                                // };

        //probando modificar datos

        // Tienes un nuevo método en el api para actualizar datos de contacto:
        // URL: http://[host]/bs-contactos/api/contacts/{id}
        // donde {id} es el id de contacto obtenido al hacer login.
        // Los datos a enviar por POST son:
        // {"avatar":"url","email":"2","extension":"3","phone":"4","password":"1234"}

        instance.ModifiUser = function(id, datosModificados){
            var url = "/contacts/".concat(id); 
            console.log(id);
            console.log(url);
            var DeferValue = $q.defer();
            doPost(url, datosModificados, DeferValue.resolve, DeferValue.reject);
            return DeferValue.promise;
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
