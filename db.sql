create database telegram_app;

create table users(
    id_user serial primary key,
    full_name varchar,
    username varchar,
    email varchar,
    phone varchar,
    password varchar,
    bio varchar,
    photo text,
    date_created TIMESTAMP
)

create table chats(
    id_chats serial primary key,
    sender integer,
    receiver integer,
    message text,
    date_created TIMESTAMP
)