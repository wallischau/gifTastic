/*GifTastic                                */
/*Author: Wallis Chau                      */
/*Description: Lists gif and animate gif   */
/*from giphy.com on user input             */
/*Date: 8/22/17                            */

var queryURL;
var userInput;
var itemNum = 0;
var quantity = 12;
var offset = 0;
var str = null;
var gifInitList = ['snow white', 'tinker bell', 'minion', 'mulan', 'last airbender', 'cinderella', 'lion king'];
 
$(document).ready(function() {
     
/* addButton                                 */
/* description: add a img button to the DOM  */
/* parameter:  input - text on the button    */
function addButton(input) {
	//create new button for each keyword
	var newBtn = $('<button>');
	newBtn.attr('id',`gif-${itemNum}`);
	newBtn.css('font-size', '20px');
	newBtn.addClass("gif-button");
	newBtn.text(input);
	$('#gif-list').append(newBtn);
	//clear input text
	$('#gif-input').val('');

	//make superscript div
	var newCloseDiv = $('<div>');
	var style = {
		border: '1px solid black',
		position: 'absolute',
		right: '-5px',
		top: '-5px',
		height: '10px',
		width: '10px',
		background: '#ff7',
		margin: 0,
		"font-size": '10px',
		"border-radius": '50%'
	};
	//make this superscript a close button X
	newCloseDiv.attr('id',`close-div-${itemNum}`);
	newCloseDiv.addClass("close-btn");
	newCloseDiv.css(style);
	newCloseDiv.text('x');
	newBtn.append(newCloseDiv);
	//tracker
	itemNum++;
}

//pre-load gif buttons
for (var i=0; i < gifInitList.length; i++) {
	addButton(gifInitList[i]);	
}

//get user input and make button
$('#add-gif').click(function(event) {
	event.preventDefault();
	userInput = $('#gif-input').val().trim();
	//add new button
	addButton(userInput);

});

/* retrive                                          */
/* description: run ajax on queryurl                */
/* parameter:   offset - starting position on query */
function retrieve(offset) {
	if (str != null) {
	//setup url
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=98b0dc0aad1b49e5b25b2c7baf1c4ea5&limit=" + quantity + "&offset=" + offset;
	console.log(queryURL);
	$.ajax( {url: queryURL,
			method: 'GET'
		}).done(function(response) {
			//display rating and images
			showGifInfo(response);
		});

	}
}

//click event on new button
$('#gif-list').on('click', '.gif-button', function() {
	console.log($(this));	

	//format keyword string
	str = $(this)[0].textContent.slice(0, $(this)[0].textContent.length - 1);
	str =str.replace(/ /g, '+');
	//set offset
	offset = 0;
	retrieve(offset);
});

//click event on Show more
$('#more-btn').on('click', function() {
	offset += 12;
	retrieve(offset);
});

/* showGifInfo                                        */
/* description: show all gifs from giphy.com response */
function showGifInfo(respn) {
	console.log(respn);
	$('#gif-images').empty();
	$('#right-panel').empty();
	for (var i=0; i<respn.data.length; i++) {
		//create image block
		var imgBlock = $('<div>');	
		imgBlock.addClass('img-block');
		//display rating inside img block
		var ratingDiv = $('<div>');
		ratingDiv.text('rating: ' + respn.data[i].rating);
		imgBlock.append(ratingDiv);
		//display image inside img block
		var image = $('<img>');
		image.addClass('img-item');
		image.attr('id', `img-item-${i}`);
		image.attr('data-still', respn.data[i].images.fixed_height_small_still.url);
		image.attr('data-animate', respn.data[i].images.fixed_height_small.url);
		image.attr('data-still-large', respn.data[i].images.fixed_height_still.url);
		image.attr('data-animate-large', respn.data[i].images.fixed_height.url);
		image.attr('data-state', 'still');
		image.attr('src', image.attr('data-still'));

		imgBlock.append(image);
		$('#gif-images').append(imgBlock);
	}
}

var rightImg;
var tempImgId;
//onclick each image
$('#gif-images').on('click', '.img-item', function() {
	//console.log($(this));
	//toggle still and animate version
	if ($(this).attr('data-state') === 'still') {
		$(this).attr('data-state','animate');
		$(this).attr('src', $(this).attr('data-animate'));
		rightImg = $('<img>');
		rightImg.attr('id', 'large-img');
		console.log($(this));
		console.log($(this).attr('data-animate-large'));
		rightImg.attr('src', $(this).data('animate-large'));
		//display larger image on the right panel
		tempImgId = $(this);
		console.log(tempImgId);
		$('#right-panel').html(rightImg);
		//onclick in large gif to close it and set small one still
		$('#large-img').click(function() {
			tempImgId.attr('data-state','still');
			tempImgId.attr('src', tempImgId.attr('data-still'));
			$('#right-panel').empty();
 		});
	}
	else {
		$(this).attr('data-state','still');
		$(this).attr('src', $(this).attr('data-still'));
		$('#right-panel').empty();
	}
});

//on click close button
$('#gif-list').on('click', '.close-btn', function(event) {
	//prevent lower layer onclick event fired
	event.stopPropagation();
	console.log($(this));
	var parentDiv = $(this).parent();
	console.log(parentDiv);
	parentDiv.remove();

});


});//ready
