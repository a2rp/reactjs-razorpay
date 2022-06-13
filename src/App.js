import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    const [amount, setAmount] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (amount==="") {
            alert ("pls enter amount");
        }
        else {
            // alert (amount);
            let options = {
                key: "rzp_test_ONyaLZToaGIma6",
                key_secret: "r9y7ZS5n6ABbu1P2xD1wljSB",
                amount: amount * 100,
                currency: "INR",
                name: "STARTUP_PROJECTS",
                description: "for testing purpose",
                handler: (response) => {
                    alert (response.razor_payment_id);
                },
                prefill: {
                    name: "Ashish",
                    email: "ash.ranjan09@gmail.com",
                    contact: "8123747965",
                },
                notes: {
                    address: "BTM Layout, Bengaluru"
                },
                theme: {
                    color: "#123"
                }
            };
            let pay = new window.Razorpay(options);
            pay.open();
        }
    };
    return (
        <div className="App">
            <h3>Razorpay payment integration with reactjs</h3>
            <input type="text" placeholder="enter amount" value={amount} onChange={(event)=>setAmount(event.target.value)} /> 
            <button onClick={handleSubmit}>submit</button>
        </div>
    );
}

export default App;
