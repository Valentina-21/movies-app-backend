const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres debe traer los generos', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear los generos', async () => {
    const genre = {
        name: "Science fiction"
    }
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(genre.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /genres/:id debe actualizar el genero con un id especifico', async () => {
    const genre = {
        name: "Fiction",
    }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id deb eliminar un generos con el id especifico', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});