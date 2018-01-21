app.controller('l-flow.menu', function($scope, $flowData) {
    var ctrl = this;

    ctrl.$onInit = _init;

    function _init() {
        $scope.flow = $scope.flow || {};
        $scope.flow.menu = {
            list: []
        };

        $flowData
                .menu()
                .then(function (response) {
                    $scope.flow.menu.list = response.data.list;
                });
    }
});