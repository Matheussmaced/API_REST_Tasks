import http from 'node:http'
import { randomUUID } from 'node:crypto';

const tasks = [{
  id: randomUUID(),
  name: 'Nova tarefa',
  status: true ? 'concluida' : 'Em processo'
}];

const server = http.createServer((req, res) => {
  const { method, url } = req

  if(method === 'GET' && url === '/tasks') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(tasks))
  }

  if(method === 'POST' && url === '/tasks') {
    return res.writeHead(201).end('Criação de tarefa')
  }

  return res.writeHead(404).end('Pagina inicial')
})

server.listen(3333)
