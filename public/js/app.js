const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')
const unitsButton = document.querySelector('#units-btn')

msg1.textContent = ''
msg2.textContent = ''
msg3.textContent = ''

unitsButton.textContent = 'View temperature in Celsius'

//todo: invalid input after valid input shows last data on viewing celsius/F

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Click')
    let flag = false
    unitsButton.textContent = 'View temperature in Celsius'
    // let listenerFlag = false

    const location = searchTerm.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    // console.log(location)
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                msg2.textContent = ''
                msg3.textContent = ''
                // if (listenerFlag) {
                //     unitsButton.removeEventListener('click')
                //     listenerFlag = false
                // }
            }
            else {
                msg1.textContent = 'Location: ' + data.location
                msg2.textContent = 'Current temperature: ' + data.forecast.temperature + ' F'
                msg3.textContent = 'Description: ' + data.forecast.weatherDesc

                unitsButton.addEventListener('click', (e) => {
                    // listenerFlag = true
                    console.log('Unit btn clicked')
                    if (flag === false) {
                        flag = true
                        unitsButton.textContent = 'View temperature in Fahrenheits'
                        msg2.textContent = 'Current temperature: ' + data.tempC + ' C'
                    }
                    else {
                        flag = false
                        unitsButton.textContent = 'View temperature in Celsius'
                        msg2.textContent = 'Current temperature: ' + data.forecast.temperature + ' F'
                    }
                })
            }
        })
    })
})