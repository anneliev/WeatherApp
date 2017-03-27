

const elem = {
	wetherToShow: document.getElementById("weatherToShow"), 
	currentBtn: document.getElementById("currentBtn"),
	forecastBtn: document.getElementById("forecastBtn"),
	sunriseBtn: document.getElementById("sunriseBtn"),
	displayArea: document.getElementById("displayArea")
};

const searchButtons = (function(){
	elem.currentBtn.addEventListener("click", function(){
		dataBase.getCurrent();
	});

	elem.forecastBtn.addEventListener("click", function(){
		dataBase.getForecast();
	});

	elem.sunriseBtn.addEventListener("click", function(){
		dataBase.getSunrise();
	});

});
searchButtons();

const dataBase = {
	getCurrent: () => {
		let searchValue = searchCurrent.value;
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";
		let api = "http://api.openweathermap.org/data/2.5/weather?q=";
		let info = api + searchValue + apiKey;
			
		$.get(info)
			.done((response) => {
				console.log("funkar");
				let theWeather = response;
				console.log(theWeather);
				let weatherToShow = `<li class="weatherDisplay">
				<h1>${theWeather.name}</h1><br />
				<img src="http://openweathermap.org/img/w/${theWeather.weather[0].icon}.png"></img><br /><br />
				<p>Weather: <strong>${theWeather.weather[0].main}</strong>, ${theWeather.weather[0].description}</p>
				<p>Temperature: ${parseFloat(theWeather.main.temp - 273.15).toFixed(1)} °C</p>
				</li>`;
				displayArea.innerHTML = weatherToShow;
			})
			.fail((error) => {
				console.log("funkar inte");
			});
		searchCurrent.value = "";
	},

	getForecast: () => {
		let searchValue = searchForecast.value;
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";
		let api = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
		let days = "&cnt=6";
		let info = api + searchValue + days + apiKey;
	
		$.get(info)
			.done((response) => {
				console.log("funkar");
				let theWeather = response;
				console.log(theWeather);

				displayArea.innerHTML = "";
			
				let city = `<li class="weatherDisplay">
				<h1>${theWeather.city.name}</h1><br />
				</li>`;
				displayArea.innerHTML = city;
				for(let i = 0; i < 6; i++){
					let wetherToShow = `<li class="weatherDisplay">
					<h4>${dataBase.dateConverter(theWeather.list[i + 1].dt)}</h4>
					<img src="http://openweathermap.org/img/w/${theWeather.list[i].weather[0].icon}.png"></img><br /><br />
					<p>Weather: <strong>${theWeather.list[i].weather[0].main}</strong>, ${theWeather.list[i].weather[0].description}</p>
					<p>Temperature: ${parseFloat(theWeather.list[i].temp.day - 273.15).toFixed(1)} °C</p>
					</li><br /><br />`;
					displayArea.innerHTML += wetherToShow;
				}
			})
			.fail((error) => {
				console.log("funkar inte");
			});
		searchForecast.value = "";
	},
		
	getSunrise: () => {
		let searchValue = searchSunrise.value;
		let apiKey = "&APPID=546212d0f83942c04cc3caec6ee321c9";
		let api = "http://api.openweathermap.org/data/2.5/weather?q=";
		let info = api + searchValue + apiKey;

		$.get(info)
			.done((response) => {
				console.log("funkar");
				let theWeather = response;
				console.log(theWeather);
				let weatherToShow = `<li class="weatherDisplay">
				<h1>${theWeather.name}</h1>
				<h4>${dataBase.dateConverter(theWeather.sys.sunrise)}</h4><br />
				<img src="http://openweathermap.org/img/w/01d.png"></img>
				<p><strong>Sunrise: </strong>${dataBase.timeConverter(theWeather.sys.sunrise)}</p><br />
				<img src="http://openweathermap.org/img/w/01n.png"></img>
				<p><strong>Sunset: </strong>${dataBase.timeConverter(theWeather.sys.sunset)}</p>
				</li>`;
				displayArea.innerHTML = weatherToShow;
			})
			.fail((error) => {
				console.log("funkar inte");
			});
		searchSunrise.value = "";
	},

	timeConverter: (unixTime) => {
		let time = new Date(unixTime * 1000);
		let hour = time.getHours();
		let min = time.getMinutes();
		let convertedTime = `${hour}:${min}`;
		return convertedTime;
	},

	dateConverter: (unixTime) => {
		let time = new Date(unixTime * 1000);
		let date = time.getDate();
		let month = time.getMonth() + 1;
		let convertedTime = `${date}/${month}`;
		return convertedTime;
	},


};




//fixa loadsymbol
//fixa success och error hantering


/*
$.get(info, (response) => {
			let theWeather = response;
			console.log(theWeather);
			displayArea.innerHTML = "";
			
			let city = `<li class="weatherDisplay">
			<h1>${theWeather.city.name}</h1><br />
			</li>`;
			displayArea.innerHTML = city;
			for(let i = 0; i < 6; i++){
				let wetherToShow = `<li class="weatherDisplay">
				<h4>${dataBase.dateConverter(theWeather.list[i + 1].dt)}</h4>
				<img src="http://openweathermap.org/img/w/${theWeather.list[i].weather[0].icon}.png"></img><br /><br />
				<p>Weather: <strong>${theWeather.list[i].weather[0].main}</strong>, ${theWeather.list[i].weather[0].description}</p>
				<p>Temperature: ${parseFloat(theWeather.list[i].temp.day - 273.15).toFixed(1)} °C</p>
				</li><br /><br />`;
				displayArea.innerHTML += wetherToShow;
			}
		

		});
		searchForecast.value = "";
	},

	*/