angular.module('starter.controllers', [])

                              // .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
                              //     $scope.data = {};

                              //     $scope.login = function() {
                              //         LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
                              //             $state.go('listaContactos');
                              //         }).error(function(data) {
                              //             var alertPopup = $ionicPopup.alert({
                              //                 title: 'Login failed!',
                              //                 template: 'Please check your credentials!'
                              //             });
                              //         });
                              //     }
                              // })

  .controller('LoginCtrl', function($scope,  $ionicPopup, $state, dataService, $http, $rootScope) {
    $scope.data = {};

    $scope.login = function(){
      dataService.LoginUsers($scope.data).then(function(data){
      //alert('pasa por LoginUsers');

      $rootScope.username = data.username;
      $rootScope.ejecutarRegistroUsuario();
      //alert('pasa los rootScope');

      $scope.items = data;
          
      console.log(data.username);
      console.log($scope.data.username);
         
      if( data.username == $scope.data.username){
        $state.go('listaContactos');
      } else {
        alert('Usuario incorrecto')
             }
      }, function(error){
        console.log('Failure...', error);
      })}
  })



  .controller('ListaContactosCtrl', function($scope, $http, $state, $superCache, dataService) {
    $scope.items = [];

                         //  $http({
                         //  url: 'http://bahia11s/bs-contactos/api/users?callback=JSON_CALLBACK',
                         //  //url: 'http://bahia11s:8090/bs-contactos/contactos.php?callback=JSON_CALLBACK',
                         //  dataType: 'json',
                         //  method: 'POST',
                         // // data: '',
                         //  headers: {
                         //      "Content-Type": "application/json;charset=UTF-8"
                         //  }

                         //  }).success(function(data){
                         //  $scope.items = data;
                         //  console.log($scope.items);

                         //  }).error(function(error){
                         //  $scope.error = error;
                         //  });

    dataService.getUsers().then(function(data) {
      $scope.items = data;
      console.log('Success!', data);
    }, function(error) {
      console.log('Failure...', error);
    });

    $scope.onClick = function (idUser) {

    console.log(idUser);
    var cacheUsuario;

    for (index in $scope.items){
      //console.log($scope.items[index])
      if (idUser==$scope.items[index].id){
        $superCache.put('persona',$scope.items[index] )
      }
    };
    $state.go('contactoDetalle');
    };
  })




  .controller('ContactoDetalleCtrl', function($scope, $http, $superCache, $state, dataService) {
    console.log('contactoDetalleCtrl')
    $scope.persona = $superCache.get('persona');
    console.log($scope.persona);

    //probando enviar mensaje
      $scope.enviarComentario = function(comentario, username){

      var mensaje = {};
      mensaje.username = username;
      mensaje.message = comentario;

      //alert(JSON.stringify(mensaje));
      //console.log(comentario, username);

                        //otro método //para sendText2
                        //     dataService.sendText2(mensaje,
                        //             function(data){
                        //               alert("exito");
                        //               $state.go('listaContactos');
                        //             },
                        //             function(error){
                        //               alert("error");
                                     
                        //             }
                        //           )};
        dataService.SendText(mensaje).then(function(data){
          alert('exito')
          $state.go('listaContactos');
        }, function(error) {
          alert(JSON.stringify(error))
          console.log('Failure...', error);
        })};

    //probando enviar mensaje



  })


//buscador con filtro sobre la lista
  .directive('ionSearch', function() {
    return {
            restrict: 'E',
            replace: true,
            scope: {
                    getData: '&source',
                    model: '=?',
                    search: '=?filter'
                  },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                      '</div>'
          };
  });