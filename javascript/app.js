// declare variables 
var characters = ["Ross", "Rachel", "Phoebe", "Chandler", "Joey", "Monica"];
var apiKey = "6181b0ebaf0342f1b3f5f8e23474b3fe";

// create function to render buttons of each item in our array
function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < characters.length; i++) {
        var button = $("<button>");
        button.addClass("gifBtn");
        button.text(characters[i]);
        $(".buttons").append(button);
    }
}

// function to request gifs with our api key for giphy
function gifRequest(topic) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&rating=g&rating=pg&limit=10&api_key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(response.data);
        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gifDiv'>");
        var ratingText = $("<p>").text("rating: " + results[i].rating);
        var stillGif = results[i].images.fixed_height_still.url;
        var animatedGif = results[i].images.fixed_height.url;
        var gifImage = $("<img class='gifImage'>");
        gifImage.attr("src", stillGif);
        gifImage.attr("data-state", "still");
        gifImage.attr("data-animate", animatedGif);
        gifImage.attr("data-still", stillGif);
        gifDiv.append(ratingText);
        gifDiv.append(gifImage);
        $(".gifContainer").append(gifDiv);

        }

    });
}



// This function handles events where the add character button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var friendsChar = $("#gif-input").val().trim();

    // The character from the textbox is then added to our array
    characters.push(friendsChar);

    // Calling renderButtons which handles the processing of our characters array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".gifDiv", renderButtons);







// when document loads, add event listeners to do something
$(document).on("click", ".gifBtn", function () {
    gifRequest($(this).text());
})

$(document).on("click", ".gifDiv", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



renderButtons();

