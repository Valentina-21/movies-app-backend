const request = require('supertest');
const app = require('../app');
require('../models')

let id;

test('GET /directors debe traer los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear los directores', async () => {
    const director = {
        firstName: "Zack",
        lastName: "Snyder",
        nationality: "US",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Zack_Snyder_by_Gage_Skidmore_2.jpg/800px-Zack_Snyder_by_Gage_Skidmore_2.jpg",
        birthday: "1966-04-01"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(director.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /directors/:id debe actualizar el director con un id especifico', async () => {
    const director = {
        birthday: "1966-04-02",
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(director.birthday);
});

test('DELETE /directors/:id deb eliminar un director con el id especifico', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});