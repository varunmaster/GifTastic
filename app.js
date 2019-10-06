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

  $("#buttons-view").on("click",".animal", function() { //must use way of onClick because we are dynamically generating .animal buttons. https://stackoverflow.com/questions/8110934/direct-vs-delegated-jquery-on/8111171#8111171
    console.log("Hello");
    var userQUery = $(this).attr("data-animal");
    var APIEndPoint = "https://api.giphy.com/v1/gifs/search?api_key=dEWru3fa3EkK5GoZcNHpROm3KoRhgCMv&q=" + userQUery;
    console.log(userQUery);
    $.ajax({
      url: APIEndPoint,
      method: "GET"
    }).then(function(res){
      console.log(res);
    });//end api call here
  });//end animal.click here

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
