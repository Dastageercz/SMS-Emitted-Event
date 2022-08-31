import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import ABI from "./metadata/abi.json";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const address = "0xf42DCEACebdd4C8E6D38bfcD0854CEb667044FAC";
  let ETHAmount;

  const Donate = async () => {
    if (!!window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      let DonateContract = new ethers.Contract(address, ABI, signer);
      let donate = DonateContract.connect(signer);
      donate.newDonation({ value: amount });

      //event Emit
      DonateContract.on("Donate", async(from, amount) => {
        await fetch(
          `http://localhost:4000/send-text?recipient=${phoneNumber}&message=${await amount.toString()}`
        ).catch((err) => console.log(err));

      }); 
    }
  };

  return (
    <div className="App">
      <h1>Event Interaction</h1>
      <h3>Enter Amount you want to donate</h3>
      <div>
        {" "}
        <input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          input="number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button onClick={Donate}>Donate</button>
      </div>
    </div>
  );
};

export default App;
