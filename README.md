# CRM System

A customer relationship management (CRM) system built with Node.js, Express, and MongoDB. It includes user authentication, company setup, and admin and customer dashboards for managing users, customers, enquiries, orders, and advanced searches.

## Features

- **User Authentication:** Secure login for admins and customers.
- **Company Setup:** Admins can set up new companies.
- **Admin Dashboard:** Manage users, customers, enquiries, and orders.
- **Customer Dashboard:** Customers can view and manage their own data.
- **Advanced Search:** Powerful search functionality for admins.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/j-rxdriguez/Customer-Relationships-Management-system.git
    ```

2. Navigate to the project directory:
    ```sh
    cd crm-system
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Set up MongoDB and configure the connection string in `app.js`:
    ```js
    mongoose.connect('mongodb://localhost:27017/myDatabase')
    ```

5. Start the server:
    ```sh
    npm start
    ```

6. Open your browser and go to:
    ```
    http://localhost:3001/
    ```

## Usage

- **Admin Registration:** Go to `/admin/register` to set up a new company.
- **Admin Login:** Go to `/admin/login` to log in as an admin.
- **Customer Registration:** Go to `/customer/register` to register as a customer.
- **Customer Login:** Go to `/customer/login` to log in as a customer.
