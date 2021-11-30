/* Testimonial Container Display */

$('button').on('click', function() {
	$('#new__testimonial__container').show();
})

$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.comment__box').val();
		var user_name = $('.name__box').val();
		var empty = '';
		$('#name').text(empty);
		$('#testimonial').text(empty);
		$('<div>').text(user_name).appendTo('#name');
		$('<div>').text(comment).appendTo('#testimonial');
		$('button').attr('disabled', 'true');
		$('.character__counter').text('400');
		$('.name__box').val('');
		$('.comment__box').val('');
	});
	
	$('.comment__box, .name__box').keyup(function() {
		var commentLength = $('.comment__box').val().length;
		var nameLength = $('.name__box').val().length;
		var charLeft =  400 - commentLength;
		$('.character__counter').text(charLeft);
		
		if (commentLength == 0 || nameLength == 0) {
			$('button').attr('disabled', 'true');
		}
		else if (commentLength > 400) {
			$('button').attr('disabled', 'true');
		}
		else {
			$('button').removeAttr('disabled', 'true');
		}
	});
	
	$('button').attr('disabled', 'true');
	
});


/* Rating Display */
$('button').on('click', function() {
	$('.new__rating').show();
})