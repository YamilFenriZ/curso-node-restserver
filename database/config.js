const mongosee = require('mongoose')

const dbConnection = async() => {

    try {

        await mongosee.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');

    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de iniciar la Base de Datos');

    }

}

module.exports = {
    dbConnection
}