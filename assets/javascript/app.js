var apiKey='z7A8c37PW02Tm9dCLWmdAOT0DsmFgtP1';
var whichOne;
var offset=0; 
var searchBy="";
var queryURL="";
var topics=["pirates", "dressage", "dragons", "horses", "tigers", "firefly", "princess bride"];

$('document').ready(function(){
  makeButtons(topics);
});

function makeButtons(topics){
  for (buttonCount = 0; buttonCount < topics.length; buttonCount++){
    $('#theButtons').append(`<button id='${topics[buttonCount]}' class="coolStuff">${topics[buttonCount]}</button>`);
  }
}

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
          $card.append('<div class=rating>' + response.data[i].rating.toUpperCase() + '</div>');
          $card.attr('id', response.data[i].id);
        $('#theGifs').append($card);
        
      }
      $('#more').show();
      offset+=10;
    })});

    $('#theGifs').on('click', '.card', function(event){
      event.preventDefault();
      var cardState = $(event.target, 'img').attr('state');
      console.log(cardState);
      if (cardState === 'still'){
        $(event.target, 'img').attr('src', $(event.target, 'img').attr('animation'));
        $(event.target, 'img').attr('state', 'moving');
      }
      else{
        $(event.target, 'img').attr('src', $(event.target, 'img').attr('still'));
        $(event.target, 'img').attr('state', 'still');
      }
    });

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
    }}
; 