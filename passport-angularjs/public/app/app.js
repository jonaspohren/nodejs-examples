var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.factory('httpInterceptor', ['$location', '$q', function($location, $q) {
    return {
        request: function(config) {
            return config;
        },
        requestError: function(rejection) {
            
        },
        response: function(response) {
            return response;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $location.url('/login');
            }

            return $q.reject(rejection);
        }
    };
}]);

app.service('AuthService', ['$http', function($http) {
    return {
        login: function(username, password) {
            return $http.post('/login', {username: username, password: password});
        },
        logout: function() {
            return $http.get('/logout');
        }
    };
}]);

app.service('UserService', ['$http', function($http) {
    return {
        getProfile: function() {
            return $http.get('/profile');
        }
    };
}]);

app.controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.login = function() {
        AuthService.login($scope.username, $scope.password).then(
            function success(response) {
                var data = response.data;

                if (data.errorMessage) {
                    return $scope.errorMessage = data.errorMessage;
                }

                $location.url('/');
            },
            function error() {

            }
        );
    };
}]);

app.controller('HomeController', ['$scope', '$location', 'AuthService', 'UserService', function($scope, $location, AuthService, UserService){
    $scope.logout = function() {
        AuthService.logout().then(
            function success() {
                $location.url('/login');
            },
            function error() {

            }
        );
    };

    $scope.init = function() {
        UserService.getProfile().then(
            function success(response) {
                $scope.profile = response.data;
            },
            function error() {

            }
        );
    };

    $scope.init();
}]);