# Craete Database Table

CREATE TABLE `collection` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `imgPath` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Insert Data To Database Table
INSERT INTO `collection` (`id`, `name`, `imgPath`) VALUES
(1, 'orange', '1668302548862.jpeg'),
(2, 'kiwi', '1668302565932.jpeg'),
(3, 'Banana', '1668323807591.jpeg');

# Set Primary Key
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `collection`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
