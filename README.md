# Weather App

By: Annelie Viklund  
Studying: Front-end developer (2016 - 2018) at Nackademin  
Current course: JavaScript2  
Links to project: [Live version](https://anneliev.github.io/WeatherApp/)  [Code](https://github.com/anneliev/WeatherApp)  

---

We got an assignment in the JavaScript course to make an application that gets data from an API. I have made a weather application that has three features. The user can choose to see the weather for today, get a 5 days forecast or see at what time the sun rises and sets. I used the framework Bootstrap for styling the page.

Technologies I've used:

  - JavaScript ES6
  - HTML5
  - Bootstrap
  - CSS
  - jQuery
  - AJAX

The API I used is from http://openweathermap.org/api. I have made GET requests from 2 of them, the Current weather data and 16 day / daily forecast. From [Current weather data](http://openweathermap.org/current) I got the data used for todays weather and sunrise/sunset. From [16 day / daily forecast](http://openweathermap.org/forecast16) I got the data used for the 5 days forecast. There is an API for 5 days forecast, but that also shows a 3 hour forecast, which I didn't want to use. I just wanted the information about the daily weather.

I started the project by writing a basic psuedo code / checklist of what my application should do. After that I looked around for a Bootstrap example which would fit my needs, I chose the carousel. I downloaded som pictures to go with the theme of the application. 
Then I started writng JavaScript code. I worked with namespaces and patterns, tried to keep my functions simple, logicly named and separated. When he basic functions worked properly I added a success/error condition to the AJAX requests and a loading symbol. (Un)fortunatly the page loads very quickly on my computer so I don't get to see the loading symbol.  

Features that could be added to the application:
  - A map that shows the chosen city
  - Historical weather of a loaction
  - UV index
  - When the weather of the chosen city is shown, buttons could be appended with the other criterias, so that the user doesn't have to redo the search if they want for example the sunrise/sunset of the same city

Features that could be improved:
 - The placement of the symbol could be improved to be the only thing showing on the page while the data is getting loaded.