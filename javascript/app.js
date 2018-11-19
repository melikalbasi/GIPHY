var characters = ["Ross", "Rachel", "Phoebe", "Chandler", "Joey", "Monica"];
var apiKey = "6181b0ebaf0342f1b3f5f8e23474b3fe";

function renderButtons() {
    for (var i = 0; i < characters.length; i++) {
        var button = $("<button>");
        button.addClass("gifBtn");
        button.text(characters[i]);
        $(".buttons").append(button);
    }
}

function gifRequest(topic) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=" + apiKey;

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

