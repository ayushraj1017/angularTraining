const invalid = document.querySelector('.invalid')
const valuesInEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const invalidPassword = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
const submitB = document.querySelector('#submit')
const loginB = document.querySelector('#login')

submitB.addEventListener('click', (e) => {
    e.preventDefault()
    let formValid = true

    const data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        mobile: document.querySelector('#mobile').value,
        DOB: document.querySelector('#DOB').value,
        password: document.querySelector('#password').value,
        confirmPassword: document.querySelector('#confirmPassword').value,
        gender: document.querySelector('input[name="gender"]:checked')
    }
    const userDate = data.DOB.split('-')

    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            invalid.innerText = `${key} missing`
            formValid = false
            return
        } if (key === 'name' && data.name.length <= 5) {
            invalid.innerText = `${key} invalid`
            formValid = false
            return
        } if (key === 'email' && !valuesInEmail.test(data.email)) {
            invalid.innerText = `${key} is not correct`
            formValid = false
            return
        } if (key === 'mobile' && data.mobile.length !== 10) {
            invalid.innerText = `${key} wrong`
            formValid = false
            return
        }
        if (key === 'DOB' && (new Date(userDate[0], userDate[1] - 1, userDate[2]).getTime() > new Date().getTime())) {
            invalid.innerText = `${key} invalid date`
            formValid = false
            return
        }
        if (key === 'password' && invalidPassword.test(data.password)) {
            invalid.innerText = `${key} should be minimum 6 character and must contain text ,number and a special character`
            formValid = false
            return
        } if (data.password !== data.confirmPassword) {
            invalid.innerText = `above password doesnot match`
            formValid = false
            return
        } if (key === 'gender' && data.gender === null) {
            invalid.innerText = `click on gender box`
            formValid = false
            return
        } else if (key === 'gender' && data.gender.value !== null) {
            data.gender = data.gender.value
        }
    }
    if (formValid) {
        let getData = localStorage.getItem('data')
        data.loggedIn = true
        if (getData === null) {
            getData = { body: [] }
            getData.body.push(data)
            localStorage.setItem('data', JSON.stringify(getData))
        } else {
            const jsonObj = JSON.parse(getData)
            const existingEmail = jsonObj.body.find(obj => obj.email === data.email)
            if (!existingEmail) {
                jsonObj.body.push(data)
                localStorage.setItem('data', JSON.stringify(jsonObj))
            } else {
                invalid.innerText = 'Registered Email'
                return
            }
        }
        location.href = '../html/welcome.html?signup=true'
    }
})

loginB.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = '../html/index.html'
})