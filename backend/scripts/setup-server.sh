#!/bin/bash

# Business Card App - Server Setup Script
# Run this script as root on a fresh Ubuntu/Debian server
# Usage: sudo ./setup-server.sh

set -e

echo ">>> Updating System..."
apt update && apt upgrade -y

echo ">>> Installing Prerequisites..."
apt install -y curl git nginx build-essential

echo ">>> Installing Node.js (v20)..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo ">>> Installing MySQL Server..."
apt install -y mysql-server
# Secure MySQL installation (Automated)
# Note: In production, you might want to run mysql_secure_installation manually
# This sets a default root password 'rootpassword' - CHANGE THIS!
# mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword'; FLUSH PRIVILEGES;"

echo ">>> Installing PM2..."
npm install -g pm2

echo ">>> Installing Certbot (for SSL)..."
apt install -y certbot python3-certbot-nginx

echo ">>> Setup Complete!"
echo "Next steps:"
echo "1. Clone your repo to /var/www/business-card"
echo "2. Configure MySQL Database 'bizcard_db'"
echo "3. Follow the deployment_plan.md for app configuration"
