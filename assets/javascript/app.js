var apiKey='z7A8c37PW02Tm9dCLWmdAOT0DsmFgtP1';
var whichOne;
var offset=0; 
var searchBy="";
var queryURL="";

$('button').click(function(){
  searching(event);
  queryURL= "https://api.giphy.com/v1/gifs/search?q=" + searchBy + "&api_key=" + apiKey + "&limit=10&offset=" + offset;
  console.log(searchBy);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (i=0; i<response.data.length; i++){
      var picture=response.data[i].images.original.url;
      var movingPicture = $("<img>");
          movingPicture.attr("src", picture);
          movingPicture.attr("alt", response.data[i].title);
          $("#theGifs").append(movingPicture);
      }
      $('#more').show();
      offset+=10;
    })});

   /* $('#more').click(function(){
      $.ajax({
        url: queryURL +'&offset=' + offset,
        method: "GET"
      }).then(function(response) {
        for (i=0; i<response.data.length; i++){
        var picture=response.data[i].images.original.url;
        var morePictures = $("<img>");
            morePictures.attr("src", picture);
            morePictures.attr("alt", response.data[i].title);
            $("#theGifs").append(morePictures);
        }
        offset+=10;
        console.log(offset);
        $('#more').show();
    })});
*/
    function searching(clicked){
      if ($(clicked.currentTarget).hasClass('coolStuff')){
      $('#theGifs').empty();
      offset=0;
      searchBy = $(clicked.currentTarget).attr('id');
    }}
; 
    


     
