import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from '../firebase';
function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);

          if(doc.docs.length>0){
            const data = doc.docs[0].data();
            setName(data.name);
          }
        } catch (err) {
          console.error(err);
          console.log("An error occured while fetching user data");
        }
      };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
            fetchUserName();
      }, [user, loading]);
  return (
    <div>
        <div>Dashboard</div>
        {
            !loading && user && 
            <div>
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>Logout</button>
            </div>
        }

        {
            loading && <div>LOADING...</div>
        }
        
    </div>
  )
}

export default Dashboard