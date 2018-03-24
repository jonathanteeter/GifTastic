var topics = ["Flamingos", "Hippos", "Lemurs", "Camels", "Honey Badgers", "Hyenas", "Monkeys", "Llamas", "Anteaters", "Sloths", "Toucans", "Goats", "Armadillo", "Pinguin"];
        
$(document).ready(function(){

    $("#add-animal").on("click", function(event) {

        console.log("New Button Added");

        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var animal = $("#image-input").val().trim();
        console.log(animal);

        // The animal from the textbox is then added to our array
        topics.push(animal);

        console.log("topics: " + topics);

        render();
    });
    
    function render() {
        $("#animalButtons").empty();
        
        console.log("Function Render Called");

        for(var i = 0; i < topics.length; i++) {
            
            // create html element
            var buttonName = $("<buttons>");

            buttonName.attr('button', (topics[i]))
            buttonName.attr('id', 'animal-button')
            buttonName.addClass('btn')
            buttonName.addClass('animal-buttons')
            buttonName.text(topics[i])

            console.log(topics[i])

            // add button to page
            $("#animalButtons").append(buttonName) 
        }
    }
    render();
    

    $(".animal-buttons").on("click", function() {

        console.log("Animal Button Clicked");
        
        // Get selected animal
        var selectedAnimal = $(this).attr("button");
        console.log("Button selected is: " + selectedAnimal);
        //  NO WORKIE:
        // var button_text = $('#animal-button').text();
        // console.log(button_text);

        // ~ var button_text = document.getElementById('#animal-button').innerHTML;

        var baseUrl = 'https://api.giphy.com/v1/gifs/search?q=';
        var userinput = selectedAnimal;
        var key = '&api_key=xhZaqFQHadxdfwECPk3PnrH9Km1XVPnO&limit=10';
        var queryURL = baseUrl + userinput + key;

        console.log(queryURL);

        // Making an AJAX call to the queryURL using jQuery
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // Run function after AJAX call when API returns data
        .then(function(response) {

            for(var j = 0; j < response.data.length; j++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");
                animalDiv.addClass("animalResults");


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
                $("#images").prepend(animalDiv);

            }
        });              
    });
})


