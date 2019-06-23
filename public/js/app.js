console.log("client side js file")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
      e.preventDefault()
        console.log('test')
        const location = search.value
        console.log(location)
        messageTwo.textContent = 'Loading...'
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.err)   {
        messageOne.textContent = data.err
        messageTwo.textContent = ''
        }
        else{
        messageTwo.textContent = 'Currently it is '+data.temperature+' Celcius ' 
        + 
        ''+data.summary+ 
        ' and chances of perception are '+data.precipProbability*100+'%'
        messageOne.textContent = ''


        //location ,temperature : data.temperature,summary : data.summary,precipProbability : data.precipProbability}


        }
    })
})
      
}) 