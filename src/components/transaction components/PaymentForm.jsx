// PaymentForm.jsx
import React, { useState } from 'react';

function PaymentForm({ onSubmit }) {
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const isCardNumberValid = (input) => {
    return /^\d{16}$/.test(input);
  }

  const isCvvValid = (input) => {
    return /^\d{3}$/.test(input);
  }

  const isExpiryValid = (input) => {
    return /^\d{4}$/.test(input);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const { cardNumber, expiry, cvv } = paymentDetails;
    if (isCardNumberValid(cardNumber) && isExpiryValid(expiry) && isCvvValid(cvv)) {
      onSubmit(paymentDetails);
    }
    else {
      alert('Invalid input. Please check your details and try again.');
    }
  };


  return (
    
    <div>
      <h2>Enter Payment Details (Visa, Discover, or Mastercard ONLY)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardName">Name on Card: </label>
          <input
            type="text"
            name="cardName"
            placeholder="Name on Card"
            value={paymentDetails.cardName}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor = "cardNumber">Card Number: </label>
          <input
           type="text"
           name="cardNumber"
           placeholder="Card Number"
           value={paymentDetails.cardNumber}
           onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor = "expiry">Expiration Date : </label>
          <input
            type="text"
            name="expiry"
            placeholder="Expiration Date (MMYY)"
            value={paymentDetails.expiry}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor = "cvv">CVV :</label>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Next</button>
    </form>
  </div>
  );
}

export default PaymentForm;
