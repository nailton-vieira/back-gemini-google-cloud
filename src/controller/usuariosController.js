import fs from "fs";
import { getTodosUsuarios, criarUsuario, atualizarUsuario} from "../model/usuariosModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarUsuarios (req, res)
{
    const usuarios =  await getTodosUsuarios();
    res.status(200).json(usuarios);
}

export async function criarNovoUsuario(req, res) {
    const novoUsuario = req.body;
    try {
        const usuarioCriado = await criarUsuario(novoUsuario);
        res.status(200).json(usuarioCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const novoUsuario = {
        nome: "",
        email: "",
        imgUrl: req.file.originalname,
        descricao: ""
       
    };

    try {
        const usuarioCriado = await criarUsuario(novoUsuario);
        const imagemAtualizada = `uploads/${usuarioCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(usuarioCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoUsuario(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const usuario = {
            imgUrl: urlImagem,
            nome: req.body.nome,
            email: req.body.email,
            descricao : descricao

        }

        const usuarioCriado = await atualizarUsuario(id, usuario);
        res.status(200).json(usuarioCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}