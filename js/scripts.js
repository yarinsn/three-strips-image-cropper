	function getLocalImage(input) {
		if (input.files && input.files[0]) {	
			var reader = new FileReader();

			reader.onload = function (e) {
				var src = e.target.result;
				initEditor(src);
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	function getImageFromUrl(){
		var src = $("#url").val();
		initEditor(src);
	};
	
	function initEditor(src) {
		clearResultArea();
		
		var editor = $("#editor");
		editor.html("");
		editor.append('<div id="img-container"><img id="img" src=""/></div>');
		
		var image = new Image();
		image.src = src;
		
		image.onload = function() {
			on_image_load(this);
			
			$('#img')
				.attr('src', this.src)
				.width(this.width)
				.height(this.height);
		};
	}
	
	function clearResultArea() {
		var result = $("#result-img");
		result.html("");
		result.append('<canvas id="res-canvas" style="border:1px solid #000000; display:none;"></canvas>');
	}
	
	function cropImage(){
		var width = $('#img').width();
		var src = $('#img')[0].src;
		
		var topHeight = $('#draggable-top').height();
		var offsetTop = $('#draggable-top').position().top;
		var middleHeight = $('#draggable-middle').height();
		var offsetMid = $('#draggable-middle').position().top;
		var bottomHeight = $('#draggable-bottom').height();
		var offsetBot = $('#draggable-bottom').position().top;
		
		var totalHeight = topHeight + middleHeight + bottomHeight;
		
		clearResultArea();
		$('#res-canvas').css('display', 'initial');
		
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
	
	on_image_load = function (e) {
		var width = e.width;
		var height = e.height;
		
		var editor = $("#editor");
		editor.width(width);
		editor.height(height);
		editor.append('<div id="draggable-top">Top</div><div id="draggable-middle">Middle</div><div id="draggable-bottom">Bottom</div>');
		
		var top = $('#draggable-top');
		var middle = $('#draggable-middle');
		var bottom = $('#draggable-bottom');
		
		middle.css('bottom', height / 2 + 'px');
		
		top.css('width', width + 'px');
		middle.css('width', width + 'px');
		bottom.css('width', width + 'px');
		
		top.resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	
		middle.resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	
		bottom.resizable({
			 maxHeight: height,
			 maxWidth: width,
			 minHeight: 20,
			 minWidth: width,
		}).draggable({ axis: "y", containment: "parent" });
	};