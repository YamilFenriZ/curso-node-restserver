const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    //const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
    const { limite = 6, desde = 0 } = req.query;
    const query = { estado: true }

    //const usuarios = await Usuario.find(query)
    //    .skip(Number(desde))
    //    .limit(Number(limite));
    //
    //const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // Encriptar la contraseña - hacer el hash
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API',
        usuario
    })
};
const usuariosPut = async(req, res) => {

    const { id } = req.params;
    //console.log(req.body);
    const { _id, password, google, correo, ...restoDatos } = req.body;
    if (password) {
        // Encriptar la contraseña - hacer el hash
        const salt = bcryptjs.genSaltSync();
        restoDatos.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, restoDatos);

    res.json(usuario);
};
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API'
    })
};
const usuariosDelete = async(req, res) => {
    const { id } = req.params;
    //Fisicamente borrado
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}