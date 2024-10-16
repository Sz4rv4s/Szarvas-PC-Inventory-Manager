create table parts(
    id int primary key not null,
    model varchar(60) not null,
    brand varchar(30) not null,
    price int not null,
    warehouse_id int not null
);

create table warehouses(
	id int primary key not null,
    name varchar(50) not null,
    city varchar(30) not null,
    address varchar(60) not null,
    capacity int not null
);

alter table parts
add constraint parts_fk foreign key(warehouse_id) references warehouses(id);