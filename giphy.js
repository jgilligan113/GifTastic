$(document).ready(function() {

	//create buttons from topics
	var topics = ["Really?", "OMG", "I can't even!", "Totes", "SMH"];
	//renderButtons();
    	
	
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

//use button data-name to create query url & make ajax call
	$(".topics").on("click", showGiphs);

	function showGiphs() {
		$(".responseList").empty();
		console.log($(this).attr("data-name"));

    	var term = $(this).attr("data-name");
      
     	var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+" +
        term + "&api_key=dc6zaTOxFJmzC&limit=10";

      	$.ajax({
        	url: queryURL,
          	method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
        	resultCard = $("<div>").attr("class", "gifs" );
        	for ( i = 0; i < results.length; i++ ) {
	        	
	         	var rating = results[i].rating;
	         	var imageStill = results[i].images.fixed_height_still.url;
	         	var imageAnim = results[i].images.fixed_height.url;
	         	var dataState = "still";

	         	console.log(results[i].images.fixed_width.url);
	         	console.log(results[i].images.fixed_width_still.url);
	         	console.log(results[i].rating);

	         	var gifCard = $("<div>").addClass("gifCards");
	         	var p1 = $("<p>").text("Rating: " + rating);
	         	var image2 = $("<img>").attr("src", imageStill);
	         	image2.attr("data-still", imageStill);
	         	image2.attr("data-animate", imageAnim);
	         	image2.attr("data-state", dataState);
         		image2.addClass("result");
         		gifCard.append(p1, image2);
         		$(".responseList").append(gifCard);

        		};

         	});
    };
          		
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
	

 $("#add-topic").on("click", function(event) {
        // Adapted from class example, modified for homework
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field, trim removes spaces before and after string
        var topic = $("#addButton-input").val().trim();
        //check that a value was entered and if not, ask for one...
        if (topic == "") {alert("No giphy for you... enter some fun stuff!")} else{
        // Write code to add the new movie into the movies array
        topics.push(topic);
        console.log(topic);
        console.log(topics);
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();}
        
      });

	
	$(document).on("click", ".topics", showGiphs);
	$(document).on("click", ".result", animatePause);
	renderButtons();




//console.logs
console.log(topics);

});