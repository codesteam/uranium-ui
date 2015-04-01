// $(document).on('click', '#decay', function() {
//  $.ajax({
//      type: 'post',
//      url: '/decay',
//      dataType: 'json',
//      data: {template: ace.edit("editor").getSession().getValue()},
//      success: function(response) {
//          $("#decay_result").html(response.data);
//          $('#editor').css({"min-height": Math.max($("#decay_result").height(), 600)});
//          ace.edit("editor").resize();
//      }
//  });
// });


angular.module('Uranium').controller('DashboardEditorCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

    $scope.editor   = null;
    $scope.template = null;

    $scope.$watch("editor", function() {
        $scope.update_template();
    });

    $scope.update_template = function()
    {
        // $http.post('/decay', {template: $scope.editor}).success(function(response) {
        //     $scope.template = response.data;
        // });
        $.ajax({
             type: 'post',
             url: '/decay',
             dataType: 'json',
             data: {template: $scope.editor},
             success: function(response) {
                text = $sce.trustAsHtml(response.data);
                $scope.template = text;
             }
         });
    }

}]);