var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
var pry = require('pryjs');
var Olympian = require('../models').Olympian;

describe('Olympic API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('node seeders.js')
  });

  // Olympian Index Endpoint
  describe('Test get /api/v1/olympians', () => {
    test('should return a 200 status and olympians object', () => {
      return request(app).get('/api/v1/olympians').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body["olympians"]).toBeInstanceOf(Array)
        expect(response.body["olympians"].length).toBeGreaterThan(3000)
      })
    })
  })

  describe('Test get /api/v1/olympians?age=youngest endpoint ', () => {
    test('should return a 200 status and olympian object', () => {
      return request(app).get('/api/v1/olympians?age=youngest').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.name).toBe("Ana Iulia Dascl")
        expect(response.body.age).toBe(13)
        expect(response.body.team).toBe("Romania")
        expect(response.body.sport).toBe("Swimming")
        expect(response.body.total_medals_won).toBe(0)
      })
    })
  })
  describe('Test get /api/v1/olympians?age=oldest endpoint', () => {
    test('should return a 200 status and olympian object', () => {
      return request(app).get('/api/v1/olympians?age=oldest').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.name).toBe("Julie Brougham")
        expect(response.body.age).toBe(62)
        expect(response.body.team).toBe("New Zealand")
        expect(response.body.sport).toBe("Equestrianism")
        expect(response.body.total_medals_won).toBe(0)
      })
    })
  })
  describe('Test get /api/v1/olympian_stats endpoint', () => {
    test('should return a 200 status and olympian object', () => {
      return request(app).get('/api/v1/olympian_stats').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(Object.keys(response.body)).toContain('olympian_stats')
        expect(Object.keys(response.body.olympian_stats)).toContain('total_competing_olympians')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_weight')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_age')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('unit')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('male_olympians')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('female_olympians')
      })
    })
  })
  describe('Test get /api/v1/events endpoint', () => {
    test('should return a 200 status and event object', () => {
      return request(app).get('/api/v1/events').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(10);
        expect(Object.keys(response.body[0])).toContain('sport')
        expect(Object.keys(response.body[0])).toContain('events')
      })
    })
  })
  describe('Test get /api/v1/events/:id/medalists endpoint', () => {
    test('should return a 200 status and all the medalists for the event', () => {
      return request(app).get('/api/v1/events/12/medalists').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('Medalists')
        expect(response.body.Medalists).toBeInstanceOf(Array);
        expect(Object.keys(response.body.Medalists[0])).toContain('name')
        expect(Object.keys(response.body.Medalists[0])).toContain('team')
        expect(Object.keys(response.body.Medalists[0])).toContain('age')
        expect(Object.keys(response.body.Medalists[0])).toContain('medal')
      })
    })
  })
});
