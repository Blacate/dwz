var app = angular.module('dwz', []);

app.controller('FooterController', function($scope) {
    $scope.today = new Date();
});

app.directive('ensureUnique', ['$http', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                $http({
                    method: 'POST',
                    url: '/api/check',
                    data: { 'tinyurl': ele.val() }
                }).success(function(data, status, headers, cfg) {
                    c.$setValidity('unique', data.unique);
                }).error(function(data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                });
            });
        }
    };
}]);

app.run(function($rootScope, $http) {
    $rootScope.shortenurlForm = function() {
        // console.log(JSON.stringify($rootScope.shortenurl));
        $http({
            method: 'POST',
            url: '/api/add',
            data: JSON.stringify($rootScope.shortenurl)
        }).success(function(data, status, headers, cfg) {
            console.log("success");
        }).error(function(data, status, headers, cfg) {
            console.log("fail");
        })
    };
});