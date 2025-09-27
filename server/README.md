# Library Management System - Backend API

A comprehensive MERN stack library management system backend built with Node.js, Express.js, and MongoDB. This system provides complete functionality for managing books, users, transactions, reservations, and more.

## 🚀 Features

### Core Features
- **User Management**: Registration, authentication, role-based access control
- **Book Management**: CRUD operations, ISBN management, categorization
- **Circulation Management**: Borrowing, returns, renewals, fine calculation
- **Reservation System**: Book reservations with queue management
- **Search & Discovery**: Advanced search with filters and sorting
- **Category & Author Management**: Hierarchical categories and author profiles

### Advanced Features
- **Email Notifications**: Welcome emails, due reminders, overdue notifications
- **Fine Management**: Automatic calculation, payment processing
- **Analytics & Reporting**: Statistics and reports for admins
- **Security**: JWT authentication, input validation, rate limiting
- **API Documentation**: Comprehensive REST API with proper error handling

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/library_management
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=noreply@library.com
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | User login | Public |
| GET | `/auth/profile` | Get user profile | Private |
| PUT | `/auth/profile` | Update profile | Private |
| PUT | `/auth/change-password` | Change password | Private |
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password/:token` | Reset password | Public |

### Book Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/books` | Get all books | Public |
| GET | `/books/search` | Search books | Public |
| GET | `/books/:id` | Get single book | Public |
| POST | `/books` | Create book | Admin/Librarian |
| PUT | `/books/:id` | Update book | Admin/Librarian |
| DELETE | `/books/:id` | Delete book | Admin |
| POST | `/books/:id/reviews` | Add book review | Private |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users` | Get all users | Admin/Librarian |
| GET | `/users/:id` | Get single user | Admin/Librarian/Own |
| POST | `/users` | Create user | Admin |
| PUT | `/users/:id` | Update user | Admin/Own |
| DELETE | `/users/:id` | Delete user | Admin |
| GET | `/users/:id/history` | Get user history | Admin/Librarian/Own |

### Transaction Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/transactions` | Get all transactions | Admin/Librarian |
| POST | `/transactions/borrow` | Borrow book | Private |
| PUT | `/transactions/:id/return` | Return book | Admin/Librarian |
| PUT | `/transactions/:id/renew` | Renew book | Private |
| PUT | `/transactions/:id/pay-fine` | Pay fine | Private |
| GET | `/transactions/overdue` | Get overdue transactions | Admin/Librarian |

### Reservation Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/reservations` | Get all reservations | Admin/Librarian |
| POST | `/reservations` | Create reservation | Private |
| GET | `/reservations/:id` | Get single reservation | Admin/Librarian/Own |
| PUT | `/reservations/:id` | Update reservation | Admin/Librarian |
| DELETE | `/reservations/:id` | Cancel reservation | Admin/Librarian/Own |

### Categories & Authors

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/categories` | Get all categories | Public |
| POST | `/categories` | Create category | Admin |
| PUT | `/categories/:id` | Update category | Admin |
| DELETE | `/categories/:id` | Delete category | Admin |
| GET | `/authors` | Get all authors | Public |
| POST | `/authors` | Create author | Admin/Librarian |
| PUT | `/authors/:id` | Update author | Admin/Librarian |

## 🔐 User Roles

### Admin
- Full system access
- User management
- System configuration
- All CRUD operations

### Librarian
- Book management
- Transaction processing
- User assistance
- Reports and analytics

### Member
- Browse books
- Borrow/return books
- Manage reservations
- View personal history

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/librarian/member),
  phone: String,
  address: Object,
  membershipDate: Date,
  status: String (active/inactive/suspended)
}
```

### Books Collection
```javascript
{
  title: String,
  authors: [ObjectId],
  isbn: String (unique),
  genre: ObjectId,
  publisher: String,
  copies: Number,
  availableCopies: Number,
  description: String,
  status: String (available/unavailable)
}
```

### Transactions Collection
```javascript
{
  userId: ObjectId,
  bookId: ObjectId,
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: String (borrowed/returned/overdue),
  fineAmount: Number,
  finePaid: Boolean,
  renewalCount: Number
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet Security**: Security headers and protection
- **Error Handling**: Secure error responses without sensitive data

## 📧 Email Notifications

The system supports automated email notifications for:
- Welcome emails for new users
- Due date reminders
- Overdue book notifications
- Reservation availability alerts
- Fine payment confirmations
- Password reset emails

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library_management
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### PM2 Process Management
```bash
npm install -g pm2
pm2 start server.js --name "library-api"
pm2 startup
pm2 save
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## 🔧 Configuration

### Fine Calculation
- Default fine: $2.00 per day
- Maximum renewals: 2 per book
- Loan period: 14 days

### Rate Limiting
- General API: 100 requests per 15 minutes
- Authentication: 10 requests per 15 minutes

### File Upload
- Maximum file size: 5MB
- Supported formats: Images for book covers and user avatars

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/status`

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- Complete user management system
- Book and transaction management
- Reservation system
- Email notifications
- Security features

---

**Built with ❤️ for efficient library management**
