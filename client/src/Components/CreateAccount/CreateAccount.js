import React, { useState } from "react";
import { useHistory } from "react-router";

const CreateAccount = () => {
  const [acctType, setAcctType] = useState("checking");
  const [balance, setBalance] = useState(0);

  let history = useHistory();
  
  const acctTypeInput = (e) => {
    console.log(e.target.value);
    setAcctType(e.target.value);
  };
  
  const balanceInput = (e) => {
    setBalance(e.target.value);
  }
  
  const handleAcctOpen = async (e) => {
    e.preventDefault();
    
    console.table({ acctType: acctType, balance });
  }

  return (
    <>
      <h1>Open a new account:</h1>
      <form onSubmit={handleAcctOpen}>
        <label htmlFor="account-type">Account Type:</label>
        <select 
          value={acctType} 
          onChange={acctTypeInput}
          required>
            <option value="checking">checking</option>
            <option value="savings">savings</option>
          </select>
        
        <label htmlFor="balance">Balance:</label>
        <input 
          type="number" 
          name="balance" 
          value={balance}
          onChange={balanceInput}
          autoComplete="off"
          required
        />
        
        <input 
          type="submit" 
          value="Open Account" 
        />
    </form>
    </>
  )
};

export default CreateAccount;