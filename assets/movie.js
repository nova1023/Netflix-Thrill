// Initialize Firebase
var config = {
  apiKey: "AIzaSyCYWAG196VQMocNcqF2CzYrHn3BFTTLzrY",
  authDomain: "moviethrill-f470e.firebaseapp.com",
  databaseURL: "https://moviethrill-f470e.firebaseio.com",
  storageBucket: "moviethrill-f470e.appspot.com",
  messagingSenderId: "870241521240"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var $myCarousel = $("#myCarousel");
$myCarousel.on("slide.bs.carousel", function (event) {
var $currentSlide = $myCarousel.find(".active iframe");
  
  // exit if there's no iframe, i.e. if this is just an image and not a video player
  if (!$currentSlide.length) { return; }
  
  // pass that iframe into Froogaloop, and call api("pause") on it.
  var player = Froogaloop($currentSlide[0]);
  player.api("pause");
});


var foodStorage = {};
var movieStorage = {};
var FoodArray=[];
var count=0;
var clickStatus = false;
var firstname = "";
var lastname = "";
var gif = "";
var poster = "";
var showId = 0;
var title = "";
var dataArray = [];
var randomIndex = 0;
var randomObj;

$("#mash").html("<img src= assets/netflix2.jpg>")

// food button function
$(".foodbutton").on("click", function() {
  $("#foodframe").empty();
  $("#movieframe").empty();
  $("#back").css("background-color","#b00304");
  $("#first-input").val("")
  $("#last-input").val("")
  $("#roll").html("Submit")
  $('.container').css("background-image",'');
  $("#mash").html("<img src= assets/netflix2.jpg>")
  $("#changeImg").css("background-color","black");
  $("#foodbox").empty();
$("#moviebox").empty();
  foodStorage={};
  var qsearch = $(this).val().trim();
  var apiKey = "f5a87ab9891de9962393334b9dd0bada&from=0&to=100";
  var apiID = "43e328ce"
  var url = "https://api.edamam.com/search?q="
+ qsearch
+ "&app_id=" + apiID
+ "&app_key=" + apiKey;
  var randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);
  foodVal= $(this).val().trim();
  console.log(url);
  $.ajax({
    url: url,
    method:"GET",
  }) .done(function(response){
  $("#foodbox").empty();
  $("#foodframe").empty();
  
  console.log(response.hits);
  console.log(response.hits[randomNum].recipe.image);
  console.log(response.hits[randomNum].recipe.label);
  console.log(response.hits[randomNum].recipe.url);
  console.log(response.hits[randomNum].recipe.ingredientLines);

  foodStorage.image = response.hits[randomNum].recipe.image;
  foodStorage.label = response.hits[randomNum].recipe.label;
  foodStorage.url = response.hits[randomNum].recipe.url;
  foodStorage.ingredients = response.hits[randomNum].recipe.ingredientLines;
  foodStorage.label = response.hits[randomNum].recipe.label;
  console.log("after:");
  console.log(foodStorage.label);

  });

});

console.log("before:");
console.log(foodStorage);

// Get your results button
$("#roll").on("click", function() {
  $("#first-input").val("")
  $("#last-input").val("")
  $("#back").css("background-color","black");
  $("#mash").css("font-family",'Patua One','cursive')
  $("#mash").html("Click the images for more options")
  $("#foodbox").empty();
  $("#moviebox").empty();
  $("#foodframe").empty();
  event.preventDefault();

  var reset = $("<button>");
    reset.text("Reset");
    reset.css("margin-top", "23px")
    $("#reset").append(reset);
    

  var foodURL = foodStorage.url;
  var foodimg = $("<img>").attr("src", foodURL);
  foodimg.attr("src", foodStorage.image);
  $("#foodbox").append(foodimg);

  var movieID = movieStorage.showId;
  var movieLink="https://www.netflix.com/title/" + movieID ;
  var movieimg = $("<img>").attr("src", movieLink);
  movieimg.attr("src", movieStorage.poster);
  $("#moviebox").append(movieimg);
    
  var randomNum = Math.floor(Math.random() * 30);
  var url= "http://api.giphy.com/v1/gifs/search?q="+ movieStorage.firstname + "+" + movieStorage.lastname + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: url,
      method:"GET",
    }).then(function(gifs){
    console.log(gifs.data[randomNum].images.original.url);
    
    movieStorage.gif= gifs.data[randomNum].images.original.url;
    console.log(movieStorage.gif);
    
    $('.container').css('background-repeat',"no-repeat");
    $('.container').css('background-size',"1175px, 950px");
    $('.container').css('background-image', 'url('+movieStorage.gif+')');
    movieStorage.dateAdded = moment().format("X");
    database.ref().push(movieStorage);

  });

  $("#movieframe").empty();
  q = movieStorage.title + "movie trailer";
  console.log(q);
  $.get(
  "https://www.googleapis.com/youtube/v3/search",{
  part: "snippet, id",
  q:q,
  type:"video",
  key:"AIzaSyDvxPJEWCPJYiCcRO_xw7LzQMEopXZmM7c"},
  function(data){
  console.log(data);
  console.log(data.items[0].id.videoId)
  movieStorage.youTubeId= data.items[0].id.videoId;
  console.log(movieStorage.youTubeId);
    
  var movieframe = $("<iframe>");
  movieframe.attr("src", "http://www.youtube.com/embed/"+ data.items[0].id.videoId+"?rel=0&autoplay=1");
  movieframe.attr("frameborder", "0");
  movieframe.css("margin-top", "30px");
  movieframe.attr("width", "330");
  movieframe.attr("height", "375");
  movieframe.attr("align", "center");
  movieframe.css("box-shadow","10px 10px 10px red")
  movieframe.css("border","4px solid red")
  movieframe.css("z-index", "-1")
  $("#movieframe").append(movieframe);  
  });



});


$(document).on("click", "#foodbox", function() {
window.open(foodStorage.url, "_blank");
});
$(document).on("click", "#moviebox", function() {
window.open("https://www.netflix.com/title/" + movieStorage.showId, "_blank");
});

$("#reset").on("click", function() {
document.location.reload();
});


//submit actor button
$(".moviebutton").on("click", function(event) {
  event.preventDefault();
  $("#roll").css("background-color","green")
  $("#movieframe").empty();
  $("#back").css("background-color","#b00304");
  $("#roll").html("Submit")
  $("#foodbox").empty();
  $("#moviebox").empty();
  $("#mash").html("<img src= assets/netflix2.jpg>");
  $('.container').css("background-image",'');
  $("#changeImg").css("background-color","black");
  var a =$("#first-input").val().trim();
  var b =$("#last-input").val().trim();
  movieStorage.firstname = a;
  movieStorage.lastname= b;
  console.log(movieStorage)

  var url = "http://netflixroulette.net/api/api.php?actor="+  movieStorage.firstname + "%20" + movieStorage.lastname;
    $.ajax({
      url: url,
      method:"GET",
    }).then(function(response){
    console.log(response);
    var randomNum2 = Math.floor(Math.random() * (response.length - 1));
    console.log(randomNum2);
    movieStorage.showId=response[randomNum2].show_id;
    movieStorage.title= response[randomNum2].show_title;
    return $.ajax({
      url: "http://www.omdbapi.com/?t=" + movieStorage.title + "&y=&plot=short&r=json",
      method: "GET"
    })
  
    
    }, function(error) {
      console.log(JSON.parse(error.responseText).message);
      movieStorage.ErrorMessage=JSON.parse(error.responseText).message;
      $("#moviebox").html(movieStorage.ErrorMessage);
    }).done(function(resp){
    
        movieStorage.poster = resp.Poster;
        console.log(typeof resp.Poster);
        });
        $("#function").attr("class","dropdown")
        $("#toggle").attr("aria-expanded","false")  
});

// pulling random child from firebase database
database.ref().orderByChild("dateAdded").limitToLast(100).on("child_added", function(snapshot){
dataArray.push(snapshot.val());
  
  if (dataArray.length > 100) {
    dataArray.splice(0, 1);
  }
  if(clickStatus===true){
    
    console.log(dataArray);
    randomIndex = Math.floor(Math.random() * dataArray.length);
    randomObj = dataArray[randomIndex];
    console.log(randomObj);
  }
});

// randomizer button
$(".randomizer").on("click", function(event) {
  event.preventDefault();
  clickStatus = true;
  $("#back").css("background-color","black");
  $("#roll").html("try another gif")
  $("#mash").css("font-family",'Patua One','cursive')
  $("#mash").html("Click the images for more options")
  $("#moviebox").empty();
  randomIndex = Math.floor(Math.random() * dataArray.length);
  movieStorage.showId = dataArray[randomIndex].showId;
  var movieLink = "https://www.netflix.com/title/" + movieStorage.showId;
  var movieimg = $("<img>").attr("src", movieLink);
  movieimg.attr("src", dataArray[randomIndex].poster);
  $("#moviebox").append(movieimg);
  $('.container').css('background-image', 'url('+dataArray[randomIndex].gif+')');
  $('.container').css('background-repeat',"no-repeat");
  $('.container').css('background-size',"cover");

  var reset = $("<button>");
  reset.text("Reset");
  reset.css("margin-top", "23px");
  $("#reset").append(reset);
    
  var foodURL = foodStorage.url;
  var foodimg = $("<img>").attr("src", foodURL);
  foodimg.attr("src", foodStorage.image);
  $("#foodbox").append(foodimg);

  var movieframe = $("<iframe>");
  movieframe.attr("src", "http://www.youtube.com/embed/"+ movieStorage.youTubeId+"?rel=0&autoplay=1" );
  movieframe.attr("frameborder", "0");
  movieframe.css("margin-top", "30px");
  //movieframe.attr("height", "442");
  movieframe.attr("width", "330");
  movieframe.attr("height", "375");
  movieframe.attr("align", "center");
  movieframe.css("box-shadow","10px 10px 10px red");
  movieframe.css("border","4px solid red");
  movieframe.css("z-index", "-1");
  $("#movieframe").append(movieframe);
});