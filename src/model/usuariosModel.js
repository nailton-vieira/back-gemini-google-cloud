import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarBanco from "../config/dbConfig.js";

const conexao = await conectarBanco(process.env.STRING_CONEXAO);

export async function getTodosUsuarios(){
    const db = conexao.db("online_bd");
    const colecao = db.collection("tb_usuarios");
    return colecao.find().toArray();
}

export async function criarUsuario(novoUsuario) {
    const db = conexao.db("online_bd");
    const colecao = db.collection("tb_usuarios");
    return colecao.insertOne(novoUsuario)
}

export async function atualizarUsuario(id, novoUsuario) {
    const db = conexao.db("online_bd");
    const colecao = db.collection("tb_usuarios");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoUsuario});
}