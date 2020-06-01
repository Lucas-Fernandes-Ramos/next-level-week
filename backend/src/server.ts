

import express from "express";

const app = express();

app.get('/user', (request, response)=>{
    console.log('Listagem de Usuarios');
    response.json({
                   nome: "Lucas Fernandes Ramos",
                   email: 'teste@hotmail.com',
                   cidade: 'Sorocaba'
                });
 });


app.listen(3333);

