# Catálogo de Produtos com Avaliações

Este projeto é uma API simples com integração ao banco de dados **MongoDB**, que permite gerenciar produtos, consultar preços, categorias, estoque e avaliações dos usuários.

---

## Funcionalidades

- Inserção automática de 100 produtos aleatórios no banco
- Consulta de produtos com filtros por preço, categoria e tags
- Busca por produtos com avaliações e média de nota
- Integração com MongoDB Compass e MongoDB Shell

---

## Tecnologias

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Faker.js](https://github.com/faker-js/faker)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Instalação e Uso

```bash
npm install
```

## Gere os produtos no banco
```bash 
node gerarProdutos.js
```

## Inicie o servidor
```bash 
node server.js
```
---

### Exemplos de Consultas no MongoDB Shell

* Buscar todos os produtos com preço abaixo de R$200:
```bash 
db.produtos.find({ preco: { $lt: 200 } })
```

* Produtos da categoria "eletrônicos":
```bash 
db.produtos.find({ categoria: "eletrônicos" })
```

* Produtos com nota média acima de 4:
```bash 
db.produtos.aggregate([
  { $addFields: { media: { $avg: "$avaliacoes.nota" } } },
  { $match: { media: { $gt: 4 } } }
])
```
---

## Autor
Michael Maia
- [Linkedin](https://www.linkedin.com/in/qamichael/)

