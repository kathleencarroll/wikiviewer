var revision = 0;

document.getElementById('query').onkeydown = function(e){
   if(e.keyCode == 13){
     search();
   }
};

function search() {
  var query = document.getElementById('query').value;
  getArticle(query, revision);
  $('#page-title').addClass('bounce-away');
  $('#search-wrapper').addClass('slideup');
}

function showResults(i, t, s) {
  $('.results').append('<a href="https://en.wikipedia.org/wiki/' + t + '"><div class="result" id="result"'+i+'>' +
                       '<span class="title">' + t + '</span>' +
                       '<p>' + s + '</p></div></a>');
  $('#page-title').remove();
}

// API calls
function getArticle(item, rev) {
  var url = 'https://cors.now.sh/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exintro=1&gsrlimit=10&gsrprop=snippet&gsrsearch=' + item;
  
  var articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function() {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      var articleInfo = JSON.parse(articleRequest.responseText);
      var results = articleInfo.query.pages;
      
      $('.results').empty();
      
      var i = 0;
      angular.forEach(results, function(v,k)  {
        showResults(i, v.title, v.extract);
        i++;
      })
    }
  }

  articleRequest.open("GET", url, true);
  articleRequest.send();
}