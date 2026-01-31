#!/bin/bash

# Business Card App - Server Setup Script (Apache Version)
# Run this script as root on your Ubuntu/Debian server
# Usage: sudo ./setup-server.sh

set -e

echo ">>> Updating System..."
apt update && apt upgrade -y

echo ">>> Installing Prerequisites..."
apt install -y curl git apache2 build-essential

echo ">>> Enable Apache Proxy Modules..."
a2enmod proxy proxy_http
systemctl restart apache2

echo ">>> Installing Node.js (v20)..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo ">>> Installing MySQL Server..."
apt install -y mysql-server
# Note: Ensure you secure your MySQL installation

echo ">>> Installing PM2 & Serve..."
npm install -g pm2 serve

echo ">>> Installing Certbot (for SSL)..."
apt install -y certbot python3-certbot-apache

echo ">>> Setup Complete!"
echo "Next steps:"
echo "1. Configure your Apache VirtualHosts (see deployment_plan.md)"
echo "2. Deploy Backend & Frontend codes"
echo "3. Run Certbot for SSL"
