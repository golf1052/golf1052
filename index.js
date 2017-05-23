var pref = localStorage.getItem('color');
if (pref == null) {
    localStorage.setItem('color', 'light');
    pref = 'light';
}

setColor();

d3.select('img').on('mouseover', function () {
    if (pref == 'dark') {
        d3.select('img').attr('src', 'images/gv3-500.png');
    }
    else if (pref == 'light') {
        d3.select('img').attr('src', 'images/gv3-500-dark.png');
    }
});

d3.select('img').on('mouseout', function () {
    if (pref == 'dark') {
        d3.select('img').attr('src', 'images/gv3-500-dark.png');
    }
    else if (pref == 'light') {
        d3.select('img').attr('src', 'images/gv3-500.png');
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
        localStorage.setItem('color', 'light');
        pref = 'light';
    }
    var defaultColor = '';
    var hoverColor = '';
    var clickColor = '';
    if (pref == null || pref == 'light') {
        defaultColor = '#8FA1B3';
        hoverColor = '#65737E';
        clickColor = '#4F5B66';
        d3.select('img').attr('src', 'images/gv3-500.png');
        d3.select('body').style('background-color', '#FFFFFF');
    }
    else if (pref == 'dark') {
        defaultColor = '#8FA1B3';
        hoverColor = '#65737E';
        clickColor = '#C0C5CE';
        d3.select('img').attr('src', 'images/gv3-500-dark.png');
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