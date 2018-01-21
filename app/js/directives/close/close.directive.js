app.directive("close", function () {
    return {
        restrict: "A",
        scope: {
            model: '=?close',
            click: '&closeClick'
        },
        replace: true,
        templateUrl: 'app/js/directives/close/close.html',
        controller: function($scope, $element) {
            var ctrl = this;

            ctrl.$onInit = _init;

            function _init() {
                $scope.close = $scope.close || {};
                $scope.close.click = $scope.click();

                $element.parent().css({
                    position: 'relative'
                });
            }
        }
    }
});