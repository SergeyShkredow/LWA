var app = angular.module('lwa-app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('flow', {
            url: '/flow',
            templateUrl: 'app/src/page-blocks/layouts/l-flow/l-flow.html'
        })
        .state('home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'app/src/page-blocks/layouts/l-flow/l-flow.html'
                },
                'menu@home': {
                    templateUrl: 'app/src/page-blocks/layouts/l-menu/l-menu.html',
                    controller: 'l-flow.menu'
                },
                'content@home': {
                    templateUrl: 'app/src/page-blocks/layouts/l-home/l-home.html',
                    controller: 'l-flow.home as ctrl'
                }
            },
        })
        .state('taskBoard', {
            url: '/task-board',
            views: {
                '': { templateUrl: 'app/src/page-blocks/layouts/l-flow/l-flow.html' },
                'menu@taskBoard': {
                    templateUrl: 'app/src/page-blocks/layouts/l-menu/l-menu.html',
                    controller: 'l-flow.menu'
                },
                'content@taskBoard': {
                    templateUrl: 'app/src/page-blocks/layouts/l-task-board/l-task-board.html',
                    controller: 'l-flow.taskBoard as ctrl'
                }
            }
        })
});
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
app.service('$alert', function ($injector, $rootScope, $timeout) {
    var self = this;

    this._popupScope = {};
    this.messages = [];
    this.type = {};

    this._init = function () {
        self._popupScope = $rootScope.$new();
        self._popupScope.model = { messages: [] };
        self.messages = [];
    };

    this.addMessage = function (message, type) {
        message.type = type || self.type.SUCCESS;
        self.messages.push(message);
    };

    this.showMessage = function (message, type, hideTimeout) {
        type = type || self.type.SUCCESS;
        self.addMessage(message, type);
        self._initPopup();

        $timeout(function () {
            self.removeMessage(message, type);
        }, hideTimeout);

        self._show();
    };

    this.removeMessage = function (message) {
        // $array.remove(self._popupScope.model.messages, message);

        if (!self._popupScope.model.messages.length) {
            self._hide();
        }
    };

    this.removeMessages = function (messages) {
        angular.forEach(messages, self.removeMessage);
    };

    this.removeAllMessages = function () {
        self.messages = [];
        self._hide();
    };

    this._initPopup = function () {
        if (self._isInitedPopup) {
            return;
        }

        var $compile = $injector.get('$compile'),
            body = angular.element(document.querySelector('body')),
            element = $compile('<div data-alert-popup="model"/>')(self._popupScope);

        body.append(element);

        self._isInitedPopup = true;
    };

    this._show = function () {
        self._popupScope.model.visible = true;
    };

    this._hide = function () {
        self._popupScope.model.visible = false;
    };

    this._init();
});

app.service('$data', function($http) {

    this.menu = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:5000/menu'
        });
    }

    this.getTasks = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:5000/tasks'
        });
    }
});
app.service('$flowData', function($data) {
    this.menu = function () {
        return $data
                .menu()
                .then(removeLast);
    };

    function removeLast(response) {
        response.data.list.pop();

        return response;
    }
});
app.service('$taskBoardData', function($data) {
    this.getTasks = function () {
        return $data
                .getTasks()
                .then(function(resp){
                    return resp.data;
                });
    };
});
app.controller('l-flow.block-list', function($scope) {
    $scope.flow = $scope.flow || {};
    $scope.flow.blockList = {
        title: 'Hello'
    }
});
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
app.controller('l-flow.taskBoard', function($scope, $taskBoardData) {
    var ctrl = this;

    ctrl.$onInit = _init;
    ctrl.getTasks = getTasks;
    ctrl.onCancel = onCancel;
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

    function getTasks() {
        $taskBoardData
            .getTasks()
            .then(ctrl.onGetTaskComplete)
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

    function onCancel(event, model) {
        // console.log('click', event, model);

        $scope.flow.taskBoard.model.list.splice(model.position, 1);
    }
});
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