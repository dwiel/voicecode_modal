$(function() {
    // keep focus on input default to input on scratch
    var timeout;
    var default_focus = '#phrase';
    var allowed_focus = 'input button';

    $(default_focus).focus();
    $(allowed_focus).blur(function() {
        timeout = setTimeout(function () {
          $(default_focus).focus();
        });
    });
    $(allowed_focus).focus(function() {
        clearTimeout(timeout);
    })

    // update script whenever inputs change
    $("input, textarea").on('change keydown paste input', function() {
        update_script(generate_script({
            'phrase': $('#phrase').val(),
            'description': $('#description').val(),
            'grammar_type': $('#grammar_type').val(),
            'string': $('#string').val(),
            'code': $('#code').val(),
            'context': $('#context').val(),
        }));
    });

    function update_script(script) {
        // the value of script element on page
        $('#script').html(script);
    }

    function generate_script(params) {
        // generate coffee script command given a set of params
        return Handlebars.compile($('#script_template').html())(params);
    }

    $('#complete').click(function() {
        $.post('/create_command', {
            'script': $('#script').text()
        })
    })
});
