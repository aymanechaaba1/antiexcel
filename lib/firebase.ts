import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6xSM2C17sJEyzVPpeHWnomnJ5sqLd-GA',
  authDomain: 'school-manager-e26b7.firebaseapp.com',
  projectId: 'school-manager-e26b7',
  storageBucket: 'school-manager-e26b7.appspot.com',
  messagingSenderId: '873780545888',
  appId: '1:873780545888:web:3f2b17ed0af04ee07cf605',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
