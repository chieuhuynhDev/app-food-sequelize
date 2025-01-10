


-- tạo table user
CREATE TABLE users (
user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
`password` VARCHAR(255) NOT NULL

)

-- thêm dữ liệu vào user
INSERT INTO users (full_name, email, password) VALUES
('john_doe', 'john.doe@example.com', 'password123'),
('jane_smith', 'jane.smith@example.com', 'mypassword'),
('alice_jones', 'alice.jones@example.com', '123456789'),
('bob_brown', 'bob.brown@example.com', 'qwertyuiop'),
('charlie_white', 'charlie.white@example.com', 'admin123'),
('david_black', 'david.black@example.com', 'securepassword'),
('emma_green', 'emma.green@example.com', 'password321'),
('frank_yellow', 'frank.yellow@example.com', 'passw0rd'),
('grace_blue', 'grace.blue@example.com', 'password2024'),
('hannah_purple', 'hannah.purple@example.com', 'supersecret');


-- tạo table food_type 
CREATE TABLE IF NOT EXISTS food_type (
  type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  
  type_name VARCHAR(255) NOT NULL               
)

INSERT INTO food_type (type_name) 
VALUES
  ('Đồ ăn nhanh'),
  ('Nước'),
  ('Món chính');



-- tạo table food 

CREATE TABLE IF NOT EXISTS food (
  food_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,        
  food_name VARCHAR(255) NOT NULL,         
  image VARCHAR(255) ,                
  price FLOAT NOT NULL,                   
  `desc` VARCHAR(255) ,                 
  type_id INT NOT NULL,                                            
  FOREIGN KEY (type_id) REFERENCES food_type(type_id)  
);

INSERT INTO food (food_name, price, `desc`, type_id)
VALUES
  ('Pizza',  200000, 'Món ăn Ý truyền thống', 1),
  ('Burger',  50000, 'Burger thơm ngon với phô mai', 1),
  ('Ice Cream',  25000, 'Kem mát lạnh với các loại topping', 1),
  ('Salad',  15000, 'Salad tươi ngon với rau xanh', 1),
  ('Soda',  25000, 'Nước giải khát có ga', 2),
  ('Trà dá',  15000, 'Nước này ngon tuyệt', 2),
   ('Thịt bò nướng', 250000, 'thịt bò campuchia', 3),
   ('Lảu gà lá é', 250000, 'gà Úc', 3),
   ('Cua hoàng đế', 2500000, 'cua này ăn không ẻ', 3);
   
   
   
   -- tạo bảng restaurant
   
   CREATE TABLE IF NOT EXISTS restaurant (
  res_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,    
  res_name VARCHAR(255) NOT NULL,        
  image VARCHAR(255) ,               
  `desc` VARCHAR(255)                                 
)

INSERT INTO restaurant (res_name, image, `desc`)
VALUES
  ('Nhà hàng Ẩm thực Việt', 'images/vietnamese_food.jpg', 'Nhà hàng phục vụ các món ăn truyền thống Việt Nam'),
  ('Pizza Italia', 'images/pizza_italia.jpg', 'Pizza Italia chuyên phục vụ pizza truyền thống Ý'),
  ('Hương Quê', 'images/huong_que.jpg', 'Nhà hàng không gian rộng rãi phuc vụ các món truyền thống và thức uống'),
  ('Hương Việt', 'images/huong_viet.jpg', 'Nhà hàng phục vụ các món ăn truyền thống Việt Nam'),
  ('Đặc Sẳn Việt Nam', 'images/dac_san_vn.jpg', 'Nhà hàng phục vụ các món ăn đặc sản các vùng miền Việt Nam');
   
   
   
   -- tạo bảng order
   CREATE TABLE IF NOT EXISTS `orders` (
  order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,         
  user_id INT,                        
  food_id INT ,                         
  amount INT ,                         
  code VARCHAR(255) ,                 
  arr_sub_id VARCHAR(255) ,                 
                     
  FOREIGN KEY (user_id) REFERENCES users (user_id), 
  FOREIGN KEY (food_id) REFERENCES food (food_id) 
);


INSERT INTO `orders` (user_id, food_id, amount, code, arr_sub_id)
VALUES
  (1, 2, 3, 'ORD12345', 'SUB001'),
  (2, 1, 2, 'ORD12346', 'SUB002'),
  (3, 5, 1, 'ORD12347', ''),
  (4, 3, 4, 'ORD12348', 'SUB003'),
  (5, 4, 2, 'ORD12349', 'SUB004'),
  (5, 4, 2, 'ORD12379', 'SUB004'),
  (8, 9, 4, 'ORD12389', 'SUB004'),
  (6, 7, 4, 'ORD12399', 'SUB008'),
   (7, 8, 4, 'ORD12309', 'SUB009');
   
   
   -- tạo bảng sub_food
   CREATE TABLE IF NOT EXISTS sub_food (
  sub_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,       
  sub_name VARCHAR(255) NOT NULL,           
  sub_price FLOAT NOT NULL,                 
  food_id INT NOT NULL,                     
                       
  FOREIGN KEY (food_id) REFERENCES food (food_id)  
);
   
   INSERT INTO sub_food (sub_name, sub_price, food_id)
VALUES
  ('Tương ớt', 15000, 1),  
  ('Gà', 200000, 8), 
  ('Bún thêm', 20000, 8),
  ('Lá é thêm', 30000, 8),
  ('Cua thêm', 1500000, 9),   
  ('Bò thêm', 200000, 7), 
  ('Khoai tây thêm', 500000, 7),
  ('Trà đá thêm', 10000, 6);  
   
   
   
   -- tạo bảng rate_res
   CREATE TABLE IF NOT EXISTS rate_res (
  rate_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,      
  user_id INT NOT NULL,                     
  res_id INT NOT NULL,                      
  amount INT NOT NULL,                     
  date_rate DATETIME DEFAULT CURRENT_TIMESTAMP,
                      
  FOREIGN KEY (user_id) REFERENCES users (user_id), 
  FOREIGN KEY (res_id) REFERENCES restaurant (res_id)
);


INSERT INTO rate_res (user_id, res_id, amount, date_rate)
VALUES
  (1, 2, 5, '2024-12-01 14:00:00'),   
  (2, 3, 4, '2024-12-02 16:30:00'),   
  (3, 1, 3, '2024-12-03 18:00:00'),   
  (4, 2, 2, '2024-12-04 20:00:00'),   
  (5, 5, 5, '2024-12-05 21:30:00'),
  (7, 2, 1, '2024-12-05 21:30:00'),
  (9, 4, 6, '2024-12-05 21:30:00'); 
   
   
   
   -- tạo bảng like_res
   CREATE TABLE IF NOT EXISTS like_res (
  like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,     
  user_id INT NOT NULL,                     
  res_id INT NOT NULL,                      
  date_like DATETIME DEFAULT CURRENT_TIMESTAMP,  
                     
  FOREIGN KEY (user_id) REFERENCES users (user_id),  
  FOREIGN KEY (res_id) REFERENCES restaurant (res_id)
);
   
   INSERT INTO like_res (user_id, res_id, date_like)
VALUES
  (1, 2, '2024-12-01 12:00:00'),   
  (2, 3, '2024-12-02 14:00:00'),   
  (3, 1, '2024-12-03 15:30:00'),   
  (4, 2, '2024-12-04 17:45:00'),  
  (5, 5, '2024-12-05 18:00:00'), 
  (5, 5, '2024-12-05 18:00:00'),
  (8, 4, '2024-12-06 18:00:00'),
  (9, 2, '2024-12-06 18:00:00'),
  (7, 5, '2024-12-07 18:00:00'),
  (8, 2, '2024-12-07 18:00:00'),
  (9, 2, '2024-12-06 18:00:00'),
  (9, 1, '2024-12-04 18:00:00'),
  (4, 3, '2024-12-04 17:45:00'),
  (4, 2, '2024-12-04 17:45:00'),
  (6, 4, '2024-12-01 17:45:00'),
  (6, 1, '2024-12-01 17:45:00');
   
   
   -- Tìm 5 người đã like nhà hàng nhiều nhất.
   SELECT  COUNT(like_res.user_id) AS count_like_res,like_res.user_id, users.user_id, users.full_name, users.email
FROM like_res
INNER JOIN users ON like_res.user_id = users.user_id
GROUP BY like_res.user_id
ORDER BY count_like_res DESC
LIMIT 5;
   
   -- tìm 2 nhà hàng có lượt like nhiều nhất
   SELECT restaurant.res_id, restaurant.res_name, COUNT(like_res.res_id) AS like_res_count
FROM like_res
INNER JOIN restaurant ON like_res.res_id = restaurant.res_id
GROUP BY restaurant.res_id, restaurant.res_name
ORDER BY like_res_count DESC
LIMIT 2;
   
   -- tìm người đã dặt hàng nhiều nhất
   SELECT  COUNT(orders.user_id) AS order_count,orders.user_id, users.user_id, users.full_name, users.email
FROM orders
INNER JOIN users ON orders.user_id = users.user_id
GROUP BY orders.user_id
ORDER BY order_count DESC
LIMIT 1;
   
   --Tìm người dùng không hoạt động trong hệ thống(không đặt hàng, không like, không đánh giá nhà hàng)
   SELECT users.user_id, users.full_name, users.email
FROM users 
LEFT JOIN orders ON users.user_id = orders.user_id
LEFT JOIN like_res ON users.user_id = like_res.user_id
LEFT JOIN rate_res  ON users.user_id = rate_res.user_id
WHERE orders.user_id IS NULL
  AND like_res.user_id IS NULL
  AND rate_res.user_id IS NULL;
   
   
   