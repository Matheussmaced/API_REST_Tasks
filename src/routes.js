import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';

const database = new Database

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { name, status } = req.body

      const task = {
        id: randomUUID(),
        name,
        status,
      }

      database.insert('tasks', task)

      return res.writeHead(202).end()
    }
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.end()
    }
  }
]

