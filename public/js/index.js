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
        $http({
            method: 'POST',
            url: '/api/add',
            data: JSON.stringify($rootScope.shortenurl)
        }).success(function(data, status, headers, cfg) {
            var finalUrl = this.location.href + $rootScope.shortenurl.tinyurl;
            swal({
                    title: "TinyUrl",
                    text: finalUrl,
                    type: "success",
                    showCancelButton: true,
                    cancelButtonText: "OK",
                    confirmButtonColor: "#698693",
                    confirmButtonText: "COPY",
                    closeOnConfirm: false
                },
                function() {
                    var clipboard = new Clipboard('button.confirm', {
                        text: function() {
                            return finalUrl;
                        }
                    });
                    clipboard.on('success', function(e) {
                        swal("Copied!", "The url has been copied.", "success");
                    });
                    clipboard.on('error', function(e) {
                        swal("Failed!", "The url can't be copied.", "error");
                    })

                });
        }).error(function(data, status, headers, cfg) {
            console.log("fail");
        })
    };
});