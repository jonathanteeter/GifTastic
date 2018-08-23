var array = ["Cheetahs", "Flamingos", "Giraffes", "Goats", "Koala Bears", "Orangutans", "Lemurs", "Ostriches", "Penguins", "Toucans"];

$(document).ready(function(){

    $("#add-animal").on("click", function(event) { // CSS Styled
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        // Using a form so that the user can hit enter INSTEAD of clicking the button if they want
        // This line will grab the text from the input box
        var animal = $("#image-input").val().trim();
        console.log(animal);

        // The animal from the textbox is then added to our array
        array.push(animal);

        console.log("array: " + array);

        renderButtons();
    });
    
    function renderButtons() {
        // Delete the animal buttons prior to adding new ones
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtons").empty();

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
        // jQuery line break to the page to clear Gifs if displayed
        $("#images").html("<br />");
    }

    // Detect the animal button clicked and display the associated Gifs
    // $(".animal-buttons").on("click", function() {
    function displayGifs() {
        console.log("Animal Button Clicked");
        
        // Get selected animal
        var selectedAnimal = $(this).attr("button");
        console.log("Button selected is: " + selectedAnimal);

        // Prepare the URL
        var baseUrl = 'https://api.giphy.com/v1/gifs/search?q=';
        var userinput = selectedAnimal;
        var key = '&api_key=xhZaqFQHadxdfwECPk3PnrH9Km1XVPnO&limit=15';
        var queryURL = baseUrl + userinput + key;

        console.log(queryURL);
        // jQuery line break to the page before display of GIFs
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
                console.log("Still Image URL: ", stillImageURL);
                console.log("Animate Image URL: ", animateImageURL);

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                // animalImage.attr("src", stillImageURL);
                animalImage.attr("src", animateImageURL);
                animalImage.attr("alt", selectedAnimal);
                
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
                
                // Add animal images to the images ID div
                $("#images").prepend(animalDiv); // CSS styled
            }
        });              
    };

    // Detect the animal button clicked and display the associated Gifs
    // $(".animal-buttons").on("click", displayGifs());
    $(document).on('click', ".animal-buttons", displayGifs);
    renderButtons();
});