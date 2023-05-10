const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const read = async (req, res) => {
    let usuarios = await prisma.Usuarios.findMany();
    res.status(200).json(usuarios).end();
}

const criar = async (req, res) => {
    const usuarios = await prisma.Usuarios.createMany({
        data: req.body
    })
    res.status(200).json(usuarios).end();
}

const login = async (req, res) => {
    const usuarios = await prisma.Usuarios.findMany({
        where: {
            senha: req.body.senha
        }
    })

    if (usuarios.length === 0) {
        res.status(200).json(false).end()
    } else { 
        res.status(200).json(usuarios[0].id_perfil).end() 
    }


}

module.exports = {
    read,
    criar,
    login
}