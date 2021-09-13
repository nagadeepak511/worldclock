const delay = async (ms) => new Promise((res) => setTimeout(res, ms));

var time = ''
var angle = 0

async function onStart() {
    getTimeZones()

    time = document.getElementById('time').innerText
    time = time.split(':')
    test()
}

async function test(){
    angle = 0;

    // var time = document.getElementById('time').innerText
    

    document.getElementById('minute-frame').style.transform = `rotate(${time[1]*6 + angle/60}deg)`
    document.getElementById('hour-frame').style.transform = `rotate(${time[0]*30 + angle/3600}deg)`
    document.getElementById('second-frame').style.transform = `rotate(${time[2]*6 + angle}deg)`

    while(true){
        angle += 6;
        angle %= (43200)
        await delay(1000)
        document.getElementById('minute-frame').style.transform = `rotate(${time[1]*6 + angle/60}deg)`
        document.getElementById('hour-frame').style.transform = `rotate(${time[0]*30 + angle/3600}deg)`
        document.getElementById('second-frame').style.transform = `rotate(${time[2]*6 + angle}deg)`
    }
}

function getTimeZones(){
    fetch('http://worldtimeapi.org/api/timezone')
    .then((res) => {return res.json()})
    .then((data) => {
        document.getElementById('timezones').innerHTML = ''
        data.map((item) => {
            document.getElementById('timezones').innerHTML += `
                <option value="${item}">${item}</option>
            `
        })
    })
}

function displayResults(){
    var timezone = document.getElementById('timezones').value
    fetch('http://worldtimeapi.org/api/timezone/' + timezone)
    .then((res) => {return res.json()})
    .then((data) => {
        document.getElementById('details-complete').innerHTML = `
            <h2>${data.timezone}</h2>
            <h2>Date: <span>${data.datetime.split('T')[0]}</span></h2>
            <h2>Time: <span id='time'>${data.datetime.split('T')[1].split('.')[0]}</span></h2>
            <h2>Day of the week: <span>${data.day_of_week}</span></h2>
            <h2>Day of the year: <span>${data.day_of_year}</span></h2>
        `
        time = document.getElementById('time').innerText
        time = time.split(':')
        angle = 0
    })
}