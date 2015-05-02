angular.module('Uranium').directive 'docEditor', [ '$timeout', ($timeout) ->
  restrict: 'A'
  require: '?ngModel'
  scope:
    editorData: '@'
    text: '='
  link: (scope, element, attrs, ngModel) ->
    ace.config.set("basePath", window.location.origin + "/assets/ace/")
    editor = ace.edit(element[0])
    editor.setFontSize '16px'
    editor.setTheme 'ace/theme/monokai'
    editor.getSession().setMode 'ace/mode/yaml'
    editor.setShowPrintMargin false
    if scope.text?
      scope.text = scope.text.toString()
    editor.setValue scope.text || scope.editorData, -1
    editor.session.setUseWrapMode true
    editor.session.setWrapLimitRange 60
    ngModel.$setViewValue {text: editor.getValue(), object: editor}
    editor.on 'change', ->
      $timeout ->
        scope.$apply ->
          ngModel.$setViewValue {text: editor.getValue(), object: editor}
      element.css 'min-height': Math.max($('#decay_result').height(), 1417)
      editor.resize()
]

angular.module('Uranium').directive 'codeHighlight', ->
  restrict: 'A'
  scope:
    codeLanguage: '@'
  link: (scope, element) ->
    code   = element[0].innerHTML
    ace.config.set("basePath", window.location.origin + "/assets/ace/")
    editor = ace.edit(element[0])
    editor.setFontSize '16px'
    editor.setTheme 'ace/theme/monokai'
    editor.getSession().setMode 'ace/mode/' + (scope.codeLanguage || 'text')
    editor.setShowPrintMargin false
    editor.setReadOnly true
    editor.setValue code, -1
    editor.setOptions maxLines: Infinity
    editor.resize()
