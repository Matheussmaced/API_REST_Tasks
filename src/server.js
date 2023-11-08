import http from 'node:http'
import { randomUUID } from 'node:crypto';
//import { Database } from './database';

const tasks = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }


  if(method === 'GET' && url === '/tasks') {
      return tasks.length > 0 ? res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
      :res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if(method === 'POST' && url === '/tasks') {
    const { name, status } = req.body

    tasks.push({
      id: randomUUID(),
      name,
      status,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
