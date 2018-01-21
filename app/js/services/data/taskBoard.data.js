app.service('$taskBoardData', function($data) {
    this.getTasks = function () {
        return $data
                .getTasks()
                .then(function(resp){
                    return resp.data;
                });
    };
});