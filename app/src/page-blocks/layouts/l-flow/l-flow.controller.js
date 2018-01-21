app.controller('l-flow', function($scope, $state) {
    $scope.flow = {
        name: "flow",
        taskManager: {
           boards: [
                {
                    id: 1,
                    tasks: [
                        {
                            id: 1,
                            title: 'Task 1'
                        },
                        {
                            id: 2,
                            title: 'Task 2'
                        }
                    ]
                },
                {
                    id: 2,
                    tasks: []
                },
                {
                    id: 27,
                    tasks: []
                },
               {
                   id: 28,
                   tasks: []
               }
            ],
            state: {
                dragId: null,
                dropId: null
            }
        }
    };

    $scope.dropHandler = function() {
        var itemId = $scope.flow.taskManager.state.dragId,
            zoneId = $scope.flow.taskManager.state.dropId,
            temp;

        angular.forEach($scope.flow.taskManager.boards, function(board){
            angular.forEach(board.tasks, function(task, pos){
                if (itemId === task.id) {
                    temp = board.tasks.splice(pos, 1);
                }
            });
        });

        angular.forEach($scope.flow.taskManager.boards, function(board){
            if (zoneId === board.id){
                board.tasks.push(temp[0]);
            }
        });

        $scope.$apply();
    };
    $scope.$watch('flow.taskManager.boards', ctrl._onModelChanged, true);
});