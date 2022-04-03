const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    //console.log(rol);
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`Este correo: ${correo}, ya está  registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    //Verificar si el id existe
    //console.log(id);
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El Id:  ${id} no existe.`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
};