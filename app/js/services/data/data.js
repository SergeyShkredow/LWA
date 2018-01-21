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