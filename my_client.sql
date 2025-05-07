CREATE TABLE my_client (
    id int NOT NULL GENERATED ALWAYS AS IDENTITY,
    name char(250) NOT NULL,
    slug char(100) NOT NULL,
    is_project varchar(30) check (is_project in ('0','1')) NOT NULL DEFAULT '0',
    self_capture char(3) NOT NULL DEFAULT '1',
    client_prefix char(10) NOT NULL,
    client_logo char(255) NOT NULL,
    address text DEFAULT NULL,
    phone_number char(50) DEFAULT NULL,
    city char(50) DEFAULT NULL,
    created_at timestamp(0) DEFAULT NULL,
    updated_at timestamp(0) DEFAULT NULL,
    deleted_at timestamp(0) DEFAULT NULL,
    PRIMARY KEY (id)
); 