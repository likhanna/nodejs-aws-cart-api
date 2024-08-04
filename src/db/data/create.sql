create extension if not exists "uuid-ossp";
create type statuses as enum ('OPEN', 'ORDERED');

create table users (
  id uuid default uuid_generate_v4() primary key,
  name varchar(255) not null,
  password varchar(255) not null
);

create table carts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  status statuses not null
  constraint fk_user foreign key(user_id) references users(id) on delete cascade;
);

create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  cart_id uuid not null,
  count integer not null,
  constraint fk_carts foreign key(cart_id) references carts(id) on delete cascade,
  );

create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null,
  cart_id uuid not null,
  payment json not null,
  delivery json not null,
  comments text,
  status text not null,
  total numeric not null,
  constraint fk_cart foreign key(cart_id) references carts(id) on delete cascade,
  constraint fk_user foreign key(user_id) references users(id) on delete cascade
);