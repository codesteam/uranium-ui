angular.module('Uranium').directive("docEditor", ['$timeout', function ($timeout) {
    var resizeEditor = function (editor, element) {
        element.css({"min-height": Math.max($("#decay_result").height(), 1417)});
        editor.resize();
    };

    return {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            editorData: '@',
        },
        link: function (scope, element, attrs, ngModel) {
            var editor = ace.edit(element[0]);
            editor.setFontSize("16px");
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/yaml");
            editor.setShowPrintMargin(false);
            editor.setValue(scope.editorData, -1);
            editor.session.setUseWrapMode(true);
            editor.session.setWrapLimitRange(60);
            ngModel.$setViewValue(scope.editorData);

            editor.on('change', function () {
                $timeout(function () {
                    scope.$apply(function () {
                        ngModel.$setViewValue(editor.getValue());
                    });
                });

                resizeEditor(editor, element);
            });
        }
    };
}]);

angular.module('Uranium').directive("editorDocExample", function () {
    return {
        restrict: 'A',
        scope: {
            editorLanguage : '@',
            editorData     : '@',
        },
        link: function (scope, element) {
            language = scope.editorLanguage || 'text';
            editor = ace.edit(element[0]);
            editor.setFontSize("16px");
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/" + language);
            editor.setShowPrintMargin(false);
            editor.setReadOnly(true);
            editor.setValue(scope.editorData, -1);
            editor.setOptions({maxLines: Infinity});
            editor.resize();
        }
    };
});