import React, { useEffect, useState } from 'react';
import axios from 'axios';
import editIMG from './images/editIMG.png';
import EditModal from './EditModal';
import deleteIMG from './images/deleteIMG.png';
import styles from './Dashboard.module.css'
import { toast } from 'react-toastify';

function Dashboard() {
  const [dnsRecords, setDnsRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const config = {
          headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.get('https://dns-manager-backnend.onrender.com/getdnsrecord', config);
        setDnsRecords(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedRecord]);

  const handleEditClick = (record) => {
    setSelectedRecord(record);
  };

  const handleDeleteClick = async (record) => {
    try {
      const jwt = localStorage.getItem('jwt');
      const config = {
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json',
        },
      };

      await axios.delete(`https://dns-manager-backnend.onrender.com/deletednsrecord/${record._id}`, config);
      setDnsRecords((prevRecords) => prevRecords.filter((r) => r._id !== record._id));
      toast.success('DNS record Deleted')
      setSelectedRecord(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    setSelectedRecord(null);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>DNS Records Dashboard</h1>
      <table >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Source IP</th>
            <th>Server Name</th>
            <th>Record Type</th>
            <th>Domain</th>
            <th>TTL</th>
            <th>IP Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dnsRecords.map((record, index) => (
            <tr key={record._id}>
              <td>{index + 1}</td>
              <td>{record.sourceIP}</td>
              <td>{record.serverName}</td>
              <td>{record.recordType}</td>
              <td>{record.domain}</td>
              <td>{record.ttl}</td>
              <td>{record.ipAddress}</td>
              <td>
                <img src={editIMG} alt="Edit" onClick={() => handleEditClick(record)} />
                <img src={deleteIMG} alt="Delete" onClick={() => handleDeleteClick(record)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRecord && (
                <div className={styles.modalOverlay}>
                <EditModal
                  record={selectedRecord}
                  onClose={() => setSelectedRecord(null)}
                  onUpdate={handleUpdate}
                />
              </div>
      )}
    </div>
  );
}

export default Dashboard;
