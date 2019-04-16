var queryURL = "https://api.giphy.com/v1/gifs/search?q=dressage&api_key=z7A8c37PW02Tm9dCLWmdAOT0DsmFgtP1&limit=10";
var returnedImages={};
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      returnedImages = response.data;
      return
    });


    console.log(returnedImages);