    var owl = $("#owl-gallery");
    owl.owlCarousel({
    	itemsCustom : [
    	[0, 1],
    	[450, 1],
    	[600, 1],
    	[700, 1],
    	[1000, 2],
    	[1200, 3],
    	[1400, 3],
    	[1600, 3]
    	],
    	navigation : true,
    	pagination : true,
    	afterInit : function(elem){
    		var that = this
    		that.owlControls.prependTo(elem)
    	}
    });



    $(document).ready(function() {
    	var $lightbox = $('#lightbox');
    	
    	$('[data-target="#lightbox"]').on('click', function(event) {
    		var $img = $(this).find('img'), 
    		src = $img.attr('src'),
    		alt = $img.attr('alt'),
    		css = {
    			'maxWidth': $(window).width() - 100,
    			'maxHeight': $(window).height() - 100
    		};
    		
    		$lightbox.find('.close').addClass('hidden');
    		$lightbox.find('img').attr('src', src);
    		$lightbox.find('img').attr('alt', alt);
    		$lightbox.find('img').css(css);
    	});
    	
    	$lightbox.on('shown.bs.modal', function (e) {
    		var $img = $lightbox.find('img');
    		
    		$lightbox.find('.modal-dialog').css({'width': $img.width()});
    		$lightbox.find('.close').removeClass('hidden');
    	});
    });