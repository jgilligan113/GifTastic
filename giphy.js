$(document).ready(function() {

	//create buttons from topics
	var topics = ["moon", "stars", "comet", "black hole", "earth", "alien"];
	
	
/*	$(document).on("click", ".add-space", addTopic);
	
	function addTopic() {

		$("#add-space").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field

        var topic = $("#space-input").val().trim();
        // Write code to add the new movie into the movies array
        topics.push(topic);
        console.log(topics);

    	});
	}*/
	
//render the topics array to the page as buttons
	function renderButtons() {

	        $(".buttons").empty();

	        for (i=0; i<topics.length; i++) {

	          buttons = $("<button>").attr("data-name", topics[i]);
	          buttons.addClass("topics btn btn-info");
	          buttons.text(topics[i]);
	          $(".buttons").append(buttons);
	        };
	};
		
	renderButtons();

//use button data-name to create query url & make ajax call
	$(".topics").on("click", showGiphs);

	function showGiphs() {
		$(".responseList").empty();
		console.log($(this).attr("data-name"));

    	var space = $(this).attr("data-name");
      
     	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        space + "&api_key=dc6zaTOxFJmzC&limit=10";

      	$.ajax({
        	url: queryURL,
          	method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
        	resultCard = $("<div>").attr("class", "gifs" );
        	for ( i = 0; i < results.length; i++ ) {
	        	
	         	var rating = results[i].rating;
	         	var imageStill = results[i].images.fixed_width_still.url;
	         	var imageAnim = results[i].images.fixed_width.url;
	         	var dataState = "still";

	         	console.log(results[i].images.fixed_width.url);
	         	console.log(results[i].images.fixed_width_still.url);
	         	console.log(results[i].rating);

	         	var p1 = $("<p>").text("Rating: " + rating);
	         	var image2 = $("<img>").attr("src", imageStill);
	         	image2.attr("data-still", imageStill);
	         	image2.attr("data-animate", imageAnim);
	         	image2.attr("data-state", dataState);
         		image2.addClass("result");
         		$(".responseList").append(p1, image2);

        		};

         	});

    };

     $(document).on("click", ".result", animatePause);
          		
     function animatePause() {
		console.log($(this));
		console.log($(this).attr("data-state"));
		console.log($(this).attr("src"));
		console.log($(this).attr("data-animate"));
		console.log($(this).attr("data-still"));
		var state = $(this).attr("data-state");
		if (state === "still") {

		    $(this).attr("src", $(this).attr("data-animate"));
		    $(this).attr("data-state", "animate");
		    

		  } else {

		    $(this).attr("src", $(this).attr("data-still"));
		    $(this).attr("data-state", "still");
  }

};

	//get response and append to page - two gif versions to animate and pause

        
	



	//};

//console.logs
console.log(topics);

});