app.directive('alertPopup', function ($) {
    return {
        restrict: 'A',
        scope: {
            model: '=alertPopup'
        },
        replace: true,
        templateUrl: 'app/js/directives/alert-popup/alert-popup.html',
        controller: function ($scope) {
            $scope.removeMessage = function () {
                $scope.model.messages = [];
                $scope.model.visible = false;
            };

            this.updateMessages = function (value) {
                $scope.model.visible = Boolean(value);
            };

            $scope.$watch('model.messages.length', this.updateMessages);
        }
    };
});
