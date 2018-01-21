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
