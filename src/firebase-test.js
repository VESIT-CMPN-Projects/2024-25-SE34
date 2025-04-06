import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Test if Firebase is correctly initialized
console.log('Firebase authentication object:', auth);
console.log('Firebase database object:', db);

// Test creating a user
async function testCreateUser() {
  try {
    console.log('Testing user creation...');
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'Password123!'
    );
    console.log('User created successfully:', userCredential.user);
  } catch (error) {
    console.error('Error creating user:', error.code, error.message);
  }
}

// Run the test
testCreateUser(); 