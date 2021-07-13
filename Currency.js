const fetch = require('node-fetch');

module.exports = (client, channel, words, check) => {
   const currencyCommand = '!cena'
   if (check && words[0] === currencyCommand) {
      console.log('in', delay)
   
      let cy1 = words[1]
      let cy2 = words[2]
   
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cy1}/${cy2}.json`)
         .then(response => response.json())
         .then((data) => {
            delay = true

            if (data[cy2] !== undefined) {
               client.say(channel, `${cy1} - ${cy2} | ${Math.round((data[cy2] + Number.EPSILON) * 100) / 100}`)
            } else {
               client.say(channel, `${currencyCommand} waluta1 waluta2`)
            }
            
        }).catch((err) => {
          client.say(channel, `error  ${currencyCommand} waluta1 waluta2`)
          console.log('Fetch Error', err);
        })
      
   }

}