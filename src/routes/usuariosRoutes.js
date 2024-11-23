import express from "express";
import cors from "cors";
import multer from "multer";
import { listarUsuarios, criarNovoUsuario, uploadImagem, atualizarNovoUsuario } from "../controller/usuariosController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
  }

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
  // Cria uma instância do middleware Multer
  const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    
    // Rota para listar usuarios
    app.get("/users", listarUsuarios);

    // Rota para criar um novo usuario
    app.post("/criar", criarNovoUsuario); // Chama a função controladora para criação de usuario

// Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem
app.put("/upload/:id", atualizarNovoUsuario)
};

export default routes;