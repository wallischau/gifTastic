


var queryURL;
var userInput;
itemNum = 0;
btnArray = [];
gifSet = [];

$(document).ready(function() {

//get user input and make button
$('#add-gif').click(function(event) {
	event.preventDefault();
	userInput = $('#gif-input').val().trim();
	var newBtn = $('<button>');
	newBtn.attr('id',`gif-${itemNum}`);
	newBtn.addClass("gif-button");
	newBtn.text(userInput);
	itemNum++;
	$('#gif-list').append(newBtn);
	//add new gif to array
	btnArray.push(newBtn);
	console.log(btnArray);
	//clear input text
	$('#gif-input').val('');
});

//click on new button
$('#gif-list').on('click', '.gif-button', function() {
	console.log($(this));	
	//setup url
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this)[0].textContent + "&api_key=98b0dc0aad1b49e5b25b2c7baf1c4ea5&limit=10";
	console.log(queryURL);
	$.ajax( {url: queryURL,
			method: 'GET'
		}).done(function(response) {
			//display rating
			showGifInfo(response);
		});
})


function showGifInfo(respn) {
	console.log(respn);
	$('#gif-images').empty();
	for (var i=0; i<respn.data.length; i++) {
		//create image block
		var imgBlock = $('<div>');	
		imgBlock.addClass('img-block');
		imgBlock.attr('id', `img-block-${i}`);
		//display rating inside img block
		var ratingDiv = $('<div>');
		ratingDiv.text(respn.data[i].rating);
		imgBlock.append(ratingDiv);
		//display image inside img block
		var image = $('<img>');
		image.addClass('img-item');
		image.attr('data-still', respn.data[i].images.fixed_height_small_still.url);
		image.attr('data-animate', respn.data[i].images.fixed_height_small.url);
		image.attr('data-state', 'still');
		image.attr('src', image.attr('data-still'));

		imgBlock.append(image);
		$('#gif-images').append(imgBlock);
	}
}

//onclick each image
$('#gif-images').on('click', '.img-item', function() {
	console.log($(this));
	if ($(this).attr('data-state') === 'still') {
		$(this).attr('data-state','animate');
		$(this).attr('src', $(this).attr('data-animate'));
	}
	else {
		$(this).attr('data-state','still');
		$(this).attr('src', $(this).attr('data-still'));
	}
});








});//ready
