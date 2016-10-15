$(function() {
    // set window to reasonable default size
    window.resizeTo(530, 600);

    // keep focus on input default to input on scratch
    var timeout;
    var default_focus = '#package';
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

    function update_script() {
        set_script(generate_script({
            'implement': $('#implement').val(),
            'spoken': $('#spoken').val(),
            'description': $('#description').val(),
            'enabled': $('#enabled').val(),
            'string': $('#string').val(),
            'code': $('#code').val(),
        }));
    }

    function set_script(script) {
        // the value of script element on page
        $('#script').html(script);
    }

    function generate_script(params) {
        // generate coffee script command given a set of params
        return Handlebars.compile($('#script_template').html())(params);
    }

    // update script whenever inputs change
    $("input, textarea").on('change keydown paste input', update_script);
    $().ready(update_script);

    $('#complete').click(function() {
        $.post('/create_command', {
            'script': $('#script').text(),
            'package': $('#package').val(),
        })
    });

    $(document).keyup(function(e) {
        // escape key maps to keycode `27`
        if (e.keyCode == 27) {
            window.close();
        }
    });
});
