//Tipo do knex com letra maiúscula
import Knex from 'knex';

//Criar a tabela
export async function up(knex:Knex ){
    return knex.schema.createTable('points', table => {
        table.increments('id').primary;
        table.string('image').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
}


//Remover a tabela
export async function down(knex:Knex){
    return knex.schema.dropTable('points');

}