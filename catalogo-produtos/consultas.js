const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('catalogo_produtos');
    const produtos = db.collection('produtos');

    const cursor = produtos.find({ preco: { $lt: 800 } });

    const resultados = await cursor.toArray();
    console.log("Produtos com preço < 800:");
    console.table(resultados);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
