import { expect } from 'chai'
import {
  postExample,
  getExample,
  updateExample,
  deleteExample,
} from '../controllers/example_controller.js'


describe('Example Controllers', () => {
    it('postExample is working as intended', async () => {
        const req = {
            body: {
                title: "test",
                content: "test1",
                name: "test2"
            }
        }
        const res = {
            json: (result) => { 
                expect(result).to.have.property('id')
            }
        }
        await postExample(req, res)

    })

    it('getExample is working as intended', async () => {
        const res = {
            json: (result) => {
                expect(result).to.be.an('array')
            }
        }
        await getExample({}, res)
    })

    it('updateExample is working as intended', async () => {
        const req = {
            params: {id: '1'},
            body: {
                title: "testUpdated",
                content: "test1Updated",
                name: "test2Updated"
            }
        }
        const res = {
            json: (result) => {
                expect(result).to.have.property('id',1)
            }
        }
        await updateExample(req, res)
    })

    it('deleteExample', async () => {
        const req = {
            params: {id: '1'}
        }
        const res = {
            json: (result) => {
                expect(result).to.be.empty
            }
        }
        await deleteExample(req, res)
    })
})

// describe('Controladores', () => {
//     afterEach(() => {
//         sinon.restore()
//     })

//     it('postExample debería crear un nuevo registro "example"', async () => {
//         const req = {
//             body: {
//             title: 'Título de prueba',
//             content: 'Contenido de prueba',
//             name: 'Nombre de prueba',
//             },
//         }
//         const res = {
//             json: (result) => {
//             expect(result).to.have.property('id');
//             },
//         }

//         const prismaMock = sinon.mock(require('@prisma/client'))
//         prismaMock.expects('example.create').once().withArgs(req.body).resolves({ id: 1 })

//         await postExample(req, res)

//         prismaMock.verify()
//     })

//     it('getExample debería obtener una lista de registros "example"', async () => {
//         const res = {
//             json: (result) => {
//                 expect(result).to.be.an('array')
//             },
//         }

//         const prismaMock = sinon.mock(require('@prisma/client'))
//         prismaMock.expects('example.findMany').once().resolves([])

//         await getExample({}, res)

//         prismaMock.verify()
//     })

//     it('updateExample debería actualizar un registro "example"', async () => {
//         const req = {
//             params: { id: '1' },
//             body: {
//                 title: 'Nuevo título',
//                 content: 'Nuevo contenido',
//                 name: 'Nuevo nombre',
//             },
//         }
//         const res = {
//             json: (result) => {
//                 expect(result).to.have.property('id');
//             },
//         }

//         const prismaMock = sinon.mock(require('@prisma/client'))
//         prismaMock.expects('example.update').once().withArgs({
//             where: { id: 1 },
//             data: req.body,
//         }).resolves({ id: 1 })

//         await updateExample(req, res)

//         prismaMock.verify()
//     })

//   it('deleteExample debería eliminar un registro "example"', async () => {
//     const req = { params: { id: '1' } }
//     const res = {
//       json: (result) => {
//         expect(result).to.have.property('id');
//       },
//     }

//     const prismaMock = sinon.mock(require('@prisma/client'))
//     prismaMock.expects('example.delete').once().withArgs({ where: { id: 1 } }).resolves({ id: 1 })

//     await deleteExample(req, res)

//     prismaMock.verify()
//   })
// })
