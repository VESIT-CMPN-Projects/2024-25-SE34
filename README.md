# Justice For Ghodbunder Road (JFGR) Application

JFGR is a citizen-led movement committed to transforming Ghodbunder Road in Thane into a safer, more efficient route for daily commuters.

## Overview

This web application allows citizens to register complaints about infrastructure issues on Ghodbunder Road, track the status of their complaints, and stay informed about the initiative's activities.

## Features

- **User Authentication**: Secure login and registration system
- **Complaint Registration**: Submit infrastructure-related issues with detailed descriptions and images
- **Admin Dashboard**: Management interface for administrators to track and update complaints
- **Responsive Design**: Mobile-friendly interface for convenient access on any device

## Technology Stack

- **Frontend**: React.js
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (for images)
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/jfgr-app.git
   cd jfgr-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication, Firestore, and Storage services
   - Add your Firebase configuration to `src/firebase.js`

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Project Structure

```
jfgr-app/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── complaints/  # Complaint-related components
│   │   ├── dashboard/   # Admin dashboard components
│   │   └── layout/      # Header, Footer, etc.
│   ├── contexts/        # React contexts
│   ├── pages/           # Page components
│   └── firebase.js      # Firebase configuration
├── package.json         # Project dependencies
└── README.md            # This file
```

## Deployment

1. Build the production version:
   ```
   npm run build
   ```

2. Deploy to a web hosting service of your choice (e.g., Firebase Hosting, Vercel, Netlify)

## Admin Access

To access the admin dashboard:
1. Create a user with the email `admin@jfgr.org`
2. Log in with this account to access the admin features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

For more information about the JFGR initiative, please contact us at info@jfgr.org
