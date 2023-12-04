import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.usuarios.findFirst({
            where: {
                correo: email,
            },
        });

        if (user.password !== password || !res) {
            return res.status(401).json({ status: 'error', message: 'Datos incorrectos' });
        }

        const rolUser = await prisma.roles.findUnique({
            where: {
                id: user.idRol,
            },
        });

        return res.status(200).json({ status: 'success', message: 'Usuario autenticado correctamente',  id: user.id, rol: rolUser.nombreRol });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Hubo un error al verificar el usuario' });
    }
};


