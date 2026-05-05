import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, collectionName));

        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setData(docs);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити дані з бази.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};

export default useFirestore;