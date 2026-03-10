-- KnitOps Pro Database Schema

CREATE DATABASE IF NOT EXISTS knitops_pro;
USE knitops_pro;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'operator') DEFAULT 'manager',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    email VARCHAR(100),
    contact_person VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Styles Table
CREATE TABLE IF NOT EXISTS styles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    yarn_type VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    client_id INT,
    style_id VARCHAR(50),
    quantity INT NOT NULL,
    deadline DATE,
    status ENUM('Pending', 'In Production', 'Quality Check', 'Packaging', 'Delivered') DEFAULT 'Pending',
    progress INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (style_id) REFERENCES styles(id)
);

-- Machines Table
CREATE TABLE IF NOT EXISTS machines (
    id VARCHAR(10) PRIMARY KEY,
    status ENUM('running', 'idle', 'error') DEFAULT 'idle',
    current_job_id VARCHAR(50),
    efficiency DECIMAL(5,2) DEFAULT 0.00,
    last_alert VARCHAR(255),
    FOREIGN KEY (current_job_id) REFERENCES orders(id)
);

-- Insert Sample Data
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'admin@knitops.pro', '482c352bb3667db062522f1e271d1947', 'admin'); -- password: password123

INSERT INTO clients (name, region, email, contact_person, status) VALUES 
('Nordic Apparel Group', 'Oslo, Norway', 'contact@nordic.com', 'Erik Hansen', 'Active'),
('Urban Threads Co.', 'New York, USA', 'info@urbanthreads.com', 'Sarah Miller', 'Active'),
('Silk Road Textiles', 'Istanbul, Turkey', 'sales@silkroad.com', 'Ahmet Yilmaz', 'Inactive');

INSERT INTO styles (id, name, category, yarn_type, image_url) VALUES 
('ST-2024-001', 'Classic Crewneck', 'Sweater', 'Cotton 40s', 'https://picsum.photos/seed/sweater1/400/300'),
('ST-2024-002', 'V-Neck Pullover', 'Knitwear', 'Merino Wool', 'https://picsum.photos/seed/sweater2/400/300');

INSERT INTO orders (id, client_id, style_id, quantity, deadline, status, progress) VALUES 
('ORD-8421', 1, 'ST-2024-001', 1200, '2024-12-15', 'In Production', 65),
('ORD-8422', 2, 'ST-2024-002', 500, '2024-12-20', 'Pending', 0);

INSERT INTO machines (id, status, current_job_id, efficiency) VALUES 
('M-01', 'running', 'ORD-8421', 92.5),
('M-02', 'idle', NULL, 0.0),
('M-03', 'error', 'ORD-8421', 45.0);
