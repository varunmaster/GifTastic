var vacations = ["Toronto", "Lisbon", "Jamaica", "Tel Aviv", "Galapagos Islands", "Lapland", "Bahamas"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < vacations.length; i++) {
      var a = $("<button>");
      a.attr("type","vacation");
      a.addClass("btn btn-info vacation");
      a.attr("data-vacation", vacations[i]);
      a.text(vacations[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#buttons-view").on("click",".vacation", function() { //must use this way of onClick because we are dynamically generating .vacation buttons. https://stackoverflow.com/questions/8110934/direct-vs-delegated-jquery-on/8111171#8111171
    //console.log("Hello");
    $("#vacation-view").empty(); //emptying the section that holds the vacation gifs
    var userQUery = $(this).attr("data-vacation");
    var APIEndPoint = "https://api.giphy.com/v1/gifs/search?api_key=dEWru3fa3EkK5GoZcNHpROm3KoRhgCMv&limit=10&rating=g&q=" + userQUery;
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
        div.attr("data-vacation", userQUery);
        div.attr("id", "gif");
        div.addClass("rounded mx-auto d-block col-sm-4 gif");
        var rating = $("<p>");
        rating.text("Rating: " + result[i].rating);
        var img = $("<img>");
        img.attr("src",result[i].images.fixed_width_still.url); 
        img.attr("data-still", result[i].images.fixed_width_still.url);
        img.attr("data-animate", result[i].images.fixed_width.url);
        img.attr("data-state", "still");
        img.attr("class", "gif");
        div.append(rating,img);
        $("#vacation-view").append(div,);
      }
    });//end api call here
  });//end vacation.click here

  $("#vacation-view").on("click",".gif", function() { //using the click function to animate/un-animate gifs
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

  $("#add-vacation").on("click", function(event) {
    event.preventDefault(); //preventDefault is telling the browser to not refresh the page after a user adds a movie. when it refreshes the page, the movie that the user put in will disappear
    var vacation = $("#vacation-input").val().trim(); 
    vacations.push(vacation);
    renderButtons();
    $("#vacation-input").val("");
    // console.log("hello");
  });//end add-vacation.click here

  renderButtons();

/*
<img src="someURL_s.gif" data-still="someURL_s.gif" data-animate="somrURL.gif" data-state="still" class="gif"> //the "_s" in src and data-still tell the browser that its still until you click on it
 */
