import chai from 'chai'
import chaiHttp from 'chai-http'

import app from "../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Bitacoras', () => {
    it('Actualizar - Alimento Compartido', (done) => {
        chai.request(app)
        .put('/bitacoras/AlimentoCompartido/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Esta bitacora ya fue revisada");
            done();
        });
    })

    it('Actualizar - Almacen', (done) => {
        chai.request(app)
        .put('/bitacoras/Almacen/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Log already reviewed");
            done();
        });
    })

    it('Actualizar - CribaFV', (done) => {
        chai.request(app)
        .put('/bitacoras/CribaFV/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Esta bitacora ya fue revisada");
            done();
        });
    })

    it('Actualizar - Empaque', (done) => {
        chai.request(app)
        .put('/bitacoras/Empaque/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Log already reviewed");
            done();
        });
    })

    it('Actualizar - Entrega', (done) => {
        chai.request(app)
        .put('/bitacoras/Entrega/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Esta bitacora ya fue revisada");
            done();
        });
    })

    it('Actualizar - Extintor', (done) => {
        const currDate = new Date();
        const body = {
            observaciones : "Se actualizo",
            capacidad: false,
            ultimaRevision: currDate
        }
        chai.request(app)
        .put('/bitacoras/Extintor/1')
        .send(body)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Esta bitacora ya fue revisada");
            done();
        });
    })

    it('Crear - Incidente', (done) => {
        const body = {
            descripcion: 'Accidente de prueba',
            area: 'empaque'
        }
        chai.request(app)
        .post('/bitacoras/Incidente/create/1')
        .field('area', body.area)
        .field('descripcion', body.descripcion)
        .attach('photo', "test\\test_photo.jpg")
        .type('form')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.estado).to.deep.equal("noRevisado")
            expect(res.body.descripcion).to.deep.equal(body.descripcion)
            done();
        });
    })

    it('Actualizar - Recibo', (done) => {
        chai.request(app)
        .put('/bitacoras/Recibo/1/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Log already reviewed");
            done();
        });
    })

    it('Actualizar - Temperatura', (done) => {
        chai.request(app)
        .put('/bitacoras/Temperatura/1')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal("Esta bitacora ya fue revisada");
            done();
        });
    })
})