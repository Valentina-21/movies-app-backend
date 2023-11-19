const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors deb traer los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors deb crear los actores', async () => {
    const actor = {
        firstName: "Henry",
        lastName: "Cavill",
        nationality: 'British',
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR1vEVqiRh7iOvecklEOWGVM3qPtp0yIINsowTCjS8hrEBuKYe4hwEtlRy-nYwox3dF",
        birthday: "1983-05-04"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(actor.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /actors/:id debe actualizar el actor con un id especifico', async () => {
    const actor = {
        birthday: "1983-05-06",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(actor.birthday);
});

test('DELETE /actors/:id deb eliminar un actor con el id especifico', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});