import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import AddDNSModal from './AddDNSModal';
import axios from 'axios';
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showEditDNSModal, setShowEditDNSModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const config = {
          headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get('https://dns-manager-backnend.onrender.com/getuser', config); 
        setUser(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.dashboardpage}>
      {user && <div id={styles.welcome}>Welcome, <span>{user.firstName} {user.lastName}!</span></div>}
      <div className={styles.buttons}>
      <button onClick={() => { setShowDashboard(true); setShowEditDNSModal(false); }}>DNS Dashboard</button>
      <button onClick={() => { setShowDashboard(false); setShowEditDNSModal(true); }}>Add DNS records</button>
      </div>
      {showDashboard && <Dashboard />}
      {showEditDNSModal && <AddDNSModal />}
    </div>
  );
}

export default DashboardPage;
