# React + Firebase 實作示例

## 1. React組件結構
```
src/
├── components/
│   ├── Header/
│   ├── HeroSection/
│   ├── ServiceCard/
│   ├── CreatorProfile/
│   └── Mindmap/
├── pages/
│   ├── Home/
│   ├── Services/
│   ├── Creators/
│   └── Dashboard/
├── hooks/
│   ├── useAuth.js
│   ├── useFirestore.js
│   └── useStorage.js
├── services/
│   ├── firebase.js
│   ├── api.js
│   └── storage.js
└── utils/
    ├── helpers.js
    └── constants.js
```

## 2. Firebase配置示例
```javascript
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // 你的Firebase配置
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 3. 資料結構設計
```javascript
// Firestore集合結構
users: {
  [userId]: {
    email: string,
    name: string,
    type: 'creator' | 'client',
    profile: object,
    createdAt: timestamp
  }
}

services: {
  [serviceId]: {
    title: string,
    description: string,
    price: number,
    creatorId: string,
    category: string,
    images: array,
    createdAt: timestamp
  }
}

orders: {
  [orderId]: {
    serviceId: string,
    clientId: string,
    creatorId: string,
    status: 'pending' | 'active' | 'completed',
    amount: number,
    createdAt: timestamp
  }
}
```

## 4. React Hook示例
```javascript
// useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
```

## 5. Tailwind組件示例
```jsx
// ServiceCard.jsx
const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={service.image} 
        alt={service.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            NT$ {service.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            查看詳情
          </button>
        </div>
      </div>
    </div>
  );
};
```

## 6. 部署配置
```yaml
# .github/workflows/deploy-react.yml
name: Deploy React App
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```
