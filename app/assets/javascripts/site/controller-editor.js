angular.module('Uranium').controller('DashboardEditorCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

    $scope.editor = {
        'text'   : localStorage.getItem("code"),
        'object' : null,
    };

    $scope.template = {
        'source'       : null,
        'message'      : null,
        'stack_init'   : false,
        'default_time' : 1000
    };

    $scope.init_request_stack = function(time, singlenton) {
        if ($scope.template.stack_init) {
            return;
        }
        $scope.stack = _.debounce(function() {
            $scope.$apply(function() { $scope.update_template(); });
        }, time);
        $scope.template.stack_init = singlenton || false;
    };

    $scope.$watch("editor.text", function() {
        localStorage.setItem("code", $scope.editor.text)
        $scope.stack();
    });

    $scope.update_template = function() {
        $http({
            method : 'POST',
            url    : 'decay.json',
            data   : {template: $scope.editor.text},
        }).success(function(response) {
            $scope.template.source  = null;
            $scope.template.message = null;
            if (!response.error) {
                $scope.template.source = $sce.trustAsHtml(response.data);
            }
            else {
                $scope.template.message = response.data;
            }
        });
        $scope.init_request_stack($scope.template.default_time, true);
    };

    $scope.show_settings = function() {
        $scope.editor.object.commands.exec("showSettingsMenu", $scope.editor.object);
    }

    $scope.reset_code = function() {
        localStorage.removeItem("code");
        window.location.reload();
    }

    $scope.init_request_stack(1);

}]);