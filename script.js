$(document).ready(function() { 
  if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(function(position) {   
    var lat = Math.round(position.coords.latitude * 100) / 100;
    var long = Math.round(position.coords.longitude * 100) / 100;
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(json) {
      $("#current-location").html(json.name);
      $("#current-country").html(json.sys.country);
      
      if(json.weather[0].description === "few clouds") {
        json.weather[0].description = "partly cloudy";
      }
      
      currentWeather = json.weather[0].description.split(" ");
      
      for (var i = 0; i < currentWeather.length; i++) {
        currentWeather[i] = currentWeather[i].charAt(0).toUpperCase() + currentWeather[i].slice(1);
      }
      
      currentWeather = currentWeather.join(" ");
      
      $("#current-weather").html(currentWeather);
      $("#weather-icon").html("<img src='" + json.weather[0].icon + "'>"); 
      
      $("#current-temp-cel").html(json.main.temp + "&deg;C");
      $("#current-temp-far").html(Math.round(json.main.temp * 1.8 + 32) + "&deg;F");
      
      $("#current-temp-far").on("click", function() {
        $("#current-temp-far").toggle(350);
        $("#current-temp-cel").toggle(350);
      });
      
      $("#current-temp-cel").on("click", function() {
        $("#current-temp-cel").toggle(350);
        $("#current-temp-far").toggle(350);
      });
      
    });
  });  
  }
});
