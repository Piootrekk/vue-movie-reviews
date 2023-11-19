import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import env from '@/env.js';

initializeApp(env.firebaseConfig);
const auth = getAuth();

export default auth;