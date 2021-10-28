import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [acctName, setAcctName] = useState("");
  const [balance, setBalance] = useState(0);

  const contextData = useContext(AuthContext);
  
  let history = useHistory();
  
  const acctNameInput = (e) => {
    setAcctName(e.target.value);
  };
  
  const balanceInput = (e) => {
    setBalance(e.target.value);
  };
  
  const handleAcctOpen = async (e) => {
    e.preventDefault();

    console.table({ acctName, balance, id: localStorage.getItem("userID") });
    contextData.onCreateAcct(acctName, balance, localStorage.getItem("userID"));

    setAcctName("");
    setBalance("");
    history.push("/profile");
  };
  
  return (
    <>
      <h1>Open a new account:</h1>
      <form onSubmit={handleAcctOpen} className={styles["ca-form"]}>
        <label htmlFor="account-name">Account Name:</label>
        <input 
          type="text" 
          name="account-name" 
          value={acctName}
          onChange={acctNameInput}
          autoComplete="off"
          required
        />
        
        <label htmlFor="balance">Balance:</label>
        <input 
          type="number" 
          name="balance" 
          value={balance}
          onChange={balanceInput}
          autoComplete="off"
          min="0"
          required
        />
        
        <input 
          type="submit" 
          value="Create Account" 
        />
    </form>
    </>
  )
};

export default CreateAccount;