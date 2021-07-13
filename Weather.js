const fetch = require('node-fetch');

module.exports = (client, channel, words, check, userMsg) => {
   const weatherCommand = '!pogoda'
   
   if (check && words[0] === weatherCommand) {

      const city = userMsg.substring(weatherCommand.length + 1).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('ł', 'l')
     
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${process.env.TWITCH_WEATHERAPIKEY}`
      
      fetch(weatherUrl).then(response => response.json()).then(data => {
         delay = true
         if (data !== undefined) {

            let currentIcon = ''
            const iconCode = data.weather[0].icon

            //set icon
            if (iconCode === '01d' || iconCode === '01n') {
               currentIcon = '☀️'
            } else if (iconCode === '02d' || iconCode === '02n') {
               currentIcon = '⛅️'
            } else if (iconCode === '03d' || iconCode === '03n' || iconCode === '04d' || iconCode === '04n') {
               currentIcon = '☁️'
            } else if (iconCode === '09d' || iconCode === '09n') {
               currentIcon = '🌧️'
            } else if (iconCode === '10d' || iconCode === '10n') {
               currentIcon = '🌦️'
            } else if (iconCode === '11d' || iconCode === '11n') {
               currentIcon = '🌩️'
            }else if (iconCode === '13d' || iconCode === '13n') {
               currentIcon = '❄️'
            } else if (iconCode === '50d' || iconCode === '50n') {
               currentIcon = '🌫️'
            }
            //

            client.say(channel, `${data.name}: ${Math.round(data.main.temp)} °C  ${currentIcon}`)
       
          }
         }).catch((err) => {
            client.say(channel, `error  ${weatherCommand} miasto`)
            console.log('Fetch Error', err);
         })
      

   }
}