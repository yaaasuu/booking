# booking
起動方法
```
npm install
npm run dev
```
DBはmysqlを使用しており、部屋の一覧（rooms）、予約管理(books)の二つに分かれています
```
CREATE TABLE rooms (room INT NOT NULL , max INT NOT NULL , bed_size varchar(255) NOT NULL , PRIMARY KEY (room));

CREATE TABLE books (room INT NOT NULL ,book_id INT AUTO_INCREMENT NOT NULL, first_name varchar(255) NOT NULL , last_name varchar(255) NOT NULL , phone_number varchar(255) NOT NULL, passport_number varchar(255) , remarks varchar(255) , guests INT NOT NULL ,arrival DATE NOT NULL, departure DATE NOT NULL, PRIMARY KEY (book_id), FOREIGN KEY (room) REFERENCES rooms(room));
```
