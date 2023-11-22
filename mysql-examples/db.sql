-- insert into users (username, `password`, realname) values ('admin', '123', 'ImAdmin');
-- insert into users (username, `password`, realname) values ('manager2', '789', 'ImMgr2');
-- delete from users where id=3;

-- select id, username from users;

-- insert into blogs (title, content, createtime, author) values ('Title2', 'Content of Title2', 1700626424135, 'manager');

select * from blogs;
-- delete from blogs where id=10;

-- [issue: ER_NOT_SUPPORTED_AUTH_MODE]
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Apple2024';
-- flush privileges;