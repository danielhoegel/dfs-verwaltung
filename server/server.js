const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');

const adapter = new FileSync('server/db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], students: [] })
  .write()

// // Add a post
// db.get('posts')
//   .push({ id: 2, title: 'post 2'})
//   .push({ id: 3, title: 'post 3'})
//   .push({ id: 4, title: 'post 4'})
//   .write()

// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
  
// // Increment count
// db.update('count', n => n + 1)
//   .write()

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json(db.getState());
});

// const entities = ['students', 'studies', 'grades', 'studyCourses', 'studyRegulations', 'subjects', 'subjectCourses'];
const entities = ['posts', 'students']
entities.forEach(entity => {
    // GET ALL
    server.get(`/${entity}`, (req, res) => {
        const results = db.get(entity);
        res.json(results);
    });
    
    // GET BY ID
    server.get(`/${entity}/:id`, (req, res) => {
        const { id } = req.params;
        const result = db.get(entity).find({ id });
        res.json(result);
    });
    
    // POST
    server.post(`/${entity}`, (req, res) => {
        const id = shortid.generate();
        db.get(entity) .push({ id, ...req.body }).write();

        const result = db.get(entity).find({ id });
        res.json(result);
    });

    // PUT
    server.put(`/${entity}/:id`, (req, res) => {
        const { id } = req.params;
        const data = req.body;
        db.get(entity)
            .find({ id })
            .assign(data)
            .write();

        const result = db.get(entity).find({ id });
        res.json(result);
    });

    // DELETE
    server.delete(`${entity}/:id`, (req, res) => {
        const { id } = req.params;
        db.get(entity).remove({ id }).write();
        res.sendStatus(200);
    });
    
});


const PORT = process.env.PORT || 3334;
server.listen(PORT, () => {
    console.log(`Backend server startet on http://localhost:${PORT}`);
});
