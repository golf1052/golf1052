let baseUrl = 'https://services.golf1052.com/api/'
let pageTheme = 'light';

let oceanTheme = {
  "base00": "#2b303b",
  "base01": "#343d46",
  "base02": "#4f5b66",
  "base03": "#65737e",
  "base04": "#a7adba",
  "base05": "#c0c5ce",
  "base06": "#dfe1e8",
  "base07": "#eff1f5",
  "base08": "#bf616a",
  "base09": "#d08770",
  "base0A": "#ebcb8b",
  "base0B": "#a3be8c",
  "base0C": "#96b5b4",
  "base0D": "#8fa1b3",
  "base0E": "#b48ead",
  "base0F": "#ab7967"
};

function themePage(theme) {
  pageTheme = theme.theme;
  d3.select('body')
    .attr('style', function() {
      if (pageTheme == 'dark') {
        return `background-color: ${oceanTheme.base00}`;
      }
    })
  d3.json(`${baseUrl}projects`, loadProjects);
}

function themeWithCoords(coords) {
  d3.json(`${baseUrl}theme?latitude=${coords.coords.latitude}&longitude=${coords.coords.longitude}`, themePage);
}

function themeWithIp() {
  d3.json(`${baseUrl}theme`, themePage);
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(themeWithCoords, themeWithIp, {
    enableHighAccuracy: false
  });
}
else {
  themeWithIp();
}

function loadProjects(projects) {
  d3.select('.progress').remove();
  let decks = d3.select('.projects');
  let currentDeck = null;
  for (let i = 0; i < projects.length; i += 3) {
    currentDeck = decks.append('div')
    .attr('class', 'card-deck');
    let currentProjects = [];
    if (i <= projects.length - 1) {
      currentProjects.push(projects[i]);
    }
    if (i <= projects.length - 2) {
      currentProjects.push(projects[i + 1]);
    }
    if (i <= projects.length - 3) {
      currentProjects.push(projects[i + 2]);
    }
    let card = currentDeck.selectAll('div')
      .data(currentProjects)
      .enter()
      .append('div')
      .attr('class', 'card')
      .attr('style', function() {
        if (pageTheme == 'dark') {
          return `border-color: ${oceanTheme.base02}`;
        }
      })
    let cardBody = card.append('div')
      .attr('class', 'card-body')
      .attr('style', function() {
        if (pageTheme == 'dark') {
          return `background-color: ${oceanTheme.base00}`;
        }
      });
    cardBody.append('h4')
      .attr('class', 'card-title')
      .append('a')
        .attr('target', '_blank')
        .attr('href', function(d) {
          return d.github_link;
        })
        .text(function(d) {
          return d.name;
        });
    cardBody.append('h6')
      .attr('class', 'card-subtitle')
      .attr('style', function() {
        let color = 'color: ';
        if (pageTheme == 'light') {
          color += oceanTheme.base03;
        }
        else {
          color += oceanTheme.base04;
        }
        return color;
      })
      .text(function(d) {
        return d.affiliation;
      });
    let cardText = cardBody.append('p')
      .attr('class', 'card-text')
      .attr('style', function() {
        let color = 'color: ';
        if (pageTheme == 'light') {
          color += oceanTheme.base02;
        }
        else {
          color += oceanTheme.base05;
        }
        return color;
      })
      .html(function(d) {
        let finalText = `${d.dates}<br/>`;
        if (d.project_link == '') {
          finalText += 'none<br/>';
        }
        else {
          finalText += `<a target="_blank" href="${d.project_link}">${d.project_link}</a><br/>`;
        }
        if (d.description == '') {
          finalText += 'none';
        }
        else {
          finalText += d.description;
        }
        return finalText;
      });
    let cardFooter = card.append('div')
      .attr('class', 'card-footer')
      .attr('style', function() {
        if (pageTheme == 'dark') {
          return `background-color: ${oceanTheme.base01}`;
        }
      })
      .selectAll('div')
      .data(function(d) {
        return d.languages;
      });
    let languageBlock = cardFooter.enter()
      .append('div')
      .attr('class', 'language-block');
    languageBlock.append('div')
      .attr('class', 'language-color')
      .style('background-color', function(d) {
        if (languageColors[d]) {
          if (languageColors[d].color) {
            return languageColors[d].color;
          }
        }
        return '#000000';
      });
    languageBlock.append('span')
      .attr('class', 'language-text')
      .attr('style', function() {
        let color = 'color: ';
        if (pageTheme == 'light') {
          color += oceanTheme.base02;
        }
        else {
          color += oceanTheme.base05;
        }
        return color;
      })
      .text(function(d) {
        return d;
      });
  }
}

