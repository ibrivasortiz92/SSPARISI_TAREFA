import { 
    createConnection, 
    getConnection,
    getRepository, 
} from "typeorm";
import { User} from "../entities/User";
import {app} from '../routes/app';
import request from 'supertest';

// SETTINGS
beforeEach(() => {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [User],
        synchronize: true,
        logging: false
    });
});
afterEach(() => {
    let conn = getConnection();
    return conn.close();
});


// TESTS
test("request should not create user", () => {
    return request(app).post('/api/create')
    .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

test("request should create user", () => {
    const user = User.create({
        name: "test",
        cnpj: "11.222.333/0001-44",
    });
    return request(app).post('/api/create').send(user)
    .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
    });
});

test("request should send users", async () => {

    const user1 = await User.create({
        name: "test1",
        cnpj: "11.222.333/0001-44",
    });
    await request(app).post('/api/create').send(user1);

    const user2 = await User.create({
        name: "test2",
        cnpj: "11.222.333/0001-44",
    });
    await request(app).post('/api/create').send(user2);

    return request(app).get('/api/users')
    .then(async response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        let users = await getRepository(User).find();
        expect(users[0].name).toBe('test1');
        expect(users[1].cnpj).toBe('11.222.333/0001-44');
    });

});

