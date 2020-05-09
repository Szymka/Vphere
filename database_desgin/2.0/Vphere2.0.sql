CREATE TABLE `large_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NULL COMMENT '集体名称',
  `creat_user` int(10) NULL COMMENT '集体创建的用户id',
  `creat_time` datetime NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `SG_LG_estb`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `sg_id` int NULL COMMENT '小集体id',
  `lg_id` int NULL COMMENT '大集体id',
  PRIMARY KEY (`id`)
);

CREATE TABLE `si_record`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL COMMENT '签到用户id',
  `sign_in_id` int(10) NOT NULL COMMENT '签到记录id',
  `sign_time` datetime NOT NULL COMMENT '签到时间',
  `status` int(10) NOT NULL COMMENT '签到状态',
  `location` json NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sign_in`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `creat_user` int(10) NULL COMMENT '创建签到的用户id',
  `group_id` int(10) NULL COMMENT '小集体id',
  `start_time` datetime NULL COMMENT '签到开始时间',
  `end_time` datetime NULL COMMENT '签到结束时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `small_group`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NULL COMMENT '集体名称',
  `create_user` int(10) NULL COMMENT '创建集体的用户id',
  `creat_time` datetime NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `U_SG_estb`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `sg_id` int(10) NOT NULL COMMENT '小集体id',
  `remark` varchar(50) NOT NULL COMMENT '集体内备注',
  `status` int(10) NOT NULL COMMENT '权限级别,3大集体超级管理员,2小集体超级管理员,1管理员,0普通用户',
  PRIMARY KEY (`id`)
);

CREATE TABLE `users`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `open_id` varchar(100) NOT NULL COMMENT '微信open_id',
  `head portrait` varchar(500) CHARACTER SET utf8mb4 NOT NULL COMMENT '头像',
  `join_group` json NOT NULL COMMENT '加入的集体',
  PRIMARY KEY (`id`)
);

