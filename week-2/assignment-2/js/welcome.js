const queryParamString = location.search
const queryParamsObject = {}
const outputDivision = document.querySelector('#output')
const logoutB = document.querySelector('#logout')
const queryParams = queryParamString.substr(1).split('&')

queryParams.map(ele => {
    const [key, value] = ele.split('=')
    queryParamsObject[key] = value
})

const getData = localStorage.getItem('data')
const parsedData = JSON.parse(getData)
const loginData = parsedData.body.find(obj => obj.loggedIn === true)

for (let key in queryParamsObject) {
    if (key === 'signup' && loginData) {
        outputDivision.innerText = ` Welcome! Registrated User`
    } else if (key === 'login' && loginData) {
        outputDivision.innerText = `Hello ${loginData.name} `
    }
}
logoutB.addEventListener('click', (e) => {
    e.preventDefault()
    if (loginData) {
        loginData.loggedIn = false
        parsedData.body.map(obj => {
            if (obj.email === loginData.email) {
                obj = loginData
            }
        })
        localStorage.setItem('data', JSON.stringify(parsedData))
    }
    location.href = '../html/index.html'
})