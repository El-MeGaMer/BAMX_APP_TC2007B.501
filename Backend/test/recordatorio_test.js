import chai from 'chai'
import chaiHttp from 'chai-http'

import app from "../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Recordatorios', () => {
    let idCreated;

    it('Crear recordatorio', (done) => {
        const body = {
            nombre: "Recordatorio Prueba",
            descripcion: "Este recordatorio es de prueba",
            horaInicial: "2024-12-13T06:00:00.000Z",
            horaFinal: "2024-12-13T16:11:11.000Z"
        }

        chai.request(app)
        .post('/recordatorio/')
        .send(body)
        .end((err, res) => {
            idCreated = res.body.id
            expect(res).to.have.status(200);
            expect(res.body.nombre).to.deep.equal("Recordatorio Prueba");
            expect(res.body.descripcion).to.deep.equal("Este recordatorio es de prueba");
            expect(res.body.horaInicial).to.deep.equal("2024-12-13T06:00:00.000Z");
            expect(res.body.horaFinal).to.deep.equal("2024-12-13T16:11:11.000Z");
            done();
        });
    })

    it('Obtener recordatorios', (done) => {
        chai.request(app)
        .get('/recordatorio/')
        .end((err, res) => {
            // Obtener las IDs de la respuesta
            let IDs = [];
            res.body.forEach(element => {
                IDs.push(element.id);
            });
            expect(res).to.have.status(200);
            expect(IDs).to.deep.include(idCreated);
            done();
        });
    })

    it('Actualizar recordatorio', (done) => {
        const body = {
            nombre: "Nuevo Recordatorio",
            descripcion: "Este recordatorio se ha actualizado",
            horaInicial: "2025-12-13T06:00:00.000Z",
            horaFinal: "2025-12-13T16:11:11.000Z"
        }
        chai.request(app)
        .put(`/recordatorio/${idCreated}`)
        .send(body)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.nombre).to.deep.equal("Nuevo Recordatorio");
            expect(res.body.descripcion).to.deep.equal("Este recordatorio se ha actualizado");
            expect(res.body.horaInicial).to.deep.equal("2025-12-13T06:00:00.000Z");
            expect(res.body.horaFinal).to.deep.equal("2025-12-13T16:11:11.000Z");
            done();
        });
    })

    it('Eliminar recordatorio', (done) => {
        chai.request(app)
        .delete(`/recordatorio/${idCreated}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.id).to.equal(idCreated);
            done();
        });
    })
})