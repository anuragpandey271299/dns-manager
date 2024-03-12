import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import styles from './AddDNSModal.module.css'

function AddDNSModal() {
  const [sourceIP,setSourceIP]=useState('')
  const [serverName,setServerName]=useState('')
  const [recordType,SetRecordType]=useState('')
  const [domain,setDomain]=useState('')
  const [ttl,setTtl]=useState('')
  const [ipAddress,setIpAddress]=useState('')

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!sourceIP || !serverName || !recordType || !domain || !ttl || !ipAddress) {
      alert('All fields are required.');
      return;
    }
    try{
      const jwt=localStorage.getItem('jwt')
      const config = {
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json',
        },
    };
      const response=await axios.post('https://dns-manager-backnend.onrender.com/creatednsrecord',{sourceIP,serverName,recordType,domain,ttl,ipAddress},config)
      if(response.status===201){
        toast.success('DNS added')
        navigate('/dashboard')
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={styles.addContainer}>
    <form>
      <div className={styles.addinputs}>
        Source IP
        <input name='sourceIP' value={sourceIP} onChange={(e)=>setSourceIP(e.target.value)}/>
      </div>
      <div className={styles.addinputs}>
        Server name
        <input name='serverName' value={serverName} onChange={(e)=>setServerName(e.target.value)} />
      </div>
      <div className={styles.addinputs}>
        Record Type
        <select name='recordType' value={recordType} onChange={(e)=>SetRecordType(e.target.value)}>
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
        <input name='ttl' value={domain} onChange={(e)=>setDomain(e.target.value)} />
      </div>
      <div className={styles.addinputs}>
        TTL
        <input name='ttl' type='number' value={ttl} onChange={(e)=>setTtl(e.target.value)} />
      </div>
      <div className={styles.addinputs}>
        IP Address
        <input name='ipAddress' value={ipAddress} onChange={(e)=>setIpAddress(e.target.value)} />
      </div>
        <button type='submit' onClick={handleSubmit}>Add DNS Record</button>
    </form>
    </div>
  )
}

export default AddDNSModal