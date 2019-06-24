const express = require('express');

const app = express();

app.use(express.json());

const projects = [
    {
        id: '1',
        title: 'novo projeto',
        tasks: []
    }
]

app.get('/projects', (req, res) => res.json(projects));

app.post('/projects', (req, res) => {
    const project = {...req.body, tasks: []}

    projects.push(project);

    return res.json(project);
})

app.put('/projects/:id',(req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id)

    project.title = title

    return res.json(project)

})

app.listen(3333, () => {
    console.log("Server Running");
})