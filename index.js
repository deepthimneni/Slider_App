function windowOnload() {

    var slider_options = [];
    // var bottom_slider_options = [];
    for (let i = 0; i <= 120; i++) {
        
        if (i % 10 == 0) {
            // bottom_slider_options.push('<option value="'+ i +'">'+ i +'</option>');
            slider_options.push('<option value="'+ i +'">'+ i +'</option>');
        }
    }

    $('#top_slider_datalist').html(slider_options.join(''));
    $('#bottom_slider_datalist').html(slider_options.join(''));

}

function handleValChange(e, slider_name) {
    let val = e.target.value;

    if (val < 0)
        val = 0;
    if (val > 120)
        val = 120

    if (slider_name == "bottom_slider") {
        let reminder = val % 10;
        if (reminder != 0)
            val -= reminder;
    }

    if (val != e.target.value)
        e.target.value = val;

    $('#' + slider_name).val(val);
}

function handleSliderChange(e) {
    $(`#${e.target.id}_input`).val(e.target.value);
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