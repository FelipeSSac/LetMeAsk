import { useEffect, useState } from "react";

import { database } from '../services/firebase';
import { useAuth } from "./useAuth";

export function useListRooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Array<string>>([]);

  useEffect(() => {
    const userRef = database.ref('rooms');


    if (user?.id) {
      userRef.orderByChild('authorId').equalTo(user?.id).once('child_added', (value, prevChildKey) => {
        value.key && (setRooms([...rooms, value.key]))
        prevChildKey && (setRooms([...rooms, prevChildKey]))
      });
    }

    return () => {
      userRef.off('value')
    }
  }, []);

  return { rooms }
}