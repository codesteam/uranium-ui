angular.module('Uranium').controller('DashboardEditorCtrl', ['$scope', '$http', '$sce', '$timeout', function($scope, $http, $sce, $timeout) {

    $scope.editor   = null;
    $scope.template = null;

    $scope.$watch("editor", function() {
        $scope.update_template();
    });

    $scope.update_template = function()
    {
        $.ajax({
             type: 'post',
             url: '/decay',
             dataType: 'json',
             data: {template: $scope.editor},
             success: function(response) {
                $timeout(function () {
                    $scope.template = $sce.trustAsHtml(response.data);
                });
             }
         });
    };

}]);