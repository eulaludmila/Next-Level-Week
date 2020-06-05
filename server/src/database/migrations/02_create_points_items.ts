//Tipo do knex com letra maiúscula
import Knex from 'knex';

//Criar a tabela
export async function up(knex:Knex ){
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary;
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');
        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    })
}


//Remover a tabela
export async function down(knex:Knex){
    return knex.schema.dropTable('point_items');

}