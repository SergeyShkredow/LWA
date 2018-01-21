app.controller('l-flow.home', function($scope) {
    // $scope.flow = $scope.flow || {};
    // $scope.flow.home = {};

    var ctrl = this;

    ctrl.$onInit = _init;
    ctrl.getSave = getSave;
    // ctrl.onCancel = onCancel;
    ctrl.onGetTaskComplete = onGetTaskComplete;
    ctrl._onModelChanged = _onModelChanged;

    function _init() {
        $scope.flow = $scope.flow || {};
        $scope.flow.taskBoard = {
            model: {
                list: []
            },
            initialModel: null,
            isChanged: false
        };

        $scope.$watch('flow.taskBoard.model', ctrl._onModelChanged, true);
    }

    function getSave() {
        // $taskBoardData
        //     .getTasks()
        //     .then(ctrl.onGetTaskComplete)
    }

    function onGetTaskComplete(resp) {
        $scope.flow.taskBoard.model.list = resp.data.list;
        $scope.flow.taskBoard.initialModel = angular.copy($scope.flow.taskBoard.model);
        $scope.flow.taskBoard.isChanged = false;

        // console.log($scope.flow.taskBoard.model)
    }

    function _onModelChanged(value, oldValue) {
        if (value === $scope.flow.taskBoard.initialModel){
            return;
        }

        console.log(value, oldValue);
        $scope.flow.taskBoard.isChanged = true;
    }

    // function onCancel(event, model) {
    //     // console.log('click', event, model);
    //
    //     $scope.flow.taskBoard.model.list.splice(model.position, 1);
    // }
});