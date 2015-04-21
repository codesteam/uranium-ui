angular.module 'Uranium', []

$(document).on 'ready page:load', ->
  angular.bootstrap document.body, [ 'Uranium' ]
  return