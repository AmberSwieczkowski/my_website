$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.comment__box').val();
		$('<div>').text(comment).prependTo('#testimonial');
		$('button').attr('disabled', 'true');
		$('.character__counter').text('140');
		$('.comment__box').val('');
	});
	
	$('.comment__box').keyup(function() {
		var commentLength = $(this).val().length;
		var charLeft =  140 - commentLength;
		$('.character__counter').text(charLeft);
		
		if (commentLength == 0) {
			$('button').attr('disabled', 'true');
		}
		else if (commentLength > 140) {
			$('button').attr('disabled', 'true');
		}
		else {
			$('button').removeAttr('disabled', 'true');
		}
	});
	
	$('button').attr('disabled', 'true');
	
});