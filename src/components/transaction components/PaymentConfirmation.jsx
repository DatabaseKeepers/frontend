// PaymentConfirmation.jsx
import React from 'react';



function PaymentConfirmation({ paymentDetails, onConfirm, onGoBack}) {
  const maskedCardNumber = 'X'.repeat(12) + paymentDetails.cardNumber.substring(12);

  return (
    <div>
      <h2>Confirm Payment Details</h2>
      <p>Name on Card: {paymentDetails.cardName}</p>
      <p>Card Number: {maskedCardNumber}</p>
      <p>Expiry Date: {paymentDetails.expiry}</p>
      <p>CVV: {paymentDetails.cvv}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onGoBack}>Go Back</button>
      
    </div>
  );
}

export default PaymentConfirmation;
