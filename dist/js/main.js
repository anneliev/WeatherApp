//storing HTML elements using Object literal to be albe to call them and to have them in the same namespace
const elem = {
	wetherToShow: document.getElementById("weatherToShow"), 
	currentBtn: document.getElementById("currentBtn"),
	forecastBtn: document.getElementById("forecastBtn"),
	sunriseBtn: document.getElementById("sunriseBtn"),
	displayArea: document.getElementById("displayArea"),
	loadsymbol: document.getElementById("loadsymbol"),
	btn: document.getElementsByClassName("btn")
};

//Module pattern using IIFE with event listeners on the buttons on HTML page. Calling functions when clicked on
const searchButtons = (function(){
	elem.currentBtn.addEventListener("click", function(){
		weatherFunctions.getCurrent();//calling the function contianing the data and AJAX request
		$('html, body').animate({//jQuery scroll function to smoothly scroll to the display area
      		scrollTop: $("#displayArea").offset().top
    	}, 600);
	});

	elem.forecastBtn.addEventListener("click", function(){
		weatherFunctions.getForecast();
		$('html, body').animate({
      		scrollTop: $("#displayArea").offset().top
    	}, 600);
	});

	elem.sunriseBtn.addEventListener("click", function(){
		weatherFunctions.getSunrise();
		$('html, body').animate({
      		scrollTop: $("#displayArea").offset().top
    	}, 600);
	});

});
searchButtons();//calling the function holdning the buttons



const weatherFunctions = {//Object literl holdning the functions that are being called by searchButtons
	getCurrent: () => {
		let searchValue = searchCurrent.value;//user input value in search box
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";//variable holding the APIkey
		let api = "http://api.openweathermap.org/data/2.5/weather?q=";//the url to the API
		let info = api + searchValue + apiKey;//variable with the vaiables combined, used later as an argument
		utilityFunctions.show();//calling the function with the loading symbol

		$.get(info)//AJAX GET request with an arugument
			.done((response) => {//if data is successfully loaded
				console.log("Successfully loaded data");
				let weatherToShow = displayFunctions.current(response);//calling a function that uses the argument to display request
				utilityFunctions.hide();//calling the function that hides the loading symbol, after the request is done
				displayArea.innerHTML = weatherToShow;//dispalying the data on HTML page)
			})
			.fail((error) => {//if data isn't successfully loaded, an alert with error message
				alert ("Error. The requested data couldn't load. Type the name of a city in the search box or try to temporarily allow unsecure script on this page.");
				utilityFunctions.hide();//calling the function that hides the loading symbol, after the request is done
			});
		searchCurrent.value = "";//clearing the search box
	},

	getForecast: () => {
		let searchValue = searchForecast.value;
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";
		let api = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
		let days = "&cnt=6";
		let info = api + searchValue + days + apiKey;
		utilityFunctions.show();
	
		$.get(info)
			.done((response) => {
				console.log("Successfully loaded data");
				let weatherToShow = displayFunctions.forecast(response);
				utilityFunctions.hide();
				displayArea.innerHTML += weatherToShow;
			})
			.fail((error) => {
				alert ("The requested data couldn't load. Type the name of a city in the search box or try to temporarily allow unsecure script on this page.");
				utilityFunctions.hide();
			});
		searchForecast.value = "";
	},
		
	getSunrise: () => {
		let searchValue = searchSunrise.value;
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";
		let api = "http://api.openweathermap.org/data/2.5/weather?q=";
		let info = api + searchValue + apiKey;
		utilityFunctions.show();

		$.get(info)
			.done((response) => {
				console.log("Successfully loaded data");
				let weatherToShow = displayFunctions.sunrise(response);
				utilityFunctions.hide();
				displayArea.innerHTML = weatherToShow;
			})
			.fail((error) => {
				alert ("The requested data couldn't load. Type the name of a city in the search box or try to temporarily allow unsecure script on this page.");
				utilityFunctions.hide();
			});
		searchSunrise.value = "";
	}
};

const displayFunctions = {//object literal holdning display functions
	current: (response) => {
		let theWeather = response;
		//template literal used to display the AJAX request on the HTML page
		let weatherToShow = `<li class="weatherDisplay">
			<h1>${theWeather.name}</h1>
			<h4>${utilityFunctions.dateConverter(theWeather.dt)}</h4><br />
			<img src="https://openweathermap.org/img/w/${theWeather.weather[0].icon}.png"></img><br /><br />
			<p>Weather: <strong>${theWeather.weather[0].main}</strong>, ${theWeather.weather[0].description}</p>
			<p>Temperature: ${parseFloat(theWeather.main.temp - 273.15).toFixed(1)} °C</p>
			</li>`;
		return weatherToShow;
	},

	forecast: (response) => {
		let theWeather = response;
		let city = `<li class="weatherDisplay">
		<h1>${theWeather.city.name}</h1><br />
		</li>`;
		displayArea.innerHTML = city;
		let weatherToShow = [];//array to hold propertys from for loop
		for(let i = 0; i < 5; i++){//a loop that goes thru 5 index in the array that is requested.
			//a function is called to convert the date in the object, from unix numbers
			let weather = `<li class="weatherDisplay">
				<h4>${utilityFunctions.dateConverter(theWeather.list[i + 1].dt)}</h4>
				<img src="https://openweathermap.org/img/w/${theWeather.list[i].weather[0].icon}.png"></img><br /><br />
				<p>Weather: <strong>${theWeather.list[i].weather[0].main}</strong>, ${theWeather.list[i].weather[0].description}</p>
				<p>Temperature: ${parseFloat(theWeather.list[i].temp.day - 273.15).toFixed(1)} °C</p>
			</li><br /><br />`;
			weatherToShow.push(weather);
		}	
		return weatherToShow;	
	},

	sunrise: (response) => {
		let theWeather = response;
		let weatherToShow = `<li class="weatherDisplay">
			<h1>${theWeather.name}</h1>
			<h4>${utilityFunctions.dateConverter(theWeather.sys.sunrise)}</h4><br />
			<img src="https://openweathermap.org/img/w/01d.png"></img>
			<p><strong>Sunrise: </strong>${utilityFunctions.timeConverter(theWeather.sys.sunrise)}</p><br />
			<img src="https://openweathermap.org/img/w/01n.png"></img>
			<p><strong>Sunset: </strong>${utilityFunctions.timeConverter(theWeather.sys.sunset)}</p>
		</li>`;
		return weatherToShow;
	}
};

const utilityFunctions = {//object literal holdning utility functions


	timeConverter: (unixTime) => {//converts time from unix format
		let time = new Date(unixTime * 1000);
		let hour = time.getHours();
		let min = time.getMinutes();
		let convertedTime = `${hour}:${min}`;
		return convertedTime;
	},

	dateConverter: (unixTime) => {//converts date from unix format
		let time = new Date(unixTime * 1000);
		let date = time.getDate();
		let month = time.getMonth() + 1;
		let convertedTime = `${date}/${month}`;
		return convertedTime;
	},

	show: () => {//shows the loading symbol
		elem.loadsymbol.style.display = "block";
		//alert("loading");
	},

	hide: () => {//hides the loading symbol
		//alert("done loading");
		elem.loadsymbol.style.display = "none";
	}
};

