import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {
        name,
        status,
        description,
      } = req.body

      const task = {
        id: randomUUID(),
        name,
        status,
        description,
        created_at: new Date().toLocaleDateString(),
      }

      database.insert('tasks', task)

      return res.writeHead(202).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const {
        name,
        status,
        description,
      } = req.body

      database.update('tasks', id, {
        name,
        status,
        description,
        updated_at: new Date().toLocaleDateString(),
      }) 

      return res.writeHead(204).end()
    }
  }
]

