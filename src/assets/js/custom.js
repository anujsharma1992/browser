$(document).ready(function(){
	$(".dd-details").click(function(){
		$(this).parent().next(".dd-detailsbox").toggle( 1000);
	});
});

$(document).ready(function(){
	$(".cross-closed").click(function(){
		$(this).parent(".dd-detailsbox").hide( 1000);
	});
});