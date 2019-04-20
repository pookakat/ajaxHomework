var apiKey='z7A8c37PW02Tm9dCLWmdAOT0DsmFgtP1';
var whichOne;
var offset=0; 
var searchBy="";
var queryURL="";
var topics=["pirates", "dressage", "dragons", "horses", "tigers", "firefly", "princess bride"];
var favorites=[];

$('document').ready(function(){
  makeButtons(topics);
  oldFavorites();
});

function oldFavorites(){
  var oldJsonArray = localStorage.getItem('pastFavorites')
  oldJsonArray = JSON.parse(oldJsonArray);
  if (oldJsonArray != null){
    favorites = oldJsonArray;
    favoritesBox();
  }
  return;
}

function makeButtons(topics){
  for (buttonCount = 0; buttonCount < topics.length; buttonCount++){
    $('#theButtons').append(`<button id='${topics[buttonCount]}' class="coolStuff">${topics[buttonCount]}</button>`);
  }
}

function favoritesBox(){
  var jsonArray =  JSON.stringify(favorites);
  localStorage.setItem('pastFavorites', jsonArray);
  $('#past').show();
  $('#favorites').addClass('flexSettings');
  $('#favorites').empty();
  for (faveCount=0; faveCount<favorites.length; faveCount++){ 
    queryURL= "https://api.giphy.com/v1/gifs/" + favorites[faveCount] + "?api_key=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      picture=response.data.images.fixed_height_still.url;
      animation=response.data.images.fixed_height.url;
        var $card = $('<div class=card>');
        var movingPicture = $("<img>");
          movingPicture.attr("src", picture);
          movingPicture.attr("alt", response.data.title);
          movingPicture.attr("animation", animation);
          movingPicture.attr("still", picture);
          movingPicture.attr("state", "still");
          $card.append(movingPicture);
          $card.append('<div class="title cardText"> Title: ' + response.data.title + '<div>');
          $card.append('<div class="rating cardText"> Rated: ' + response.data.rating.toUpperCase() + '</div>');
          $card.attr('id', response.data.id);
          $('#favorites').append($card);
    });
  };
};


$('.button-container').on('click', 'button', function(event){
  event.preventDefault();
  searching(event);
  queryURL= "https://api.giphy.com/v1/gifs/search?q=" + searchBy + "&api_key=" + apiKey + "&limit=10&offset=" + offset;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (i=0; i<response.data.length; i++){
        picture=response.data[i].images.fixed_height_still.url;
        animation=response.data[i].images.fixed_height.url;
        var $card = $('<div class=card>');
        var movingPicture = $("<img>");
          movingPicture.attr("src", picture);
          movingPicture.attr("alt", response.data[i].title);
          movingPicture.attr("animation", animation);
          movingPicture.attr("still", picture);
          movingPicture.attr("state", "still");
          $card.append(movingPicture);
          $card.append('<div class="title cardText"> Title: ' + response.data[i].title + '<div>');
          $card.append('<div class="rating cardText"> Rated: ' + response.data[i].rating.toUpperCase() + '</div>');
          $card.append('<div class="favorite cardText">Favorite This<div>');
          $card.append()
          $card.attr('id', response.data[i].id);
        $('#theGifs').append($card);
        
      }
      $('#more').show();
      offset+=10;
    })});

    $('.gifContainer').on('click', 'img', function(event){
      event.preventDefault();
      var cardState = $(this).attr('state');
      if (cardState === 'still'){
        $(this).attr('src', $(this).attr('animation'));
        $(this).attr('state', 'moving');
      }
      else{
        $(this).attr('src', $(this).attr('still'));
        $(this).attr('state', 'still');
      }
    });

    $('#theGifs').on('click', ".favorite", function(event){
      event.preventDefault();
      newFavorite=$(this).parent().attr('id');
      favorites.push('' + newFavorite + '');
      favoritesBox();
    })

    $('#suggestion').submit(function(event){
      event.preventDefault();
      newTopic=$('#addedButton').val().trim();
      topics.push(newTopic);
      $('#theButtons').empty();
      $('#addedButton').val('');
      makeButtons(topics);
    });

    function searching(clicked){
      if ($(clicked.target).hasClass('coolStuff')){
      $('#theGifs').empty();
      offset=0;
      searchBy = $(clicked.target).attr('id');
    }};