$(document).ready(function( ){
	$("button#start").on( "click", function(e) {
		$.ajax({
			type: "GET",
			url: "photoCollection.xml",
			dataType: "xml",
			success: function(xml){
				var $images = xml.getElementsByTagName("image"),
						count = 0,
						site,
						url,
						caption,
						name;
				$.each($images, function() {
					site = $(this).find("site").text();
					url = $(this).find("url").text();
					caption = $(this).find("caption").text();
					name = $(this).find("name").text();
					console.log(site);
					if (String($('button#start').data('site')) === String(site)) { //$('button#start').data('site') == site
						if (count==0) {
							$('#image-carousel1 .carousel-indicators').append('<li data-target="#image-carousel1" data-slide-to="0" class="active"></li>');
							$('#image-carousel1 .carousel-inner').append('<div class="item active"><img src="'+url+'" alt="Image '+count+'"><div class="carousel-caption"><h4>'+name+'</h4></div></div>');
							
							$('#image-carousel2 .carousel-indicators').append('<li data-target="#image-carousel2" data-slide-to="0" class="active"></li>');
							$('#image-carousel2 .carousel-inner').append('<div class="item active"><img src="'+url+'" alt="Image '+count+'"><div class="carousel-caption"><h4>'+name+'</h4></div></div>');
							}
						else {
							$('#image-carousel1 .carousel-indicators').append('<li data-target="#image-carousel" data-slide-to="'+count+'"></li>');
							$('#image-carousel1 .carousel-inner').append('<div class="item"><img src="'+url+'" alt="Image '+count+'"><div class="carousel-caption"><h4>'+name+'</h4></div></div>');
							
							$('#image-carousel2 .carousel-indicators').append('<li data-target="#image-carousel2" data-slide-to="'+count+'"></li>');
							$('#image-carousel2 .carousel-inner').append('<div class="item"><img src="'+url+'" alt="Image '+count+'"><div class="carousel-caption"><h4>'+name+'</h4></div></div>');
						}
						count++;
					}
				});
			}
		});
	});
	
	// Reset the carousel(s) in the modal once the modal closed
	$("#imageModal").on("hidden.bs.modal", function(){
		$('#image-carousel1').carousel('pause');
		$('#image-carousel2').carousel('pause');
		$('#image-carousel1').hide();
		$('#image-carousel2').hide();
		$('#image-carousel1').removeClass('col-xs-6');
		$('#image-carousel2').removeClass('col-xs-6');
		$('.modal-dialog').removeClass('dual');
		$('#collapseGlyph').addClass('hidden');
		$('#expandGlyph').removeClass('hidden');
		$(".carousel-indicators").empty();
		$(".carousel-inner").empty();
	});
	
	// Only show the carousel when the modal is shown
	$('#imageModal').on('show.bs.modal', function(){
		$('#image-carousel1').show();
		$('#image-carousel1').carousel({interval: 4000});	// Set the carousel interval here (in milliseconds).  The second carousel is set to not auto-rotate
	});
	
	// Pause button for the initial carousel
	$('#pauseGlyph').click(function(){
		$('#image-carousel1').carousel('pause');
	});
	
	// Play button for the intial carousel (automatically increments to next slide)
	$('#playGlyph').click(function(){
		$('#image-carousel1').carousel('next');
		$('#image-carousel1').carousel('cycle');
	});
	
	// Enable dual photo viewer (changes the appearance of the modal so carousels are always side-by-side by adding the dual class which sets the width to 95% of the screen)
	$('#expandGlyph').click(function(){
		$(this).addClass('hidden');
		$('#collapseGlyph').removeClass('hidden');
		$('#image-carousel1').addClass('col-xs-6');
		$('#image-carousel2').addClass('col-xs-6');
		$('.modal-dialog').addClass('dual');
		$('#image-carousel2').show();
	});
	
	// Disables dual photo viewer
	$('#collapseGlyph').click(function(){
		$(this).addClass('hidden');
		$('#expandGlyph').removeClass('hidden');
		$('#image-carousel1').removeClass('col-xs-6');
		$('#image-carousel2').removeClass('col-xs-6');
		$('.modal-dialog').removeClass('dual');
		$('#image-carousel2').hide();
	});
});