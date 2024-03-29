console.log('Welcome to Java Script')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Rendering'
// messageTwo.textContent = '[]'
weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    console.log(location)
  

    
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''


        fetch('/weather?address=' + location).then((response) => {
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else{
            console.log(data.location)
            messageOne.textContent = data.location
            console.log(data.forecast)
            messageTwo.textContent = data.forecast
        }

    })

})
    

})