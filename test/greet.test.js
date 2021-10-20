/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const assert = require('assert');
const Greeting = require('../greeting');
const pg = require('pg');
const Pool = pg.Pool;

// we are using a special test database for the tests
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings-app';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Seleka11',
    port: 5432
});

// eslint-disable-next-line no-unused-vars
let greeting = Greeting(pool);

describe('Greetings database web app', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from names;');
    });

    it('should be able to reset the database', async () => {
        await namesGreeted.setName('Kopano');
        greeting.reset();
        assert.equal(0, await greeting.getGreetedNames());
    });

    after(function () {
        pool.end();
    });
});
