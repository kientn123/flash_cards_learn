$(function() {		
		$('.artGroup.flip').hover(
			function () {
				$(this).find('.artwork').addClass('theFlip');
			},
			function () {
				$(this).find('.artwork').removeClass('theFlip');			
			}
		);
});
