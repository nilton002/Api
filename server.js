import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
})
app.get('/usuarios', async (req, res) => {

    console.log(req)

    let users = []
if(req.query){
    users = await prisma.user.findMany({
        where: {
            name:req.query.name,
            age:req.query.age,
        }
    })

} else {
    users = await prisma.user.findMany()

}

    res.status(200).json(users)

})

app.put('/usuarios/:id', async (req, res) => {
    console.log(req)

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })


    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
where: {
    id:req.params.id
}
    })
    res.status(200).json({Message: "Usuário deletado com sucesso!"})

})


app.listen(3000)