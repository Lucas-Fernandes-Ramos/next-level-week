import Knex from 'knex';

export  async function seed(knex: Knex){
  await  knex('items').insert([
    {title: 'Lampadas', image: 'lampadas.svg'},
    {title: 'Pilhas e Baterias', image: 'baterias.svg'},
    {title: 'Papeios e Papelão', image: 'papeis-papelao.svg'},
    {title: 'Residuo Eletronico', image: 'eletronicos.svg'},
    {title: 'Residuo organico', image: 'organicos.svg'},
    {title: 'Oleo de cozinha', image: 'oleo.svg'},
    
  ]);
}