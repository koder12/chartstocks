var socket = io();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var chart = c3.generate({
    data: {
        columns: []
    },
    legend: {
        show: false
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    },
    zoom: {
        enabled: true
    }
});

function submitCode() {
    var code = $('#code').val().toUpperCase();
    socket.emit('add stock', [code, getRandomColor()]);
    $('#code').val('');
    $('#loading').removeClass('hide');
}

$("#code").on('keyup', function (e) {
    if (e.keyCode == 13) {
        submitCode();
    }
});

socket.on('stop loading', function(){
    $('#loading').addClass('hide');
});

socket.on('add stock', function (code) {
    $('#stocks-list').append($('<li>' + code.name + '<span>&#x2716;</span></li>').css('border-left-color', code.color));
    getData(code);
});

socket.on('delete stock', function (name) {
    chart.load({
        unload: name
    });
    $('li:contains(' + name + ')').remove();
});

socket.on('show err', function () {
    var err_msg = $('<div class="alert warning">✘ Please add a Unique and Existing Stock code (No Duplicates!)</div>');
    $('body').append(err_msg);
    setTimeout(function () {
        $('.warning').remove();
    }, 3000);
});

$(document).on('click', 'span', function () {
    var name = $(this).parent().text().replace($(this).text(), '');
    socket.emit('delete stock', name);
});