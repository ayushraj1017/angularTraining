const invalid = document.querySelector('.invalid')
const valuesInEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const invalidPassword = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
const submitB = document.querySelector('#submit')
const signupB = document.querySelector('#signup')

submitB.addEventListener('click', (e) => {
    e.preventDefault()
    let formValid = true

    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            invalid.innerText = `${key} missing`
            formValid = false
            return

        } if (key === 'email' && !valuesInEmail.test(data.email)) {
            invalid.innerText = `${key} missing`
            formValid = false
            return

        } if (key === 'password' && invalidPassword.test(data.password)) {
            invalid.innerText = `${key} missing`
            formValid = false
            return
        }
    }
    let loggedIn = false

    if (formValid) {
        const getData = localStorage.getItem('data')
        const parsedData = JSON.parse(getData)
        parsedData.body.forEach(element => {
            if (element.email === data.email && element.password === data.password) {
                element.loggedIn = true
                loggedIn = true
                localStorage.setItem('data', JSON.stringify(parsedData))
                invalid.innerText = ''
                location.href = '../html/welcome.html?login=true'
                return
            }
        })
        if (!loggedIn)
            invalid.innerText = 'login credentials wrong'
    }
})
signupB.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '../html/signup.html'
})