$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.comment__box').val();
		$('<li>').text(comment).prependTo('.comments');
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

function post_testimonial() {
	var new__testimonial = document.createElement("P");
	new__testimonial.className = "testimonial__container testimonial right";
	new__testimonial.innerHTML = "This is a paragraph.";
	document.getElementById("testimonial__container").appendChild(new__testimonial);
  }