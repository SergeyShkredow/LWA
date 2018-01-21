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