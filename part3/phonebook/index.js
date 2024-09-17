const express = require('express')
const morgan = require('morgan')

morgan.token('body', function (req) {
    return JSON.stringify(req.body);
})

const app = express();


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//app.use(morgan('tiny'));
app.use(express.json());


let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name is missing', 
        });
    } else if (!body.number) {
        return response.status(400).json({ 
            error: 'phone number is missing', 
        });
    } else if (persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique', 
        })
    }


    var maxId = Math.floor(Math.random() * 9999999999);

    const person = {
        name: body.name,
        number: body.number,
        id: String(maxId)
    }
    persons = persons.concat(person)
    //console.log(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    let length = persons.length;
    var time = Date();
    response.send(`<p>Phonebook has info for ${length} people</p><p>${time}</p>`)
})
  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})