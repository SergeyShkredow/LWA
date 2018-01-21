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