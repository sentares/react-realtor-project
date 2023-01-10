import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
// const firebaseConfig = {
// 	apiKey: 'AIzaSyCeN1OG20LHodqImgTLth029Yqtuf-DvtI',
// 	authDomain: 'realtor-project-c895c.firebaseapp.com',
// 	projectId: 'realtor-project-c895c',
// 	storageBucket: 'realtor-project-c895c.appspot.com',
// 	messagingSenderId: '707376208185',
// 	appId: '1:707376208185:web:084c939d337a491254f0e8',
// 	measurementId: 'G-ZH3ZFN62JP',
// }

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage()
