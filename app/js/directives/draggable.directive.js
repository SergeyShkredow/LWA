app.directive("dragndrop", function () {
    return {
        restrict: "A",
        scope: {
            model: '=?dragndrop'
        },
        link: function ($scope, $element, attrs) {
            var ctrl = this;

            ctrl.init = _onInit;
            ctrl.onDragStart = onDragStart;
            ctrl.onDrag = onDrag;
            ctrl.onDragEnd = onDragEnd;
            ctrl.onDrop = onDrop;

            var isDragged;
            
           
            function _onInit() {
                isDragged = false;
                $scope.model = $scope.model || {};
                // console.log($scope.model);
                if ($scope.model.type == 'dropzone') {
                    $element.on('dragover drop', ctrl.onDrop);

                    return;
                }

                $element.on('dragstart', ctrl.onDragStart);
                $element.on('drag', ctrl.onDrag);
                $element.on('dragend', ctrl.onDragEnd);
                $element[0].draggable = $element[0].draggable || true;
            }

            function onDragStart(event) {
                if (isDragged) {
                    return;
                }

                isDragged = true;
                $scope.model.state.dragId = $scope.model.id;
                // console.log('dragstart', event, $scope.model);
                $scope.$apply();
            }

            function onDrag(event) {
                // console.log('drag', event);
            }

            function onDragEnd(event) {
                isDragged = false;
                // console.log('dragend', event);
            }

            function onDrop(event) {
                event.preventDefault();
                if (event.type != 'drop') {
                    return;
                }

                isDragged = false;
                console.log('drop', $scope.model);

                $scope.model.state.dropId = $scope.model.id;


                $scope.model.dropHandler();
                $scope.$apply();
            }


            ctrl.init();
        }
    }
});