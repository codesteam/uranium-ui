angular.module('Uranium').directive("docEditor", ['$timeout', function ($timeout) {
    var resizeEditor = function (editor, element) {
        element.css({"min-height": Math.max($("#decay_result").height(), 600)});
        editor.resize();
    };

    return {
        restrict: 'A',
        scope: {
            editorData: '@',
        },
        link: function (scope, element, attrs) {
            var editor = ace.edit(element[0]);
            editor.setFontSize("16px");
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/yaml");
            editor.setShowPrintMargin(false);
            editor.setValue(scope.editorData, -1);

            // // data binding to ngModel
            // ngModel.$render = function () {
            //     editor.setValue(ngModel.$viewValue);
            //     resizeEditor(editor, elem);
            // };

            // editor.on('change', function () {
            //     $timeout(function () {
            //         scope.$apply(function () {
            //             var value = editor.getValue();
            //             ngModel.$setViewValue(value);
            //         });
            //     });

            //     resizeEditor(editor, elem);
            // });
        }
    };
}]);