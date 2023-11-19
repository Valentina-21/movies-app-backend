const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;

test('GET /movies debe traer las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear las peliculas', async () => {
    const movie = {
        name: "El hombre de acero",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/15/11/20/13/14/031438.jpg",
        synopsis: "La nueva película de la saga de Superman, dirigida por Zack Snyder ('300', 'Watchmen') está protagonizada por Henri Cavill ('Los Tudor', 'La fría luz del día') en el papel de Superman / Clark Kent, y Amy Adams ('Los Muppets') como Loise Lane, la periodista del Daily Planet. Años atrás Clark aterrizó en la Tierra proveniente de un planeta lejano llamado Krypton. Fue criado y educado por sus padres adoptivos, Martha (Diane Lane) y Jonathan (Kevin Costner). Pasan los años y Clark es un joven universitario que empieza a atormentarse por los poderes que tiene, notando que cada vez adquieren una mayor intensidad. Se pregunta cuál es el origen de su existencia y qué fin debe darle a ese don que posee. El mundo, asolado por el crimen y un ataque externo, necesita más que nunca un 'milagro' para que vuelva la paz y la estabilidad. Es justo esa situación la que aprovecha Clark para aplicar sus poderes y convertirse en el héroe conocido como Superman. Ahora bien, en esta nueva aventura ¿será capaz de derrotar a los villanos?, y lo que es más importante ¿podrá salvar a los suyos de una muerte segura?",
        releaseYear: 2013
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id debe actualizar una pelicula con un id especifico', async () => {
    const movie = {
        name: "Superman, El hombre de acero",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Henry",
        lastName: "Cavill",
        nationality: 'British',
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR1vEVqiRh7iOvecklEOWGVM3qPtp0yIINsowTCjS8hrEBuKYe4hwEtlRy-nYwox3dF",
        birthday: "1983-05-04"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Zack",
        lastName: "Snyder",
        nationality: "US",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Zack_Snyder_by_Gage_Skidmore_2.jpg/800px-Zack_Snyder_by_Gage_Skidmore_2.jpg",
        birthday: "1966-04-01"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "Fiction",
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test('DELETE /movies/:id deb eliminar una pelicula con un id especifico', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});