initEditor = function() {
    var editor = ace.edit("editor");
    editor = ace.edit("editor");
    editor.setFontSize("16px");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/yaml");
    editor.setPrintMarginColumn(1000);
};

$(document).on('page:load', initEditor);
$(document).ready(initEditor);