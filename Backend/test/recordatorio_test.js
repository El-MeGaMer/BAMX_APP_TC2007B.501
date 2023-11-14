import chai from 'chai'
import chaiHttp from 'chai-http'

import app from "./../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Recordatorio Controllers', () => {
    let idCreated = null;
    it('Crear recordatorio', async () => {
        const body = {
            nombre: "Recordatorio Prueba",
            descripcion: "Este recordatorio es de prueba",
            horaInicial: "2024-12-13T06:00:00Z",
            horaFinal: "2024-12-13T16:11:11Z"
        }

        chai.request(app)
        .post('/recordatorio/')
        .send(body)
        .end((err, res) => {
            idCreated = res.body.id
            expect(res).to.have.status(200);
        });
    })

    it('Obtener recordatorios', async () => {
        chai.request(app)
        .get('/recordatorio/')
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    })

    it('Actualizar recordatorio', async () => {
        const body = {
            nombre: "Recordatorio actualizado",
            descripcion: "Este recordatorio se ha actualizado",
            horaInicial: "2025-12-13T06:00:00Z",
            horaFinal: "2024-12-13T06:00:00Z"
        }
        chai.request(app)
        .put(`/recordatorio/${idCreated}`)
        .send(body)
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    })

    it('Eliminar Recordatorio', async () => {
        chai.request(app)
        .delete(`/recordatorio/${idCreated}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
    })
})