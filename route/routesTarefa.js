const express = require('express');
const modelTarefa = require('../model/modelTarefa');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

router.post('/inserirTarefa', (req, res) => {
    let { nome_tarefa, data_tarefa, descricao_tarefa } = req.body;

    modelTarefa.create({
        nome_tarefa,
        data_tarefa,
        descricao_tarefa
    })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAREFA INSERIDA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR A TAREFA',
            errorObject: error
        });
    });
});

router.get('/listagemTarefas', (req, res) => {
    modelTarefa.findAll()
    .then((response) => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAREFAS LISTADAS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR AS TAREFAS',
            errorObject: error
        });
    });
});

router.get('/listagemTarefas/:cod_tarefa', (req, res) => {
    let { cod_tarefa } = req.params;

    modelTarefa.findByPk(cod_tarefa)
    .then((response) => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAREFA RECUPERADA COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR A TAREFA',
            errorObject: error
        });
    });
});

router.delete('/excluirTarefa/:cod_tarefa', (req, res) => {
    let { cod_tarefa } = req.params;

    modelTarefa.destroy({ where: { cod_tarefa } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAREFA EXCLUÍDA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR A TAREFA',
            errorObject: error
        });
    });
});

router.put('/alterarTarefa', (req, res) => {
    let { cod_tarefa, nome_tarefa, data_tarefa, descricao_tarefa } = req.body;

    modelTarefa.update({
        nome_tarefa,
        data_tarefa,
        descricao_tarefa
    }, { where: { cod_tarefa } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAREFA ALTERADA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR A TAREFA',
            errorObject: error
        });
    });
});

module.exports = router;
