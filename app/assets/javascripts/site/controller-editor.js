angular.module('Uranium').controller('DashboardEditorCtrl', ['$scope', '$http', '$sce', '$timeout', function($scope, $http, $sce, $timeout) {

    $scope.editor   = {
        'text'     : null,
        'template' : null,
        'message'  : null,
    };

    $scope.$watch("editor.text", function() {
        $scope.update_template();
    });

    $scope.update_template = function()
    {
        $.ajax({
             type: 'post',
             url: '/decay',
             dataType: 'json',
             data: {template: $scope.editor.text},
             success: function(response) {
                $timeout(function () {
                    if (!response.error) {
                        $scope.editor.template = $sce.trustAsHtml(response.data);
                    }
                    else {
                        $scope.editor.template = null;
                        $scope.editor.message = response.data;
                    }
                });
             }
         });
    };

}]);