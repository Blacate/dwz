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
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        var clipboard = new Clipboard('button.confirm', {
                            text: function() {
                                return finalUrl;
                            }
                        });
                        clipboard.on('success', function(e) {
                            swal({
                                    title: "Copied!",
                                    text: "The url has been copied.",
                                    type: "success",
                                    closeOnConfirm: false
                                },
                                function() {
                                    location.reload();
                                });
                        });
                        clipboard.on('error', function(e) {
                            swal({
                                    title: "Failed!",
                                    text: "The url can't be copied.",
                                    type: "error",
                                    closeOnConfirm: false
                                },
                                function() {
                                    location.reload();
                                });
                        });
                    } else {
                        location.reload();
                    }


                });
        }).error(function(data, status, headers, cfg) {
            swal("Failed!", "Please try again!", "error");
        })
    };
});