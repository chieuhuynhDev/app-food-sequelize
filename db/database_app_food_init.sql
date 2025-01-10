/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `food` (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`food_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `food_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `food_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `like_res` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `res_id` int NOT NULL,
  `date_like` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `res_id` (`res_id`),
  CONSTRAINT `like_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `like_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `food_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `arr_sub_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rate_res` (
  `rate_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `res_id` int NOT NULL,
  `amount` int NOT NULL,
  `date_rate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rate_id`),
  KEY `user_id` (`user_id`),
  KEY `res_id` (`res_id`),
  CONSTRAINT `rate_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `rate_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `restaurant` (
  `res_id` int NOT NULL AUTO_INCREMENT,
  `res_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`res_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sub_food` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(255) NOT NULL,
  `sub_price` float NOT NULL,
  `food_id` int NOT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `sub_food_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `food` (`food_id`, `food_name`, `image`, `price`, `desc`, `type_id`) VALUES
(1, 'Pizza', NULL, 200000, 'Món ăn Ý truyền thống', 1);
INSERT INTO `food` (`food_id`, `food_name`, `image`, `price`, `desc`, `type_id`) VALUES
(2, 'Burger', NULL, 50000, 'Burger thơm ngon với phô mai', 1);
INSERT INTO `food` (`food_id`, `food_name`, `image`, `price`, `desc`, `type_id`) VALUES
(3, 'Ice Cream', NULL, 25000, 'Kem mát lạnh với các loại topping', 1);
INSERT INTO `food` (`food_id`, `food_name`, `image`, `price`, `desc`, `type_id`) VALUES
(4, 'Salad', NULL, 15000, 'Salad tươi ngon với rau xanh', 1),
(5, 'Soda', NULL, 25000, 'Nước giải khát có ga', 2),
(6, 'Trà dá', NULL, 15000, 'Nước này ngon tuyệt', 2),
(7, 'Thịt bò nướng', NULL, 250000, 'thịt bò campuchia', 3),
(8, 'Lảu gà lá é', NULL, 250000, 'gà Úc', 3),
(9, 'Cua hoàng đế', NULL, 2500000, 'cua này ăn không ẻ', 3);

INSERT INTO `food_type` (`type_id`, `type_name`) VALUES
(1, 'Đồ ăn nhanh');
INSERT INTO `food_type` (`type_id`, `type_name`) VALUES
(2, 'Nước');
INSERT INTO `food_type` (`type_id`, `type_name`) VALUES
(3, 'Món chính');

INSERT INTO `like_res` (`like_id`, `user_id`, `res_id`, `date_like`) VALUES
(1, 1, 2, '2024-12-01 12:00:00');
INSERT INTO `like_res` (`like_id`, `user_id`, `res_id`, `date_like`) VALUES
(2, 2, 3, '2024-12-02 14:00:00');
INSERT INTO `like_res` (`like_id`, `user_id`, `res_id`, `date_like`) VALUES
(3, 3, 1, '2024-12-03 15:30:00');
INSERT INTO `like_res` (`like_id`, `user_id`, `res_id`, `date_like`) VALUES
(4, 4, 2, '2024-12-04 17:45:00'),
(5, 5, 5, '2024-12-05 18:00:00'),
(6, 5, 5, '2024-12-05 18:00:00'),
(7, 8, 4, '2024-12-06 18:00:00'),
(8, 9, 2, '2024-12-06 18:00:00'),
(9, 7, 5, '2024-12-07 18:00:00'),
(10, 8, 2, '2024-12-07 18:00:00'),
(11, 9, 2, '2024-12-06 18:00:00'),
(12, 9, 1, '2024-12-04 18:00:00'),
(13, 4, 3, '2024-12-04 17:45:00'),
(14, 4, 2, '2024-12-04 17:45:00'),
(15, 6, 4, '2024-12-01 17:45:00'),
(16, 6, 1, '2024-12-01 17:45:00');

INSERT INTO `orders` (`order_id`, `user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(1, 1, 2, 3, 'ORD12345', 'SUB001');
INSERT INTO `orders` (`order_id`, `user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(2, 2, 1, 2, 'ORD12346', 'SUB002');
INSERT INTO `orders` (`order_id`, `user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(3, 3, 5, 1, 'ORD12347', '');
INSERT INTO `orders` (`order_id`, `user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(4, 4, 3, 4, 'ORD12348', 'SUB003'),
(5, 5, 4, 2, 'ORD12349', 'SUB004'),
(6, 5, 4, 2, 'ORD12379', 'SUB004'),
(7, 8, 9, 4, 'ORD12389', 'SUB004'),
(8, 6, 7, 4, 'ORD12399', 'SUB008'),
(9, 7, 8, 4, 'ORD12309', 'SUB009');

INSERT INTO `rate_res` (`rate_id`, `user_id`, `res_id`, `amount`, `date_rate`) VALUES
(1, 1, 2, 5, '2024-12-01 14:00:00');
INSERT INTO `rate_res` (`rate_id`, `user_id`, `res_id`, `amount`, `date_rate`) VALUES
(2, 2, 3, 4, '2024-12-02 16:30:00');
INSERT INTO `rate_res` (`rate_id`, `user_id`, `res_id`, `amount`, `date_rate`) VALUES
(3, 3, 1, 3, '2024-12-03 18:00:00');
INSERT INTO `rate_res` (`rate_id`, `user_id`, `res_id`, `amount`, `date_rate`) VALUES
(4, 4, 2, 2, '2024-12-04 20:00:00'),
(5, 5, 5, 5, '2024-12-05 21:30:00'),
(6, 7, 2, 1, '2024-12-05 21:30:00'),
(7, 9, 4, 6, '2024-12-05 21:30:00');

INSERT INTO `restaurant` (`res_id`, `res_name`, `image`, `desc`) VALUES
(1, 'Nhà hàng Ẩm thực Việt', 'images/vietnamese_food.jpg', 'Nhà hàng phục vụ các món ăn truyền thống Việt Nam');
INSERT INTO `restaurant` (`res_id`, `res_name`, `image`, `desc`) VALUES
(2, 'Pizza Italia', 'images/pizza_italia.jpg', 'Pizza Italia chuyên phục vụ pizza truyền thống Ý');
INSERT INTO `restaurant` (`res_id`, `res_name`, `image`, `desc`) VALUES
(3, 'Hương Quê', 'images/huong_que.jpg', 'Nhà hàng không gian rộng rãi phuc vụ các món truyền thống và thức uống');
INSERT INTO `restaurant` (`res_id`, `res_name`, `image`, `desc`) VALUES
(4, 'Hương Việt', 'images/huong_viet.jpg', 'Nhà hàng phục vụ các món ăn truyền thống Việt Nam'),
(5, 'Đặc Sẳn Việt Nam', 'images/dac_san_vn.jpg', 'Nhà hàng phục vụ các món ăn đặc sản các vùng miền Việt Nam');

INSERT INTO `sub_food` (`sub_id`, `sub_name`, `sub_price`, `food_id`) VALUES
(1, 'Tương ớt', 15000, 1);
INSERT INTO `sub_food` (`sub_id`, `sub_name`, `sub_price`, `food_id`) VALUES
(2, 'Gà', 200000, 8);
INSERT INTO `sub_food` (`sub_id`, `sub_name`, `sub_price`, `food_id`) VALUES
(3, 'Bún thêm', 20000, 8);
INSERT INTO `sub_food` (`sub_id`, `sub_name`, `sub_price`, `food_id`) VALUES
(4, 'Lá é thêm', 30000, 8),
(5, 'Cua thêm', 1500000, 9),
(6, 'Bò thêm', 200000, 7),
(7, 'Khoai tây thêm', 500000, 7),
(8, 'Trà đá thêm', 10000, 6);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`) VALUES
(1, 'john_doe', 'john.doe@example.com', 'password123');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`) VALUES
(2, 'jane_smith', 'jane.smith@example.com', 'mypassword');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`) VALUES
(3, 'alice_jones', 'alice.jones@example.com', '123456789');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`) VALUES
(4, 'bob_brown', 'bob.brown@example.com', 'qwertyuiop'),
(5, 'charlie_white', 'charlie.white@example.com', 'admin123'),
(6, 'david_black', 'david.black@example.com', 'securepassword'),
(7, 'emma_green', 'emma.green@example.com', 'password321'),
(8, 'frank_yellow', 'frank.yellow@example.com', 'passw0rd'),
(9, 'grace_blue', 'grace.blue@example.com', 'password2024'),
(10, 'hannah_purple', 'hannah.purple@example.com', 'supersecret');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;