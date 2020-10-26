function handleValChange(e, slider_name) {
    let val = e.target.value;

    if (val < 0)
        val = 0;
    if (val > 120)
        val = 120

    if (slider_name == "bottom_slider") {
        let reminader = val % 10;
        if (reminader != 0)
            val -= reminader;
    }

    if (val != e.target.value)
        e.target.value = val;

    $('#' + slider_name).val(val);
}

function handleSaveClick() {
    $.ajax({
        url: "cgi-bin/db_interaction.py",
        type: "post",
        data: JSON.stringify({
            bottom_slider: $('#bottom_slider').val(),
            top_slider: $('#top_slider').val()
        }),
        dataType: "json",
        success: function (response) {
            if (response.status == 'success') {
                alert('data updated successfully');
            }
        }
    });
}

function handleCancelClick() {
    $('#top_slider_input').val(0);
    $('#bottom_slider_input').val(0);
    $('#top_slider').val(0);
    $('#bottom_slider').val(0);

    $.ajax({
        url: "cgi-bin/db_interaction.py",
        type: "post",
        data: JSON.stringify({
            bottom_slider: 0,
            top_slider: 0
        }),
        dataType: "json",
        success: function (response) {
            if (response.status == 'success') {
                alert('data cleared successfully');
            }
        }
    });
}