/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const assert = require('assert');
const GreetingRoutes = require('./routes/greeting-routes');
const pg = require('pg');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings-app';

const pool = new Pool({
    connectionString
});

describe('Greetings database web app', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from names;');
    });

    it('should pass the db test', async function () {
        // the Factory Function is called CategoryService
        let greetingRoutes = GreetingRoutes(pool);
        await greetingRoutes.add({
            description: 'Kopano'
        });

        let names = await greetingRoutes.all();
        assert.equal(1, names.length);
    });

    after(function () {
        pool.end();
    });
});
