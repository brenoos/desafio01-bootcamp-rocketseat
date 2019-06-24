const express = require('express');

const app = express();

app.use(express.json());

const projects = [
    {
        id: '1',
        title: 'novo projeto',
        tasks: []
    }
];
let requests = 0;

function checkProjectExists(req, res, next){
    const { id } = req.params
    const project = projects.find(p => p.id === id);

    if(!project){
        return res.status(400).json({error: "project does not exists"});
    }

    req.project = project

    return next();

}

function requestCounter(req, res, next){
    requests++
    console.log(`Número de requisições ${requests}`)
    return next();
}

app.use(requestCounter);

app.get('/projects', (req, res) => res.json(projects));

app.post('/projects', (req, res) => {
    const project = {...req.body, tasks: []}

    projects.push(project);

    return res.json(project);
})

app.put('/projects/:id', checkProjectExists, (req, res) => {
    const { title } = req.body;
    const { project } = req;

    project.title = title;

    return res.json(project);

})

app.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id === id);

    projects.splice(projectIndex, 1);

    return res.json({ok: true});
})

app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { title } = req.body;
    const { project }= req;

    project.tasks.push(title);

    return res.json(project);
})

app.listen(3333, () => {
    console.log("Server Running");
})