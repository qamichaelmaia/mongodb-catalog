const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('catalogo_produtos');
    const produtos = db.collection('produtos');

    const resultado = await produtos.insertMany([
      {
        nome: "Teclado Mecânico",
        descricao: "Teclado RGB com switch blue",
        preco: 299.99,
        categoria: "periféricos",
        estoque: 10,
        tags: ["teclado", "rgb", "mecanico"],
        avaliacoes: []
      },
      {
        nome: "Cadeira Gamer",
        descricao: "Cadeira ergonômica com ajuste de altura",
        preco: 999.99,
        categoria: "cadeiras",
        estoque: 5,
        tags: ["cadeira", "gamer", "conforto"],
        avaliacoes: []
      }
    ]);

    console.log("Documentos inseridos:", resultado.insertedCount);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
