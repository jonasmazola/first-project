const express = require('express')
const port = 3000
const uuid = require('uuid')
const app = express()
app.use(express.json())



const users = []
// const myFirstMiddleware = (request, response, next) => {

//     console.log('fui chamado')
//     next()
// }

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ mensagem: "Usuario nao encontrado" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


// app.use(myFirstMiddleware)

// visualizar
app.get('/users', (request, response) => {

    return response.json(users)

})







// creaer
app.post('/users', (request, response) => {

    const { name, age } = request.body // descructuring assignment'

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.json(user)

})






// atualizar 
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)

})










// deletar
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})












app.listen(port, () => {
    console.log('Serve iniciado porta  porta: ' + port)
})