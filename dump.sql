-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 13, 2021 at 02:29 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `separate_logins_laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Viktor', 'easywaynyc@gmail.com', NULL, '$2y$10$Zmarf.8fxmHGv/Wox20OGuI4qCYxbg4LzFrbs79RWXD04G.7WkFBm', NULL, '2021-07-02 02:35:30', '2021-07-02 02:35:30');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_06_20_045706_admins', 1),
(5, '2021_07_02_001407_create_orders_table', 2),
(6, '2019_05_03_000001_create_customer_columns', 3),
(7, '2019_05_03_000002_create_subscriptions_table', 3),
(8, '2019_05_03_000003_create_subscription_items_table', 3),
(9, '2016_06_01_000001_create_oauth_auth_codes_table', 4),
(10, '2016_06_01_000002_create_oauth_access_tokens_table', 4),
(11, '2016_06_01_000003_create_oauth_refresh_tokens_table', 4),
(12, '2016_06_01_000004_create_oauth_clients_table', 4),
(13, '2016_06_01_000005_create_oauth_personal_access_clients_table', 4),
(14, '2021_07_06_231712_add_phone_to_users', 5),
(15, '2021_07_09_024702_add_transaction_id_to_orders', 6),
(16, '2021_07_09_050214_add_notes_to_order', 7),
(17, '2021_07_10_064733_create_notifications_table', 8),
(18, '2021_07_10_073547_create_jobs_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('065b87ef1429cfd9d811745663f10ff603a414b97d6fd2141fd3d197e5f2e07400f652506cb72d13', 1, 1, 'app', '[]', 0, '2021-07-08 06:26:41', '2021-07-08 06:26:41', '2022-07-07 23:26:41'),
('07d88ecedb9102cfc11794e53d15626ed114e0c3838e53f7eb3bcd2df14f3e76d20fca9c56d0f45a', 2, 1, 'app', '[]', 0, '2021-07-09 05:28:52', '2021-07-09 05:28:52', '2022-07-08 22:28:52'),
('0cb1f42a067647fc3f11577530cc1759ea53a61125932778a20e2a7e0d06e78698162be5802b3902', 1, 1, 'app', '[]', 0, '2021-07-08 05:22:44', '2021-07-08 05:22:44', '2022-07-07 22:22:44'),
('1632e5075280536bae940fcfb2a458da83c720da32db43bd728b9049672fe7cb0c01cb3718bc7e5d', 1, 1, 'app', '[]', 0, '2021-07-08 06:26:49', '2021-07-08 06:26:49', '2022-07-07 23:26:49'),
('17c2a07c2e15a9167b97e94ae9a861bd7aa9b6e1baf0a764d8f4f40681a9ba20e47fae8737566c18', 1, 1, 'app', '[]', 0, '2021-07-08 06:23:02', '2021-07-08 06:23:02', '2022-07-07 23:23:02'),
('17ed5adadbfcda4bcd3c442a4197cb9d685cb1b50bb2a37edc8d906f24c189edd4b956fb12974121', 3, 1, 'app', '[]', 0, '2021-07-06 13:04:31', '2021-07-06 13:04:31', '2022-07-06 06:04:31'),
('22ad995ea67af0f3770c59010fff3839d435e8db790de7b7e323ff48d08b3a2b94e005951223186f', 27, 1, 'app', '[]', 0, '2021-07-09 13:19:50', '2021-07-09 13:19:50', '2022-07-09 06:19:50'),
('2df5dcffe6ed879e4ed521bf0844d4801fda909b234141dbc9632bdd5811abf7744c94776d42a701', 1, 1, 'app', '[]', 0, '2021-07-10 03:34:18', '2021-07-10 03:34:18', '2022-07-09 20:34:18'),
('4e2fa0899895f21f536cfedc33de1bd959567aab0bc0607653151f5f498d5d17539a52f09d830dbe', 26, 1, 'app', '[]', 0, '2021-07-09 13:17:27', '2021-07-09 13:17:27', '2022-07-09 06:17:27'),
('50bfdc55dfe0fda63ce9c57d4ed2a8846cb0a554b1f326c9289cb81267e1d477044b5f280522b88d', 1, 1, 'app', '[]', 0, '2021-07-08 06:27:33', '2021-07-08 06:27:33', '2022-07-07 23:27:33'),
('5173d654ccfad2ccd9d56cfa483c368e22d76a0ba0809d3a0c34d9d0c039b1d974a1ec2f125ed3cb', 1, 1, 'app', '[]', 0, '2021-07-10 09:54:36', '2021-07-10 09:54:36', '2022-07-10 02:54:36'),
('51ace6a7f350dddefcb170af8e8875ec2a58d68712b0bc676ff2f3340042c66819e6fce5aea394d3', 7, 1, 'app', '[]', 0, '2021-07-08 08:39:35', '2021-07-08 08:39:35', '2022-07-08 01:39:35'),
('57b4647af1bbf07f08d9a373765e1939efdd91260871fe6bd59083e1f6ed0a62eb1925b155869925', 1, 1, 'app', '[]', 0, '2021-07-08 04:44:05', '2021-07-08 04:44:05', '2022-07-07 21:44:05'),
('65d1b6c7ee8db2f8b954de20fe41132bea2536a0ec54a1d2ee0cb5ba04765329eb160a847982917a', 1, 1, 'app', '[]', 0, '2021-07-08 05:16:36', '2021-07-08 05:16:36', '2022-07-07 22:16:36'),
('69499fa91e9f717e593e9aaf26a0989178108e2280ba7d4a35dfe7c325339f9a810a9bdf3074972a', 1, 1, 'app', '[]', 0, '2021-07-08 06:39:34', '2021-07-08 06:39:34', '2022-07-07 23:39:34'),
('6c930bc4854f13e8e270bde23dfc153133317cb3faa9db0c4f97323b6c64ecfba8f1f4a134de7d3a', 4, 1, 'app', '[]', 0, '2021-07-07 06:21:20', '2021-07-07 06:21:20', '2022-07-06 23:21:20'),
('6f1cc69ad53e3e5d5d9e7c719fd324b2c167c3ab7098b19e19ecbd46d11c9cb07e9563436b37a7a3', 1, 1, 'app', '[]', 0, '2021-07-12 07:00:12', '2021-07-12 07:00:12', '2022-07-12 12:00:12'),
('773045635205fe96f96290fec82c68dad3c87d4c032d1fa890165a23c6aecc69fb4320a272a1db0c', 1, 1, 'app', '[]', 0, '2021-07-08 04:44:25', '2021-07-08 04:44:25', '2022-07-07 21:44:25'),
('813fcbba4aae22de1ccf8728502419c27ffd3fd59412e0cd42c5cae0ed9a581b8147e6912c163c62', 1, 1, 'app', '[]', 0, '2021-07-12 06:44:41', '2021-07-12 06:44:41', '2022-07-12 11:44:41'),
('8305831ba9292d26eecb6bdfb3ca6dc0bd4466b7e91ecc4e5eab0d5b550757e30eb3366200e1032b', 1, 1, 'app', '[]', 0, '2021-07-10 04:01:27', '2021-07-10 04:01:27', '2022-07-09 21:01:27'),
('867f679474bdf3f1673f2b280c5e492c1e3195a4c6c8efb6d41189da785a8ea4ed456497f540ee4a', 28, 1, 'app', '[]', 0, '2021-07-09 13:20:36', '2021-07-09 13:20:36', '2022-07-09 06:20:36'),
('875f961c76ce4c68da8441bddf65cea773e65db5d9cc086fed840ae3d49267846ef9bbc55a9a5588', 1, 1, 'app', '[]', 0, '2021-07-08 06:26:48', '2021-07-08 06:26:48', '2022-07-07 23:26:48'),
('9026089979bf2b405aaaab15339bc9a9c39650e7c7b9ff102b08e01e6d7c8b345af8f01d94d50d2e', 6, 1, 'app', '[]', 0, '2021-07-08 08:21:33', '2021-07-08 08:21:33', '2022-07-08 01:21:33'),
('952e8fcba5e0f68c4fd5c74b090b2e12d377f25161a47ff2084e9a4600357d09d391e9d3354a53db', 2, 1, 'app', '[]', 0, '2021-07-06 13:03:24', '2021-07-06 13:03:24', '2022-07-06 06:03:24'),
('98bdc7dfe8bbd266c96b930d47699b333892f98af554eb1373b5ee526813896fccc0b109d32df12f', 1, 1, 'app', '[]', 0, '2021-07-08 06:24:25', '2021-07-08 06:24:25', '2022-07-07 23:24:25'),
('9ad437a44271871d622f4f438d7a15e45e292653810b9d43b0a4f96ab104245a702e9e14b5afc71b', 24, 1, 'app', '[]', 0, '2021-07-09 13:13:55', '2021-07-09 13:13:55', '2022-07-09 06:13:55'),
('9c8217475e755763ce3dec7b61b75d3c3992d775f3938af6d6e09bef1cfd74d06430ff31177093c8', 1, 1, 'app', '[]', 0, '2021-07-08 07:12:35', '2021-07-08 07:12:35', '2022-07-08 00:12:35'),
('9fa3b8477787bfaa8a60e12c4724afadb35436d6ea2d9555fcbcce2d00b380b965576bffcee41a36', 1, 1, 'app', '[]', 0, '2021-07-06 11:46:22', '2021-07-06 11:46:22', '2022-07-06 04:46:22'),
('a2141799eff3fdfc9fb551b9a400a8b95e220efd71f14c6de30ea4ab91e7b337e6f2caaf042b470a', 1, 1, 'app', '[]', 0, '2021-07-10 03:25:04', '2021-07-10 03:25:04', '2022-07-09 20:25:04'),
('aa446dce33368e1f5a3a56110c57e6f06155cac0130467b94b8065f489e8c41bfacfa84d24ba1f5d', 1, 1, 'app', '[]', 0, '2021-07-06 11:56:00', '2021-07-06 11:56:00', '2022-07-06 04:56:00'),
('ad63c367ccf0cc0705c1b62e772ead1834833b6c1c1e5f3fef309ddcaf914352aa1133d02f6f24b6', 29, 1, 'app', '[]', 0, '2021-07-10 03:26:28', '2021-07-10 03:26:28', '2022-07-09 20:26:28'),
('b1e0efdf4d975d5c61da5dfd6a7d1b808a65456ec15b6b442173869dba1a49a6becdfdcfee7e8aaf', 1, 1, 'app', '[]', 0, '2021-07-11 06:53:02', '2021-07-11 06:53:02', '2022-07-11 11:53:02'),
('b59ead71291aa3ca9290f3aa231a13700fb572d26484320f93b2cd1edfda8369ca9b7efd1d66eb22', 5, 1, 'app', '[]', 0, '2021-07-08 07:57:04', '2021-07-08 07:57:04', '2022-07-08 00:57:04'),
('b7ae53f8e98e3f1ac39dc4c580c41566a0e0cf742cae0b8be2cbd937d2bce38e97d44c0b5eb5a48d', 1, 1, 'app', '[]', 0, '2021-07-11 15:16:15', '2021-07-11 15:16:15', '2022-07-11 20:16:15'),
('bccb47c38be38dbc6fe4f4184553638d334e560ecbf0a6f2ef9188ff77e2d167e3138f15ea76aee6', 1, 1, 'app', '[]', 0, '2021-07-08 06:23:44', '2021-07-08 06:23:44', '2022-07-07 23:23:44'),
('bd32fddb3bec56fae3f245a2f04d6f88b7f1793b3909cef568b32363389dff7265ae49be4d92cc5e', 1, 1, 'app', '[]', 0, '2021-07-10 03:13:39', '2021-07-10 03:13:39', '2022-07-09 20:13:39'),
('f7a5638e0900ee339cb11bd800e4c3c675e74708fd33c7447f0750f8a30765a6be0bf8147ad5f6bd', 25, 1, 'app', '[]', 0, '2021-07-09 13:14:38', '2021-07-09 13:14:38', '2022-07-09 06:14:38'),
('f874771fc1cebcbbaa5df8df411d2e0ec87cebd1899ef27f97e9b9fa4c6f892ec7e341f7fb44cb00', 1, 1, 'app', '[]', 0, '2021-07-08 05:24:38', '2021-07-08 05:24:38', '2022-07-07 22:24:38'),
('f914ec2bd0a1a6725fbae7a7cfec96aa87b239f58e41b5ca28504edfb1470d4169d92b79d2bda05d', 1, 1, 'app', '[]', 0, '2021-07-08 05:47:29', '2021-07-08 05:47:29', '2022-07-07 22:47:29'),
('fe917f7a1ddc8f111121c400387b8ebc3b718efd894f7ae179c422d7b63e28d4bd958bad13542e22', 1, 1, 'app', '[]', 0, '2021-07-09 12:47:15', '2021-07-09 12:47:15', '2022-07-09 05:47:15');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'BvmbEHJI9r1wPpOgu70orYkSY5MxLYvzeV2BGKPn', NULL, 'http://localhost', 1, 0, 0, '2021-07-06 11:24:25', '2021-07-06 11:24:25'),
(2, NULL, 'Laravel Password Grant Client', 'Mb5vKzdGKnxYr0XHzlL6Te54BsnwZEopkT6zrSiB', 'users', 'http://localhost', 0, 1, 0, '2021-07-06 11:24:25', '2021-07-06 11:24:25');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-07-06 11:24:25', '2021-07-06 11:24:25');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `details` json DEFAULT NULL,
  `status` enum('pending','paid','cancled','finished','are going','on process') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `amount` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_payment_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `uuid`, `user_id`, `details`, `status`, `amount`, `created_at`, `updated_at`, `transaction_id`, `notes`, `stripe_payment_id`) VALUES
(31, 'qQbU5MoJ', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-09 12:16:15', '2021-07-09 12:16:15', 'ch_1JB0pfFjRSGcEV2oR4QSlLHq', 'okeowkfewo', ''),
(32, 'GQTsHNCG', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-09 12:59:12', '2021-07-09 12:59:12', 'ch_1JB1VEFjRSGcEV2o0UWroiYG', 'ORDER NOTES', ''),
(33, 'O6Kj9Mv4', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 06:57:12', '2021-07-10 06:57:12', 'ch_1JBIKSFjRSGcEV2owAwazFNr', 'ORDER NOTES', ''),
(34, 'rkw3Bx1k', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 07:22:34', '2021-07-10 07:22:34', 'ch_1JBIj0FjRSGcEV2o4FGoA3Jr', 'ORDER NOTES', ''),
(35, 'm5AXUoqB', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-10 07:23:45', '2021-07-10 07:23:45', 'ch_1JBIk9FjRSGcEV2oRAeKk3Ka', 'okeowkfewo', ''),
(36, 'tT5zORsv', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-10 07:41:56', '2021-07-10 07:41:56', 'ch_1JBJ1lFjRSGcEV2oQs9urTf4', 'okeowkfewo', ''),
(37, 'qkxUJOC1', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-10 10:35:04', '2021-07-10 10:35:04', 'ch_1JBLjJFjRSGcEV2oZoXOwPn0', 'okeowkfewo', ''),
(38, 'NAFnmfwa', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 12:50:33', '2021-07-10 12:50:33', 'ch_1JBNqPFjRSGcEV2oZI6LCWrE', 'ORDER NOTES', ''),
(39, 'hgYRZpX3', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 13:56:37', '2021-07-10 13:56:37', 'ch_1JBOsLFjRSGcEV2ovIRu8T0I', 'ORDER NOTES', 'pi_1JBOsLFjRSGcEV2ogm57prDw'),
(40, 'cIib1JAY', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'finished', 1666.67, '2021-07-10 14:08:34', '2021-07-10 15:27:34', 'ch_1JBP3uFjRSGcEV2oG89naOv4', 'ORDER NOTES', 'pi_1JBP3uFjRSGcEV2of7iiLQNp'),
(41, 'ZCzINwyK', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 14:14:53', '2021-07-10 14:14:53', 'ch_1JBPA1FjRSGcEV2oMvskyogO', 'ORDER NOTES', 'pi_1JBPA1FjRSGcEV2opyvZcqpe'),
(42, 'PQoUT5qC', 1, '{\"total\": 1666.67, \"services\": [{\"price\": 1666.67, \"width\": 20, \"height\": 20, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 20 FT\"}, \"quantity\": 2, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1666.67}', 'paid', 1666.67, '2021-07-10 14:15:47', '2021-07-10 14:15:47', 'ch_1JBPAtFjRSGcEV2oCmu9IDCp', 'ORDER NOTES', 'pi_1JBPAtFjRSGcEV2ojO8fym3l'),
(43, 'HC9drDUg', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-10 14:58:26', '2021-07-10 14:58:26', 'ch_1JBPqBFjRSGcEV2oFU7PH4Pk', 'okeowkfewo', 'pi_1JBPqAFjRSGcEV2o67ykDXKs'),
(44, '3Ym2dvnf', 5, '{\"total\": 2964.58, \"services\": [{\"price\": 2964.58, \"width\": \"55\", \"height\": \"25\", \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": \"100\", \"totalPerItem\": 28.64583333333333, \"totalPerSqFt\": 2864.583333333333, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 2964.58}', 'paid', 2964.58, '2021-07-11 06:47:22', '2021-07-11 06:47:22', 'ch_1JC181FjRSGcEV2o1IL2yFAk', '4342423423', 'pi_1JC181FjRSGcEV2olILgnwXQ'),
(45, 'f9licEqt', 1, '{\"total\": 200, \"services\": [{\"price\": 200, \"width\": 1, \"height\": 1, \"ftHeight\": {\"price\": 0, \"title\": \"0 to 15 FT\"}, \"quantity\": 1, \"currentService\": {\"label\": \"Vinyl banner\", \"price\": 3, \"value\": \"Vinyl banner\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 200}', 'paid', 200.00, '2021-07-11 06:53:20', '2021-07-11 06:53:20', 'ch_1JC1DnFjRSGcEV2olrUdegE2', 'okeowkfewo', 'pi_1JC1DnFjRSGcEV2o3zUD8cbf'),
(46, '2Z4OSjnL', 1, '{\"total\": 3800, \"services\": [{\"price\": 200, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 0.5208333333333333, \"totalPerSqFt\": 0.5208333333333333, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 200, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 0.5208333333333333, \"totalPerSqFt\": 0.5208333333333333, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 1700, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 2, \"totalPerSqFt\": 2, \"currentService\": {\"label\": \"Van Small size\", \"price\": 1600, \"value\": \"Van Small size\", \"disable\": \"WIDTH:HEIGHT:HEIGHT-FOOT\"}, \"currentServiceType\": {\"label\": \"Vehicle wrap\", \"value\": \"Vehicle wrap\"}}, {\"price\": 1700, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 3, \"totalPerItem\": 2, \"totalPerSqFt\": 2, \"currentService\": {\"label\": \"Van - Mid size\", \"price\": 1600, \"value\": \"Van - Mid size\", \"disable\": \"WIDTH:HEIGHT:HEIGHT-FOOT\"}, \"currentServiceType\": {\"label\": \"Vehicle wrap\", \"value\": \"Vehicle wrap\"}}], \"total_php\": 3800}', 'paid', 3800.00, '2021-07-11 15:08:28', '2021-07-11 15:08:28', 'ch_1JC8wxFjRSGcEV2ofKRHlGGS', 'nothing', 'pi_1JC8wxFjRSGcEV2oigpO9shf'),
(47, 'XuhoRScr', 1, '{\"total\": 3800, \"services\": [{\"price\": 200, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 0.5208333333333333, \"totalPerSqFt\": 0.5208333333333333, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 200, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 0.5208333333333333, \"totalPerSqFt\": 0.5208333333333333, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 1700, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 1, \"totalPerItem\": 2, \"totalPerSqFt\": 2, \"currentService\": {\"label\": \"Van Small size\", \"price\": 1600, \"value\": \"Van Small size\", \"disable\": \"WIDTH:HEIGHT:HEIGHT-FOOT\"}, \"currentServiceType\": {\"label\": \"Vehicle wrap\", \"value\": \"Vehicle wrap\"}}, {\"price\": 1700, \"width\": 5, \"height\": 5, \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 3, \"totalPerItem\": 2, \"totalPerSqFt\": 2, \"currentService\": {\"label\": \"Van - Mid size\", \"price\": 1600, \"value\": \"Van - Mid size\", \"disable\": \"WIDTH:HEIGHT:HEIGHT-FOOT\"}, \"currentServiceType\": {\"label\": \"Vehicle wrap\", \"value\": \"Vehicle wrap\"}}], \"total_php\": 3800}', 'paid', 3800.00, '2021-07-11 15:09:00', '2021-07-11 15:09:00', 'ch_1JC8xTFjRSGcEV2o1lTYKgAl', 'nothing', 'pi_1JC8xTFjRSGcEV2oXXygSei2'),
(48, 'mr76yoAF', 1, '{\"total\": 1602.09, \"services\": [{\"price\": 460.42, \"width\": \"50\", \"height\": \"50\", \"ftHeight\": {\"price\": 200, \"title\": \"18 to 20 FT\"}, \"quantity\": 5, \"totalPerItem\": 52.08333333333333, \"totalPerSqFt\": 260.4166666666667, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 1141.67, \"width\": \"50\", \"height\": \"50\", \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 20, \"totalPerItem\": 52.08333333333333, \"totalPerSqFt\": 1041.6666666666667, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1602.09}', 'paid', 1602.09, '2021-07-11 15:16:44', '2021-07-11 15:16:44', 'ch_1JC94xFjRSGcEV2ojVxSKIy4', 'nothing', 'pi_1JC94wFjRSGcEV2og3wMbFsV'),
(49, 'u8HYqMoJ', 1, '{\"total\": 1602.09, \"services\": [{\"price\": 460.42, \"width\": \"50\", \"height\": \"50\", \"ftHeight\": {\"price\": 200, \"title\": \"18 to 20 FT\"}, \"quantity\": 5, \"totalPerItem\": 52.08333333333333, \"totalPerSqFt\": 260.4166666666667, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}, {\"price\": 1141.67, \"width\": \"50\", \"height\": \"50\", \"ftHeight\": {\"price\": 100, \"title\": \"15 to 18 FT\"}, \"quantity\": 20, \"totalPerItem\": 52.08333333333333, \"totalPerSqFt\": 1041.6666666666667, \"currentService\": {\"label\": \"Vinyl\", \"price\": 3, \"value\": \"Vinyl\", \"disable\": null}, \"currentServiceType\": {\"label\": \"Vinyl\", \"value\": \"Vinyl\"}}], \"total_php\": 1602.09}', 'paid', 1602.09, '2021-07-11 15:17:33', '2021-07-11 15:17:33', 'ch_1JC95lFjRSGcEV2oNRVbSAEX', 'nothing', 'pi_1JC95kFjRSGcEV2oMD4ARf1O');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_items`
--

CREATE TABLE `subscription_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `stripe_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pm_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pm_last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `stripe_id`, `pm_type`, `pm_last_four`, `trial_ends_at`, `phone`) VALUES
(1, 'Aleksandr Yurkovskiy', 'godlikedesigner@gmail.com', NULL, '$2y$10$l0TZsEx72OW7UB5/8Ppou.4gNu9KA5E1iXZQXVYKm0MjgFXp0aDv.', NULL, '2021-07-02 02:52:24', '2021-07-09 12:56:30', 'cus_JoemKsqMFZ4jyk', NULL, NULL, NULL, ''),
(2, 'Aleksandr Yurkovsky', 'ffff@gmail.com', NULL, '$2y$10$yvAbr2ArOVfaftuJR/Uhlup5l12tWe1iG6zlXNVJ2Whdu0/cVSqsa', NULL, '2021-07-06 13:02:57', '2021-07-09 07:48:12', 'cus_JoZnPi0esbCQaH', NULL, NULL, NULL, ''),
(3, 'Aleksandr Yurkovsky', 'ffffs@gmail.com', NULL, '$2y$10$bZEJh9K8Iyxpbf2ZJBMK3uXuFbKy3yZ1MVceiqDnq5jXENuxktY6i', NULL, '2021-07-06 13:04:31', '2021-07-06 13:04:31', NULL, NULL, NULL, NULL, ''),
(4, 'Aleksandr Yurkovsky', 'ffffs@gmaisl.com', NULL, '$2y$10$g2WWO3dcPwA.fEsTLTbU9.m.gsrnoG7A0amJz/QJrYtgBXGONI5AW', NULL, '2021-07-07 06:21:20', '2021-07-07 06:21:20', NULL, NULL, NULL, NULL, '+998915261438'),
(5, 'aleksandr', 'godlike@gmail.com', NULL, '$2y$10$yQV7BZs7HD82yFUnZ/hd8.z3vqcXx6joM1vZPkMADsQ.884yOZuIu', NULL, '2021-07-08 07:57:04', '2021-07-11 06:25:07', 'cus_Jpg8HRzg9nN5I2', NULL, NULL, NULL, '(898) 989-8989'),
(6, 'Aleksandr', 'godlikedesigne@gmail.com', NULL, '$2y$10$qyvRUjJoDyDMoK8cfxVaJuE1GJE9CocUzsmfjFD7V/auM11AA0AKK', NULL, '2021-07-08 08:21:33', '2021-07-08 08:21:33', NULL, NULL, NULL, NULL, '(898) 989-8989'),
(7, 'Aleksandr Yurkovsky', 'gmail@gmail.com', NULL, '$2y$10$AmQSzdzpIUR5qjLJKn/L0Ozz/aBvkGQn/nxox4l5SSkvcBCY5vIfy', NULL, '2021-07-08 08:39:35', '2021-07-08 08:39:35', NULL, NULL, NULL, NULL, '(999) 999-9999'),
(12, 'Aleksandr', 'godlikeeeeee@mail.com', NULL, '$2y$10$N5detKwfrsFi72pI1VP6BOk2o/Mb1qFZWsKzsK30IXnIEASr/Y.uO', NULL, '2021-07-09 09:50:26', '2021-07-09 09:50:27', 'cus_JobmrbhBf2cV6A', NULL, NULL, NULL, '(231) 342-1432'),
(13, 'Aleksadr Yurkovsky2222', 'godlikedesignesswswr@gmail.com', NULL, '$2y$10$sRNtPChIcN1ppiXoCoLLHOCFGv.iH5hidfVTRLK994i829yjsJGJi', NULL, '2021-07-09 10:32:06', '2021-07-09 10:32:07', 'cus_JocRxh92hHMxBj', NULL, NULL, NULL, '(595) 959-5959'),
(14, 'ASSS', 'GODL!@GMI.COM', NULL, '$2y$10$dNyZAciG3LKKSKowh8sfi.B6T2C4xQlJVGydhB1pHmmelNp2TV23W', NULL, '2021-07-09 10:53:04', '2021-07-09 10:53:04', 'cus_JocmpVK0zZwAm9', NULL, NULL, NULL, '(111) 111-1111'),
(15, 'SASA', 'QWSQWSQ@G.COM', NULL, '$2y$10$U9eNvuzKqDk4Io52MMQSnOI88IDEdgj.ZnDgns4vezO5BuAOZmPCa', NULL, '2021-07-09 10:59:53', '2021-07-09 10:59:54', 'cus_JoctdTh5tJ6pav', NULL, NULL, NULL, '(211) 221-2121'),
(16, 'dasddada', 'ggggg@h.vom', NULL, '$2y$10$4DSYm8FL.MgmjgCCGRbxoeFpFHAphVislonvuQpGU7yGJmOKj79NG', NULL, '2021-07-09 11:02:11', '2021-07-09 11:02:11', 'cus_JocvKHKiCMPpYy', NULL, NULL, NULL, '(342) 341-2341'),
(17, 'dqwdqwdwqwdq', 'ggreerw@gmail.com', NULL, '$2y$10$FqDCzGb4P015nwrw9gmA4O4XurC4LbAn0oEgfXcMD3mtuev8D.y96', NULL, '2021-07-09 11:06:46', '2021-07-09 11:06:47', 'cus_Jod0BSdu1WVmJc', NULL, NULL, NULL, '(231) 231-2313'),
(18, 'asasas', '2dwed@gmail.com', NULL, '$2y$10$r7l1hdN9ksTUeeIQKHR3E.JYR3H06phJrYkwligumuxLaOiCUUdOC', NULL, '2021-07-09 11:08:51', '2021-07-09 11:08:52', 'cus_Jod2IYxoXP1J3j', NULL, NULL, NULL, '(222) 222-22__'),
(19, 'asqppwlqpdlwqpdlqp', 'googogr@gmail.com', NULL, '$2y$10$iL08iu5GWwnn33pdD1WusuO/BoFhtctTlf7ddSEN.K0OEstneeYBu', NULL, '2021-07-09 11:10:33', '2021-07-09 11:10:34', 'cus_Jod47SM6n1xkIX', NULL, NULL, NULL, '(383) 757-8748'),
(20, 'sqsqsqs', 'godlike@gmailcsa.com', NULL, '$2y$10$/fUqo4rFLzoFBrRhejbboeEU0C4CU3Y4DgV4UsgE9IF9iYeik54XG', NULL, '2021-07-09 11:14:59', '2021-07-09 11:15:00', 'cus_Jod8FGsUQVsJQ1', NULL, NULL, NULL, '(323) 212-321_'),
(21, 'Aleksandr yurkovskyyy', 'dr.yurkovskyy@gmail.com', NULL, '$2y$10$oiMx3QeOUxp5.NEjP8EKC.o2xMZgxm89oi7SNhcDFMcKYlbkv1sQm', NULL, '2021-07-09 11:41:48', '2021-07-09 11:41:49', 'cus_JodZ16MuRhTuGk', NULL, NULL, NULL, '(333) 333-3333'),
(22, 'Aleksandr yurkovskyyy', 'dr.yusrkovskyy@gmail.com', NULL, '$2y$10$kkwyGg18q44IZ6DYhtXJQesx88LgVT0MVvQyb3oxeGOnUVcmVqG9W', NULL, '2021-07-09 12:01:01', '2021-07-09 12:01:02', 'cus_JodseKKTZPZeQR', NULL, NULL, NULL, '(333) 334-5213'),
(23, 'Aleksandr yurkovskyyy', 'godlikeddd@gmail.com', NULL, '$2y$10$6J73HgVy5cOXF7T86JUdFOcHRXHV8vcM5DP5DL5.2er5hKBwGfgpi', NULL, '2021-07-09 12:16:12', '2021-07-09 12:16:13', 'cus_Joe7eW4Cfv4IMF', NULL, NULL, NULL, '(222) 312-3132'),
(24, 'Aleksandr yurkovskyyy2223', 'dr.yurkovskyy222@gmail.com', NULL, '$2y$10$CBGwa/PQ6UJXNDcBkb7T4umslTGY0nKLm./Rz8Wew1dTmsYwC5MZa', NULL, '2021-07-09 13:13:54', '2021-07-09 13:13:54', NULL, NULL, NULL, NULL, '(332) 341-2432'),
(25, 'Aleksandr yurkovskyyy2223', 'godlikeddd23@gmail.com', NULL, '$2y$10$LCMig8hg0x4xQZw8lO7B9.ETiquHaYqfKaO3XyxJAeh15V5l2kOLm', NULL, '2021-07-09 13:14:38', '2021-07-09 13:14:38', NULL, NULL, NULL, NULL, '(324) 234-1241'),
(26, 'Aleksandr yurkovskyyy2223', 'godlikeddd3124123142412341241241234123412413241@gmail.com', NULL, '$2y$10$pLPIooOTDPEn9wWKyhA0/uIQ4YJfNGEbWGlS3sYwkYmxIirXRvVWG', NULL, '2021-07-09 13:17:27', '2021-07-09 13:17:27', NULL, NULL, NULL, NULL, '(482) 882-8228'),
(27, 'Aleksandr yurkovskyyy2223', 'godlikedEeeresigner@gmail.com', NULL, '$2y$10$TXiyGVwujtXDVnEIHNDvueKSK.UQyfrfEKtR2aXfKKVG0LZNpO26y', NULL, '2021-07-09 13:19:50', '2021-07-09 13:19:50', NULL, NULL, NULL, NULL, '(432) 432-4234'),
(28, 'godas', 'godlikeddd2ss3@gmail.com', NULL, '$2y$10$d6tJUoXoEC7CgyCl37MWku6R6wi2QG7LnT8oEUAqNpa3hoxWZ58u6', NULL, '2021-07-09 13:20:36', '2021-07-09 13:20:36', NULL, NULL, NULL, NULL, '(131) 492-1842'),
(29, 'Alex', 'godleee@gmail.com', NULL, '$2y$10$FvCcD0ToX1EnIA3.ceqtF.hvQXr7GeeiGZQ1cfbDZeoiKjm87YiMy', NULL, '2021-07-10 03:26:28', '2021-07-10 03:26:28', NULL, NULL, NULL, NULL, '(243) 242-4242'),
(30, 'Aleksandr Yurkovskiy', 'godlik222e@gmail.com', NULL, '$2y$10$vGE6zeAUQt8tx7Yn3Xim9u98BF25P2OwiN2G1U.ing3r.Dn151PzC', NULL, '2021-07-11 06:16:42', '2021-07-11 06:16:43', 'cus_Jpg0n3pviQxSR5', NULL, NULL, NULL, '(222) 222-2222'),
(31, 'Aleksandr Yurkovskiy', 'godlike1231323123@gmail.com', NULL, '$2y$10$GaAb/SHX7OqI8ub5hVAd.eAxapffwIpfesI0qpwhecpbLS.6p5ayq', NULL, '2021-07-11 06:42:01', '2021-07-11 06:42:06', 'cus_JpgPZLTRldSyJV', NULL, NULL, NULL, '(313) 213-2132');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_uuid_unique` (`uuid`),
  ADD UNIQUE KEY `orders_transaction_id_unique` (`transaction_id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Indexes for table `subscription_items`
--
ALTER TABLE `subscription_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscription_items_subscription_id_stripe_price_unique` (`subscription_id`,`stripe_price`),
  ADD KEY `subscription_items_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_items`
--
ALTER TABLE `subscription_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
