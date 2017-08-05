var topics = ["Game of Thrones", "VR", "Total Recall", "Infomercials"];

$( document ).ready(function() {

function displayGif() {

        var addedGifCategory = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + addedGifCategory + "&api_key=f8c172b6f47d4631b1da11f7628b7d25&limit=10";

        $("#gifbucket").empty();  

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


          for (i = 0; i < response.data.length; i++)  {

          // Creating a div to hold the picture and rating
          var gifDiv = $("<div class='displayedGif'>");

          // Storing the rating data
          var rating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var newP = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          gifDiv.append(newP);

          // Rtrieving the URL for the still image
          var stillUrl = response.data[i].images.fixed_height_small_still.url;
          // Retrieving the URL for the animated image
          var animatedUrl = response.data[i].images.fixed_height_small.url;

          var image = $("<img class=picture animated-gif=" + animatedUrl + " still-gif=" + stillUrl + " data-state=still>").attr("src", stillUrl);
 
          // // Appending the image
          gifDiv.append(image);

          // Putting the new gif after the previous one
          $("#gifbucket").append(gifDiv);
        // }
        }
      });

      }

      function renderButtons() {

        // Deleting the Gif buttons before populate the new buttons
        $("#buttonbucket").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          var newButton = $("<button>");
          // Adding a class of topic to our button
          newButton.addClass("topic");
          // Adding a data-attribute
          newButton.attr("data-name", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the buttonbucket div
          $("#buttonbucket").append(newButton);
         
        }
      }

      // This function handles events where one button is clicked
      $("#addgif").on("click", function(event) {
        
        event.preventDefault();

        // This line will grab the text from the input box
        var newtopic = $("#searchfield").val().trim();
        // The movie from the textbox is then added to our array

        topics.push(newtopic);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });


$(document).on("click", ".topic", displayGif);

$(document).on("click", ".picture", function() {

      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("animated-gif"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still-gif"));
        $(this).attr("data-state", "still");
      }
    });

  renderButtons();

});