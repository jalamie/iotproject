// src/utils/firebaseConfig.js

import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDc3qxRx6i28a_tY3bMB0tXWK3jM7MUo-g",
    authDomain: "capstone-sal.firebaseapp.com",
    projectId: "capstone-sal",
    storageBucket: "capstone-sal.firebasestorage.app",
    messagingSenderId: "506687469413",
    appId: "1:506687469413:web:661076c64cf63e6197138c",
    measurementId: "G-YPD0ZE5W55"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);