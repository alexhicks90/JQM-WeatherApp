$(document).on("pagebeforeshow", "#mainpage", function() {
	
	// get JSON data
	$.getJSON("torontoWeather.json", function (data) {
		console.log(data);
		
		var mapHidden = true;
		start = data.query.results.channel;
		
		// append logo and lastBuildDate text to header from json file
		$("#mainpage header").html("<img id='logo' src='" + start.image.url + "'>" +
									"<p>" + start.lastBuildDate + "</p>");
		
		// Add links to footer grid
		$("#aboutLink").html("<a href='#about' class='ui-btn ui-btn-icon-top ui-icon-about'>About Me</a>");
		$("#sheridanLink").html("<a href='https://www.sheridancollege.ca/' class='ui-btn ui-btn-icon-top ui-icon-sheridan'>Sheridan</a>");
		$("#nhlLink").html("<a href='https://www.nhl.com/' class='ui-btn ui-btn-icon-top ui-icon-nhl'>NHL</a>");
		
		// Add weather location information
		$("#weather").html("<h4>Weather for: " + start.location.city + ", " + start.location.region + ", " + start.location.country + "</h4>");
		
		// Add weather information for wind, atmosphere, and astronomy to appropriate panels
		$("#wind").html(		
			"<h2>Wind Statistics:</h2><br/>" + 
			"<h4>" + "Chill: " + start.wind.chill + "</h4>" +
			"<h4>" + "Direction: " + start.wind.direction + "</h4>" +
			"<h4>" + "Speed: " + start.wind.speed + " kph</h4>"
		);
		
		$("#atmosphere").html(		
			"<h2>Atmosphere Statistics:</h2><br/>" + 
			"<h4>" + "Humidity: " + start.atmosphere.humidity + "%</h4>" +
			"<h4>" + "Pressure: " + start.atmosphere.pressure + " mb</h4>" +
			"<h4>" + "Rising: " + start.atmosphere.rising + "</h4>" +
			"<h4>" + "Visibility: " + start.atmosphere.visibility + " km</h4>"
		);		
		
		$("#astronomy").html(		
			"<h2>Astronomy Statistics:</h2><br/>" + 
			"<h4>" + "Sunrise: " + start.astronomy.sunrise + "</h4>" +
			"<h4>" + "Sunset: " + start.astronomy.sunset + "</h4>"
		);	
		// END of weather info panel population
		


		//$("#map_canvas").hide();
		//$("#mapTitle").hide();
		$("#mapTitle").html(start.item.title);
		
		// hide map initially for 1st click
		if (mapHidden) {
			$("#map_canvas").hide();
			$("#mapTitle").hide();
		}
		
		
		$("#displayMap").click(function() {
					
			mapCenter = new google.maps.LatLng(start.item.lat, start.item.long);
			
			// set map options
			var mapOptions = {
				zoom: 18,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: mapCenter
			};
			
			// create map
			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			
			// set map location
			var myLoc = new google.maps.Marker ({
				map : map,
				position: mapCenter
			});
			
			$(window).on('resize', function() {
				var currCenter = map.getCenter();
				google.maps.event.trigger(map, 'resize');
				map.setCenter(currCenter);
			})
			
			// If map is hidden, show it. If map is not hidden, hide it.
			if (mapHidden) {
				$("#map_canvas").show();
				$("#mapTitle").show();
				mapHidden = false;
			}else {
				$("#map_canvas").hide();
				$("#mapTitle").hide();
				mapHidden = true;
			}
		});

	});
});

// script for Daily Weather page
$(document).on("pagebeforeshow", "#daily", function() {
	
	// get JSON data
	$.getJSON("torontoWeather.json", function (dailyData) {
		
		var forecasts = dailyData.query.results.channel.item.forecast;
		console.log(forecasts);
		
		// add header
		$("#daily header").html("<h2>Daily Weather Page</h2>");
		
		// loop through forecast array, pull all data from each forecast object 
		// into its own collapsible ui block
		for(var i = 0; i < forecasts.length; i++) {
			
			$('#' + i).remove();			
			
			$("#dailyGrid").append("<div data-role='collapsible' id='" + i + "'class='ui-block-" + 
				// assigns block a to 0 and even numbered divs, and block b to odd
				((i == 0 || i % 2 == 0) ? 'a': 'b') +
				"'data-collapsed-icon='carat-r'data-expanded-icon='carat-d'>" + 
				"<h4>" + forecasts[i].date + "</h4>" +
				"<p><strong>Day: </strong>" + forecasts[i].day + "</p>" +
				"<p><strong>High: </strong>" + forecasts[i].high + "</p>" +
				"<p><strong>Low: </strong>" + forecasts[i].low + "</p>" +
				"<p><strong>Text: </strong>" + forecasts[i].text + "</p>" +
				"</div>"
			);				
		}
		
		$("#dailyGrid").collapsibleset("refresh");		
	});
});

// Script for about page	
$(document).on("pagebeforeshow", "#about", function() {
	
	// get JSON data
	$.getJSON("hicksal.json", function (aboutData) {
		console.log(aboutData);
				
		aboutStart = aboutData.student;
		
		$("#about header").html("<h2>" + aboutStart.name + "</h2>");
		$("#aboutInfo").html("<p><strong>Student ID: </strong>" + aboutStart.id + "</p>" +
							"<p><strong>Program: </strong>" + aboutStart.program + "</p>" +
							"<p><strong>Quote: </strong>" + aboutStart.quote + "</p>");
		
		$("#aboutPic").html("<img src='" + aboutStart.image + "'>");
	});
});

// Script for Form page
$(document).on("pagebeforeshow", "#formpage", function() {
	
	$("#submit").click(function() {
		
		// Create variables for form elements
		var email = $("#email").val();
		var type = $("#commentType").val();
		var comments = $("textarea#comments").val();
		
		// Store variables in local storage
		localStorage.setItem("email", email);
		localStorage.setItem("type", type);
		localStorage.setItem("comments", comments);
		
		// write local storage info to submitted popup window
		$("#submitted").html("<h4>Data Successfully Saved.</h4>" + 
			"<p>Email: " + localStorage.getItem("email") + "</p>" +
			"<p>Comment Type: " + localStorage.getItem("type") + "</p>" +
			"<p>Comments: " + localStorage.getItem("comments") + "</p>"
		);
	});
	
	
	$("#last").click(function() {
		
		// write local storage info to submitted popup window
		$("#lastComment").html("<h4>Last Comment Information:</h4>" + 
			"<p>Email: " + localStorage.getItem("email") + "</p>" +
			"<p>Comment Type: " + localStorage.getItem("type") + "</p>" +
			"<p>Comments: " + localStorage.getItem("comments") + "</p>"
		);

	});

});