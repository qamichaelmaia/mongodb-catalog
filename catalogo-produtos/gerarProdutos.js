const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('catalogo_produtos');
  const produtos = db.collection('produtos');

  const lista = [];

  for (let i = 0; i < 100; i++) {
    lista.push({
      nome: faker.commerce.productName(),
      descricao: faker.commerce.productDescription(),
      preco: parseFloat(faker.commerce.price()),
      categoria: faker.commerce.department(),
      estoque: faker.datatype.number({ min: 0, max: 100 }),
      tags: faker.lorem.words(3).split(' '),
      avaliacoes: []
    });
  }

  await produtos.insertMany(lista);
  console.log("Produtos gerados com sucesso!");
  await client.close();
}

main();
