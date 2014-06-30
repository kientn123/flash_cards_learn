$(function() {
	var dataJSON = "";
	$("#sidebar").accordion({heightStyle: "content"});
	//$("#deck-list").accordion();	
	var fb = new Firebase("https://flashcardlearn.firebaseio.com/");
	$("#deck-name-click").click(function() {
		var nameofdeck = $('#deck-name').val();
		fb.child(nameofdeck).set({card0:{front: "example", back: "example1"} });
		
	});
	fb.on('value', function(data) {
		if (data.val() === null) {
			alert('FB has some problems');
		}
		else {
			dataJSON = data.val();
			var output = '<ul class="searchresults">';
			$.each(dataJSON, function(key, value) {
				output += "<li>"+key+ "<span class='glyphicon glyphicon-remove'></span>"+"</li>";
			});
			output += "</ul>";
			$("#list").html(output);
		}
	});
	$('body').on('click', '.glyphicon-remove', function() {
		var text1 = $(this).parent().text();
		fb.child(text1).remove();
	});
	
	$('body').on('click', "#list ul li", function(event) {
		var text1 = $(this).text();
		updateCard(dataJSON, text1);
	});
	
	$('body').on('click', '.newCard', function(event) {
		var text1 = $("#nameOfDeck").text();
		var frontie = $('.fronttext').val();
		var backtie = $('.backtext').val();
		fb.child(text1).push({front: frontie, back: backtie});
		updateCard(dataJSON, text1);
	});
	
	$('body').on('click', '.remove', function() {
		var text1 = $("#nameOfDeck").text();
		var frontie = $(this).parent().find(".front").text();
		$(this).parent().remove();
		//fb.child(text1).remove(frontie);
		var cardID = '';
		$.each(dataJSON, function(key, value) {
			if (key === text1) {	
				$.each(value, function(key1, value1) {
					if (value1.front === frontie) {
						cardID = key1;
						fb.child(text1).child(cardID).remove();
					}
				});
			}
		});
	});
	$('body').on('click', '.test', function() {
		var text1 = $("#nameOfDeck").text();
		updateTest(dataJSON, text1);
	});
	
	$('body').on('click', '.answer', function() {
		var text1 = $('#nameOfDeck').text();
		$('.float-div').css({display: 'block'});
		$('.x').css({display: 'block'});

		$('body').on('click', '.x', function() {
			$('.float-div').css({display: 'none'});
			$('.x').css({display: 'none'});
		});
		var frontie = $(this).parent().find('.front').text();
		console.log(frontie);
		$('#google').bind('webkitspeechchange', function() {
			var answerinput = $('#google').val();
			console.log(answerinput);
			if (answerinput != '') {
				if (answerinput.toLowerCase() === frontie.toLowerCase()) {
					$('body').find('.x').click();
					alert("You're right");	
				}
				else {
					$('body').find('.float-div').append('<p>Answer again</p>');
				}
			}
		});
	});
});


function updateCard(data, text) {
	$.each(data, function(key, value) {
		if (key === text) {
			output = "<h2 id='nameOfDeck'>"+text+"</h2>" + "<div>Add new Card\
						<input type='text' class='fronttext' placeholder='front'>\
						<input type='text' class='backtext' placeholder='back'>\
						<button type='button' class='newCard'>Click</button></div>\
						<button type='button' class='test'>Test</button>";
			output += "<div class='row card-collection'>";
			$.each(value, function(key1, value1) {
				if (key1 != 'card0') {
					output += "<div class='col-md-6 col-sm-6 col-xs-6 artGroup flip'>\
						<div class='artwork'>\
							<div class='front'>"+ value1.front +"</div>\
							<div class='back'>"+ value1.back + "</div>\
						</div> <button type='button' class='remove'>remove</button>\
					</div>";
				}
				
			});
			output += "</div>";
			$("#content").html(output);
		}
	});
	$('.artGroup.flip').hover(
		function () {
			$(this).find('.artwork').addClass('theFlip');
		},
		function () {
			$(this).find('.artwork').removeClass('theFlip');			
		}
	);
}


function updateTest(data, text) {
	$.each(data, function(key, value) {
		if (key === text) {
			output = "<h2 id='nameOfDeck'>"+text+"</h2>";
			output += "<div class='row card-collection'>";
			$.each(value, function(key1, value1) {
				if (key1 != 'card0') {
					output += "<div class='col-md-6 col-sm-6 col-xs-6 artGroup flip'>\
						<div class='artwork'>\
							<div class='front'>"+ value1.front +"</div>\
							<div class='back'>"+ value1.back + "</div>\
						</div> <button type='button' class='answer'>answer</button>\
					</div>";
				}
				
				
			});
			output += "</div>";
			$("#content").html(output);
			$('.artGroup.flip').find('.artwork').addClass('theFlip');
		}
	});
	/*$('.artGroup.flip').hover(
		function () {
			$(this).find('.artwork').addClass('theFlip');
		},
		function () {
			$(this).find('.artwork').removeClass('theFlip');			
		}
	);*/
} 




