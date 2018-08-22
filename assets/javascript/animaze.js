var array = ["Anteaters", "Armadillos", "Baboons", "Camels", "Flamingos", "Goats", "Hippos", "Honey Badgers", "Lemurs", "Penguins", "Toucans"];

$(document).ready(function(){

    $("#add-animal").on("click", function(event) { // CSS Styled

        console.log("New Button Added");

        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var animal = $("#image-input").val().trim();
        console.log(animal);

        // The animal from the textbox is then added to our array
        array.push(animal);

        console.log("array: " + array);

        render();
    });
    
            // // Function for displaying movie data
        // function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        //     $("#movies-view").empty();

        //     // Looping through the array of movies
        //     for (var i = 0; i < movies.length; i++) {

        //         // Then dynamicaly generating buttons for each movie in the array.
        //         // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        //         var a = $("<button>");
        //         // Adding a class
        //         a.addClass("movie");
        //         // Adding a data-attribute with a value of the movie at index i
        //         a.attr("data-name", movies[i]);
        //         // Providing the button's text with a value of the movie at index i
        //         a.text(movies[i]);
        //         // Adding the button to the HTML
        //         $("#movies-view").append(a);
        //     }
        // }

    function render() {
        // Delete the animal buttons prior to adding new ones
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtons").empty();
        
        console.log("Function Render Called");

        // Loop through the array of animals
        for(var i = 0; i < array.length; i++) {
            
            // Dynamicaly generate buttons for each animal in the array.
            var buttonName = $("<buttons>");

            // jQuery uses to create the start and end tag <button></button>
            // Add a data-attribute with a value of the animal at index i
            buttonName.attr('button', (array[i]))
            buttonName.attr('id', 'animal-button')
            buttonName.addClass('btn') // CSS styled
            buttonName.addClass('animal-buttons')
            // Provide the button's text with a value of the animal at index i
            buttonName.text(array[i])

            console.log(array[i])

            // add button to page
            $("#animalButtons").append(buttonName) 
        }
    }
    render();

    // Detect the animal button clicked and display the associated Gifs
    $(".animal-buttons").on("click", function() {

        console.log("Animal Button Clicked");
        
        // Get selected animal
        var selectedAnimal = $(this).attr("button");
        console.log("Button selected is: " + selectedAnimal);

        // Prepare the URL
        var baseUrl = 'https://api.giphy.com/v1/gifs/search?q=';
        var userinput = selectedAnimal;
        var key = '&api_key=xhZaqFQHadxdfwECPk3PnrH9Km1XVPnO&limit=10';
        var queryURL = baseUrl + userinput + key;

        console.log(queryURL);
        $("#images").html("<br />");

        // Make the AJAX call to the queryURL using jQuery
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // Run function after AJAX call when API returns data
        .then(function(response) {

            for(var j = 0; j < response.data.length; j++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");
                animalDiv.addClass("animalResults"); // CSS styled


                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating is: " + ratingURL);  // WANTED TO USE "str.toUpperCase() without success.
                
                // Define variables that provide the Rating & image URL, both still and animated
                var ratingURL = response.data[j].rating;

                var stillImageURL = response.data[j].images.fixed_height_small_still.url;
                var animateImageURL = response.data[j].images.fixed_height_small.url
                console.log("Rating is: ", ratingURL);
                console.log("Image URL is: ", stillImageURL);

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", animateImageURL);
                animalImage.attr("alt", selectedAnimal);
                
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
                
                // Add animal images to the #images div
                $("#images").prepend(animalDiv); // CSS styled

            }
        });              
    });
});