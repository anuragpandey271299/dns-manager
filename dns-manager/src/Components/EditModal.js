import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './EditModal.module.css'

const EditModal = ({ record, onClose, onUpdate }) => {
  const [editedRecord, setEditedRecord] = useState({ ...record });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwt = localStorage.getItem('jwt');
      const config = {
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(`https://dns-manager-backnend.onrender.com/editdnsrecord/${record._id}`, editedRecord, config);


      if (response.status === 200) {
        onUpdate();
        onClose();
        toast.success('DNS records updated')
      } else {
        console.error('Failed to update DNS record');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.editmodal}>
      <div>
        <h2>Edit DNS Record</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.addinputs}>
            <label>Source IP:</label>
            <input type="text" name="sourceIP" value={editedRecord.sourceIP} onChange={handleInputChange} />
          </div>
          <div className={styles.addinputs}>
            Server Name
            <input type="text" name="serverName" value={editedRecord.serverName} onChange={handleInputChange} />
          </div>
          <div className={styles.addinputs}>
            Record Type
            <select name="recordType" value={editedRecord.recordType} onChange={handleInputChange}>
              <option value="">Select Record Type</option>
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="NS">NS</option>
              <option value="MX">MX</option>
              <option value="TXT">TXT</option>
            </select>
          </div>
          <div className={styles.addinputs}>
            Domain
            <input type="text" name="domain" value={editedRecord.domain} onChange={handleInputChange} />
          </div>
          <div className={styles.addinputs}>
            TTL
            <input type="text" name="ttl" value={editedRecord.ttl} onChange={handleInputChange} />
          </div>
          <div className={styles.addinputs}>
            IP Address
            <input type="text" name="ipAddress" value={editedRecord.ipAddress} onChange={handleInputChange} />
          </div>
          <div className={styles.btns}>
            <button type="submit">Update Record</button>
            <button className="close" onClick={onClose} >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
