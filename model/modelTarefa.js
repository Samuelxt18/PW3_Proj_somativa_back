const Sequelize = require('sequelize');

const connection = require('../database/database');

const modeLivro = connection.define(
    'tbl_tarefa',
    {
        cod_tarefa:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome_tarefa:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
        data_tarefa:{
            type:Sequelize.DATE,
            allowNull:true
        },
        descricao_livro:{
            type:Sequelize.STRING(500),
            allowNull:true
        },
    }
);

modeLivro.sync({force:true});

module.exports = modeLivro;