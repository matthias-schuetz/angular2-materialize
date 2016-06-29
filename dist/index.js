System.register(["materialize", "./materialize-directive"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function toast() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        Materialize.toast.apply(Materialize, args);
    }
    exports_1("toast", toast);
    return {
        setters:[
            function (_1) {},
            function (materialize_directive_1_1) {
                exports_1({
                    "MaterializeDirective": materialize_directive_1_1["MaterializeDirective"]
                });
            }],
        execute: function() {
            Waves.displayEffect();
        }
    }
});
