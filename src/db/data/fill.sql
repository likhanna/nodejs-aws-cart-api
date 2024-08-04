insert into carts (id, user_id, status)
values
  (
    'd684b470-3d45-4b50-9828-6e5a1d28c2fd',
    '6dd706c7-9879-47fa-8cda-d1e5085fdee7',
    'OPEN'
  ),
  (
    '477e5199-b82e-4e47-a787-d75e7d956dff',
    'ff5d20b2-27dc-4f04-904c-3440e570784e',
    'OPEN'
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    'cf3382ba-a933-4b4a-8c95-64074ba25a1b',
    'ORDERED'
  ),
  (
    'abc24663-d3f7-45d7-9798-36e3479a0284',
    '4679e54f-c3e9-44c0-99e5-05a4caf03d66',
    'OPEN'
  ),
  (
    '04633053-4ad7-4965-91c2-0ea83ef1bb85',
    'e5b89f0e-552c-4297-8ff6-c488077274b9',
    'ORDERED'
  );

insert into cart_items (cart_id, count)
values
  (
    'd684b470-3d45-4b50-9828-6e5a1d28c2fd',
    2
  ),
  (
    'd684b470-3d45-4b50-9828-6e5a1d28c2fd',
    4
  ),
  (
    'd684b470-3d45-4b50-9828-6e5a1d28c2fd',
    3
  ),
  (
    '04633053-4ad7-4965-91c2-0ea83ef1bb85',
    5
  ),
  (
    '04633053-4ad7-4965-91c2-0ea83ef1bb85',
   7
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    10
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    8
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    1
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    3
  ),
  (
    'c653363c-134b-4e02-a1bb-a451262ad180',
    2
  );

insert into users (id, name, password)
values
  ('6dd706c7-9879-47fa-8cda-d1e5085fdee7', 'likhanna', 'TEST_PASSWORD'),
  ('ff5d20b2-27dc-4f04-904c-3440e570784e', 'user2', 'TEST_PASSWORD'),
  ('cf3382ba-a933-4b4a-8c95-64074ba25a1b', 'user3', 'TEST_PASSWORD'),
  ('4679e54f-c3e9-44c0-99e5-05a4caf03d66', 'user4', 'TEST_PASSWORD'),
  ('e5b89f0e-552c-4297-8ff6-c488077274b9', 'user5', 'TEST_PASSWORD');


insert into orders (id, user_id, cart_id, payment, delivery, comments, status, total)
values
  ('c1a6d6b0-1234-5678-90ab-cdef12345678', '6dd706c7-9879-47fa-8cda-d1e5085fdee7', 'd684b470-3d45-4b50-9828-6e5a1d28c2fd', '{"method": "credit_card", "transaction_id": "txn_1234567890"}', '{"address": "123 Main St", "city": "Anytown", "zipcode": "12345"}', 'Please deliver after 6 PM.', 'PROCESSING', 150.00);