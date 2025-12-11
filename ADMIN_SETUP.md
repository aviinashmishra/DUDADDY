# Du Daddy Admin Setup

## Admin Credentials

**Email:** `dudaddyworld@gmail.com`  
**Password:** `Dud@ddy01`

## How to Access Admin Panel

1. **Go to Login Page**: Navigate to `/auth/signin`
2. **Enter Admin Email**: Type `dudaddyworld@gmail.com`
3. **Enter Password**: The system will detect this is an admin email and ask for password instead of OTP
4. **Enter Password**: Type `Dud@ddy01`
5. **Access Admin Panel**: You'll be redirected to `/admin`

## Admin Features

### 🏠 Dashboard
- Real-time business metrics
- Revenue, orders, customers overview
- Recent orders and top products
- Quick action buttons

### 📦 Products Management
- Complete product catalog
- Add/Edit/Delete products
- Stock management with alerts
- Ayurvedic ingredients tracking
- Categories and certifications

### 📋 Orders Management
- Order tracking and status updates
- Customer information display
- Payment status monitoring
- Advanced filtering and search
- Export functionality

### 👥 Customers Management
- Customer profiles and analytics
- Tier system (Bronze, Silver, Gold, VIP)
- Purchase history tracking
- Loyalty points management
- Communication preferences

### 📊 Analytics Dashboard
- Revenue trends and growth analysis
- Customer behavior insights
- Product performance metrics
- Geographic distribution
- Sales channel analysis

### 🎫 Coupons Management
- Create and manage discount coupons
- Usage tracking and analytics
- Customer targeting options
- Expiry and status management

### ⚙️ Settings
- Store configuration
- Payment gateway setup
- Shipping preferences
- SEO settings
- Security controls

## Technical Details

- **Authentication**: Password-based for admin, OTP-based for regular users
- **Role-based Access**: Admin role required for panel access
- **Database**: Prisma with PostgreSQL
- **UI Framework**: React with Tailwind CSS
- **Theme**: Dark theme with Du Daddy red accents (#de2529)

## Security Features

- Admin-only access control
- Session management
- Secure password authentication
- Role verification on each request

## Development Notes

The admin system is designed as a single-vendor solution specifically for Du Daddy's Ayurvedic supplement business. All features are tailored for this use case with specialized fields for ingredients, benefits, and certifications.