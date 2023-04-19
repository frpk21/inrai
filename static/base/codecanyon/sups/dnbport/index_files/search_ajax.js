$(document).ready(function() {
	// On Search Submit and Get Results
	function search() {
		var query_value = $('input#search').val();
		$('b#search-string').text(query_value);
		if(query_value !== ''){
			$.ajax({
				type: "POST",
				url: "lib/search.php",
				data: { query: query_value },
				cache: false,
				success: function(html){
					$("ul#results").html(html);
				}
			});
		}return false;
	}

	function hideMenu(e) {

	}

	$("input#search").on("keyup", function(e) {
		clearTimeout($.data(this, 'timer'));
		var search_string = $(this).val();
		if (search_string == '') {
			$("ul#results").fadeOut(250);
		}else{
			$("ul#results").fadeIn(250);
			$(this).data('timer', setTimeout(search, 100));
		}
	});

	$(document).click(function(e){
		if (!$(e.target).closest('#results').length) {
			$("ul#results").fadeOut(250);
		}
	})

});
