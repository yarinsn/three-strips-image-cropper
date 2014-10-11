	function readURL(input) {
		if (input.files && input.files[0]) {	
			var result = $("#result-img");
			result.html("");
			
			var reader = new FileReader();

			reader.onload = function (e) {
				var image = new Image();
				image.src = e.target.result;
				
				image.onload = function() {
					var width = this.width;
					var height = this.height;
					
					$('#img')
						.attr('src', e.target.result)
						.width(width)
						.height(height);
				}
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	function getImage(){
	
		var result = $("#result-img");
		result.html("");
		
		var img = $("#img");
		img[0].src = $("#url").val();
	};
	
	function cropImage(){
		var width = $('#img').width();
		var height = $('#img').height();
		var src = $('#img')[0].src;
		
		var topHeight = $('#draggable-top').height();
		var offsetTop = $('#draggable-top').position().top;
		var middleHeight = $('#draggable-middle').height();
		var offsetMid = $('#draggable-middle').position().top;
		var bottomHeight = $('#draggable-bottom').height();
		var offsetBot = $('#draggable-bottom').position().top;
		
		var totalHeight = topHeight + middleHeight + bottomHeight;
		
		var result = $("#result-img");
		result.html("");
		result.append('<canvas id="res-canvas" style="border:1px solid #000000;"></canvas>');
		
		var canvas = $('#res-canvas')[0];
		init_canvas(canvas, width, totalHeight);
		
		var context = canvas.getContext('2d');
		add_to_canvas(context, src, width, topHeight, 0, offsetTop, 0, 0); //top
		add_to_canvas(context, src, width, middleHeight, 0, offsetMid, 0, topHeight); //middle
		add_to_canvas(context, src, width, bottomHeight, 0, offsetBot, 0, topHeight+middleHeight); //middle		
	};
	
	function init_canvas(canvas, width, height) {
		canvas.width = width;
		canvas.height = height;
	};
	
	function add_to_canvas(context, src, sourceWidth, sourceHeight, sourceX, sourceY, destX, destY) {
		var strip = new Image();
		
		strip.onload = function() {
			context.drawImage(strip, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, sourceWidth, sourceHeight);
		}
		
		strip.src = src;
	};
	
	$('#img').load(function () {
		var width = $(this).width();
		var height = $(this).height();
		
		var container = $("#container");
		container.width(width);
		container.height(height);
		container.append('<div id="draggable-top">Top</div>');
		container.append('<div id="draggable-middle">Middle</div>');
		container.append('<div id="draggable-bottom">Bottom</div>');	
		
		var lh = height / 2;
		$('#draggable-middle').css('bottom', lh + 'px');
		
		$('#draggable-top').css('width', width + 'px');
		$('#draggable-middle').css('width', width + 'px');
		$('#draggable-bottom').css('width', width + 'px');
		
		$( "#draggable-top" ).resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	
		$( "#draggable-middle" ).resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	
		$( "#draggable-bottom" ).resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	});