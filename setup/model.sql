create database universal_shop;

create extension pgcrypto;

drop table if exists Categories cascade; 
create table Categories (
    category_id smallint generated always as identity primary key,
    category_name character varying(50) not null
);

drop table if exists Users cascade;
create table Users (
    user_id bigint generated always as identity primary key,
    username character varying(30) not null unique,
    password character varying(256) not null,
    contact character varying(12) not null,
    email character varying(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    role character varying(20) check(role in ('admin', 'user'))
);

drop table if exists Products cascade;
create table Products (
    product_id int generated always as identity primary key,
    product_name character varying(60) not null,
    price bigint not null,
    short_desc character varying(80) not null,
    long_desc character varying(400) not null,
    file bytea not null,
    category_id int not null references Categories(category_id)
);

drop table if exists Orders cascade;
create table Orders (
    order_id int generated always as identity primary key,
    user_id int not null references Users(user_id),
    isPaid character varying(20) check(isPaid in ('t', 'f')),
    order_created_at timestamptz default current_timestamp
);

drop table if exists Order_products cascade;
create table Order_products (
    order_id int not null references Orders(order_id),
    product_id int not null references Products(product_id),
    count smallint not null
);

insert into Categories (category_name) values
('Noutbuklar'), ('Televizorlar'), ('Maishiy texnika'), ('Smartfonlar');

insert into Users (username, password, contact, email, role) values
('Admin', 'admin', '998943433928', 'mock@mail.ru', 'admin'),
('Oybek', '11111', '998595478788', 'taz@mail.com', 'user'),
('Jasur', '22222', '998995648928', 'baz@mail.usa', 'user'),
('Akmal', '33333', '998979564956', 'foo@mail.net', 'user'),
('Zafar', '44444', '998909054800', 'bar@mail.org', 'user');

insert into Products (product_name, price, short_desc, long_desc, file, category_id) values
('Artel', 1800000, 'Android-телевизор Artel 55AU20K', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 2),
('Redmi 10', 3800000, 'Redmi 10 64 GB', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 4),
('Lenovo Yoga', 1800000, 'Lenovo Yoga ultra edition', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 1),
('LG', 7900000, 'Купить Телевизор LG 55UP76006LC LED с доставкой по Узбекистану', '4K телевизор обеспечивает живое и детализированное изображение, которое превосходит FullHD в четыре раза. Это совершенно новый уровень развлечений и отдыха. Автоматическое отключение сглаживания делает динамичные сцены максимально реалистичными,', 'images/lgtv.jpeg', 2),
('Gaz plitasi', 2500000, 'Gaz plita Artel 55AU20K', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 3),
('Acer', 4900000, 'Acer E1-531G noutbuk', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 1),
('Samsung OLED', 8500000, 'Гарантийный срок (месяц): 12', 'Купить Телевизор Samsung UE55AU9000UXCE с доставкой по Узбекистану. без кредита в рассрочку - лучшие цены,современные товары,каталог на olcha.uz', 'images/samsungtv.jpeg', 2),
('Vivo', 4500000, 'Vivo smartfon 4/64', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 4),
('Lenovo', 6400000, 'Lenovo noutbuk for office', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 1),
('Konditsioner', 2600000, 'Konditsioner Artel 55AU20K', 'Android-телевизор Artel 55AU20K воспроизводит потрясающие, яркие и насыщенные изображения в формате HD и разрешении 3840x2160 пикселей. Теперь вы можете смотреть любимые телешоу и фильмы. Разработчики предусмотрели устойчивую подставку, и в небольшом помещении эту модель очень удобно закрепить на стене.', 'images/arteltv.jpeg', 3);

insert into Orders (user_id, isPaid) values
(2, 'f'),
(5, 'f'),
(4, 'f'),
(3, 'f');

insert into Order_products (order_id, product_id, count) values
(1, 2, 2), (1, 8, 1), (1, 5, 3), (1, 1, 1), (1, 4, 1), (1, 7, 2), 
(2, 9, 1), (2, 2, 1), (2, 6, 2), (2, 5, 1),
(3, 7, 1), (3, 8, 1), (3, 6, 2), (3, 5, 2), (3, 3, 2),
(4, 1, 1), (4, 4, 1), (4, 2, 2);


select o.*,
json_agg(op.count) as count,
json_agg(p.price) as price,
json_agg(p.product_name),
sum(op.count * p.price) as summary
from orders as o
left join order_products as op on op.order_id = o.order_id
inner join products as p on p.product_id = op.product_id
group by o.order_id;

select 
    o.*,
    json_agg(op.count) as count,
    json_agg(p.price) as price,
    json_agg(p.product_name) as products,
    sum(op.count * p.price) as summary
from orders as o
left join order_products as op on op.order_id = o.order_id
inner join products as p on p.product_id = op.product_id
WHERE user_id = 2
group by o.order_id
offset 1 limit 5


data model
    Categories (category_id, category_name)
    Users (user_id, username, password, contact, email, role)
    Products (product_id, name, price, short_desc, long_desc, picture, category_id)
    Orders (order_id, user_id, isPaid, order_created_at)
    Order_products (order_id, product_id, count)