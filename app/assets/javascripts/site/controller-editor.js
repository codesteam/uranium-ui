angular.module('Uranium').controller('DashboardEditorCtrl', ['$scope', '$http', '$sce', '$timeout', function($scope, $http, $sce, $timeout) {

    $scope.editor = {
        'text'   : null,
        'object' : null,
    };

    $scope.template = {
        'source'  : null,
        'message' : null,
    };

    $scope.render_query = null;

    $scope.$watch("editor.text", function() {
        $scope.update_template();
    });

    $scope.update_template = function() {
        if ($scope.render_query !== null) {
           $scope.render_query.abort();
        }
        $scope.render_query = $.ajax({
            type: 'post',
            url: '/decay',
            dataType: 'json',
            data: {template: $scope.editor.text},
            success: function(response) {
                $timeout(function () {
                    $scope.template.source = null;
                    $scope.template.message  = null;
                    if (!response.error) {
                        $scope.template.source = $sce.trustAsHtml(response.data);
                    }
                    else {
                        $scope.template.message = response.data;
                    }
               });
            },
            complete: function() {
                $scope.render_query = null;
            }
         });
    };

    $scope.show_settings = function() {
        $scope.editor.object.commands.exec("showSettingsMenu", $scope.editor.object);
    }

}]);