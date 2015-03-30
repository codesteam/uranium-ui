initEditor = function() {
    var editor = ace.edit("editor");
    editor = ace.edit("editor");
    editor.setFontSize("16px");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/yaml");
    editor.setPrintMarginColumn(1000);
};

decay = function() {
	$.ajax({
		type: 'post',
		url: '/decay',
		dataType: 'json',
		data: {template: ace.edit("editor").getSession().getValue()},
		success: function(data) {
			
		}
	});
}

$(document).on('page:load', initEditor);
$(document).ready(initEditor);
$(document).on('click', '#decay', decay);