var pref = localStorage.getItem('color');
if (pref == null) {
    localStorage.setItem('color', 'dark');
    pref = 'dark';
}

setColor();

d3.select('img').on('mouseover', function () {
    if (pref == 'dark') {
        d3.select('img').attr('src', 'images/gv3-250.png');
    }
    else if (pref == 'light') {
        d3.select('img').attr('src', 'images/gv3-250-dark.png');
    }
});

d3.select('img').on('mouseout', function () {
    if (pref == 'dark') {
        d3.select('img').attr('src', 'images/gv3-250-dark.png');
    }
    else if (pref == 'light') {
        d3.select('img').attr('src', 'images/gv3-250.png');
    }
});

d3.select('img').on('click', function () {
    if (pref == 'dark') {
        localStorage.setItem('color', 'light');
    }
    else if (pref == 'light') {
        localStorage.setItem('color', 'dark');
    }
    setColor();
});

function setColor() {
    pref = localStorage.getItem('color');
    if (pref == null) {
        localStorage.setItem('color', 'dark');
        pref = 'dark';
    }
    var defaultColor = '';
    var hoverColor = '';
    var clickColor = '';
    if (pref == 'light') {
        defaultColor = '#666666';
        hoverColor = '#333333';
        clickColor = '#000000';
        d3.select('img').attr('src', 'images/gv3-250.png');
        d3.select('body').style('background-color', '#FFFFFF');
    }
    else if (pref == null || pref == 'dark') {
        defaultColor = '#8FA1B3';
        hoverColor = '#5F6D78';
        clickColor = '#FFFFFF';
        d3.select('img').attr('src', 'images/gv3-250-dark.png');
        d3.select('body').style('background-color', '#2B303B');
    }
    
    d3.selectAll('p').each(function () {
        var a = d3.select(this).select('a');
        if (a[0][0] != null) {
            a.style('color', defaultColor);
            a.on('mouseover', function () {
                d3.select(this).style('color', hoverColor);
            });
            a.on('mouseout', function () {
                d3.select(this).style('color', defaultColor);
            });
            a.on('click', function () {
                d3.select(this).style('color', clickColor);
            });
        }
    });
}