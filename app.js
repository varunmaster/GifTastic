var animals = ["dogs", "cats", "elephants", "ferrets", "bunny", "hamsters"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("animal");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#buttons-view").on("click",".animal", function() { //must use this way of onClick because we are dynamically generating .animal buttons. https://stackoverflow.com/questions/8110934/direct-vs-delegated-jquery-on/8111171#8111171
    //console.log("Hello");
    $("#animal-view").empty(); //emptying the section that holds the animal gifs
    var userQUery = $(this).attr("data-animal");
    var APIEndPoint = "https://api.giphy.com/v1/gifs/search?api_key=dEWru3fa3EkK5GoZcNHpROm3KoRhgCMv&limit=10&q=" + userQUery;
    //console.log(userQUery);
    $.ajax({
      url: APIEndPoint,
      method: "GET"
    }).then(function(res){
      console.log(res);
      var result = res.data;
      for(var i = 0; i < result.length; i++) {
        //console.log("item " + i + ": " + result[i]);
        var div = $("<div>");
        div.attr("data-animal", userQUery);
        div.attr("type", "gif");
        div.addClass("col-sm-4");
        var rating = $("<p>");
        rating.text("Rating: " + result[i].rating);
        var img = $("<img>");
        img.attr("src",result[i].images.fixed_width_still.url); //using the square brackets bc need to reference a number object property
        img.attr("data-still", result[i].images.fixed_width_still.url);
        img.attr("data-animate", result[i].images.fixed_width.url);
        img.attr("data-state", "still");
        img.attr("class", "gif");
        div.append(rating,img);
        $("#animal-view").append(div,"<br>");
      }
    });//end api call here
  });//end animal.click here

  $("#animal-view").on("click",".gif", function() { //using the click function to animate/un-animate gifs
    var state = $(this).attr("data-state");
    if(state === "still") {
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("data-state","animate")
    }
    else if(state === "animate") {
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("data-state","still");
    }
  });//end trigger-animation clicks

  $("#add-animal").on("click", function(event) {
    event.preventDefault(); //preventDefault is telling the browser to not refresh the page after a user adds a movie. when it refreshes the page, the movie that the user put in will disappear
    var animal = $("#animal-input").val().trim(); 
    animals.push(animal);
    renderButtons();
    console.log("hello");
  });//end add-animal.click here

  renderButtons();

/*
<img src="someURL_s.gif" data-still="someURL_s.gif" data-animate="somrURL.gif" data-state="still" class="gif"> //the "_s" in src and data-still tell the browser that its still until you click on it
 */
