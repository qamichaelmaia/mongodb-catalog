const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

// Conexão com o MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let produtosCollection;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados antes de iniciar o servidor
client.connect().then(() => {
  const db = client.db('catalogo_produtos');
  produtosCollection = db.collection('produtos');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});


// Listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await produtosCollection.find().toArray();
  res.json(produtos);
});

// Produto por ID
app.get('/produtos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const produto = await produtosCollection.findOne({ _id: new ObjectId(id) });
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// Criar novo produto
app.post('/produtos', async (req, res) => {
  const novoProduto = req.body;
  const resultado = await produtosCollection.insertOne(novoProduto);
  res.status(201).json(resultado);
});

// Adicionar avaliação a um produto
app.post('/produtos/:id/avaliacoes', async (req, res) => {
  const id = req.params.id;
  const avaliacao = req.body;
  try {
    const resultado = await produtosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { avaliacoes: avaliacao } }
    );
    res.json({ message: 'Avaliação adicionada', resultado });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar avaliação' });
  }
});
