'use strict';

const apiKey = "AIzaSyD4uHrKTK0XO3adEnHinC-dx53SNTpF8bM";

const searchURL = 'https://api.github.com/users/';

function getRepos(username) {
  const params = username;
  
  const queryString = params
  const url = searchURL + queryString + '/repos';

  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(responseJson => formatResults(responseJson))
    .catch(error => alert('Something has gone wrong. Please refresh, or try again later.'));
}

function formatResults(responseJson){
    const tempArray = [];
    for (let i=0;i<responseJson.length;i++){
        tempArray.push({name:responseJson[i].name, url:responseJson[i].svn_url})
    }
    console.log(tempArray);
    displayResults(tempArray);
}

function displayResults(tempArray) {
    if (tempArray===[]){
        $('.results').append("There were no results, either you entered a username that doesn't exist, or that user has no Repos yet.");
    } else {
        for (let i=0;i<tempArray.length;i++){
            console.log(tempArray[i])
            $('.results').append(`<li><a href="${tempArray[i].url}" target="_blank">${tempArray[i].name}</a></li>`);
        }
    }
}

function clearResults() {
    console.log("Clearing Previous Results");
    $('.results').empty();
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    clearResults();
    getRepos(username);
  });
}

$(watchForm);