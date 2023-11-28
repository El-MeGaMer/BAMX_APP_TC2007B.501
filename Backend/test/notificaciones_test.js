import chai from 'chai'
import chaiHttp from 'chai-http'

import app from "../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe('Notificaciones', () => {
    it('Obtener notificaciones por usuario', (done) => {
        chai.request(app)
        .get('/notificaciones/1')
        .end((err, res) => {
            // Obtener las IDs de la respuesta
            let IDs = [];
            res.body.forEach(element => {
                IDs.push(element.id);
            });
            expect(res).to.have.status(200);
            expect(IDs).to.deep.include(1);
            done();
        });
    })
})