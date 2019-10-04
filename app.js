var animals = ["dogs", "cats", "elephants", "ferrets", "bunny", "hamsters"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("movie");
      a.attr("data-name", animals[i]);
      a.text(animals[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#add-movie").on("click", function(event) {
    event.preventDefault(); //preventDefault is telling the browser to not refresh the page after a user adds a movie. when it refreshes the page, the movie that the user put in will disappear
    var animal = $("#movie-input").val().trim(); 
    animals.push(animal);
    renderButtons();

  });

  renderButtons();
