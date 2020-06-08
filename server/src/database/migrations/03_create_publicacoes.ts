import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary;
        table.string('name').notNullable();
        table.text('text_post').notNullable();
        table.string('uf',2).notNullable();
        table.string('city').notNullable();
        table.string('image').notNullable();
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points')
    })
}

export async function down(knex:Knex){
    return knex.schema.dropSchema('posts');
}