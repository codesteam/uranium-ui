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

$(document).on('click', '#decay', function() {
	$.ajax({
		type: 'post',
		url: '/decay',
		dataType: 'json',
		data: {template: ace.edit("editor").getSession().getValue()},
		success: function(response) {
			$("#decay_result").html(response.data);
			$('#editor').css({"min-height": Math.max($("#decay_result").height(), 600)});
			ace.edit("editor").resize();
		}
	});
});