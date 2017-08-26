function getData(code) {
    $('#loading').removeClass('hide');
    var values = [code.name];
    var xvalues = [code.name + 'x']
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + code.name +
        '&apikey=<your key here>';
    $.getJSON(url, function (data) {
        var d = data['Time Series (Daily)'];
        $.each(d, function (i, e) {
            values.push(d[i]['4. close']);
            xvalues.push(i);
        });
        xvalues[1] = xvalues[1].split(' ')[0];
        var xs = {};
        var colors = {};
        xs[code.name] = code.name + 'x';
        colors[code.name] = code.color;
        chart.load({
            xs: xs,
            columns: [
                xvalues,
                values
            ],
            colors: colors
        });
        $('#loading').addClass('hide');
    });
}