 async function getUsers () {
  return fetch('http://localhost:8080/api/users')
    .then(response => (response.json()))
    .then(data => console.log(data))
}

async function createUser (){
  return fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: 3,name: 'John'})
  })
    .then(response => (response.json()))
    .then(data => console.log(data))
}