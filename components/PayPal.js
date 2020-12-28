import React from "react";

export const SubscriptionButton = () => {
  return <div id={`paypal-sub-button-container`} />;
};

export const DonateButton = () => {
  return (
    <div id="smart-button-container">
      <div style={{textAlign: "center"}}>
        <label htmlFor="description">Name </label>
        <input
          type="text"
          name="descriptionInput"
          id="description"
          maxLength="127"
          value=""
        />
      </div>
      <p
        id="descriptionError"
        style={{visibility: "hidden", color: "red", textAlign: "center"}}
      >
        Please enter a description
      </p>
      <div style={{textAlign: "center"}}>
        <label htmlFor="amount">Amount </label>
        <input name="amountInput" type="number" id="amount" value="" />
        <span> USD</span>
      </div>
      <p
        id="priceLabelError"
        style={{visibility: "hidden", color: "red", textAlign: "center"}}
      >
        Please enter a price
      </p>
      <div id="invoiceidDiv" style={{textAlign: "center", display: "none"}}>
        <label htmlFor="invoiceid"> </label>
        <input
          name="invoiceid"
          maxLength="127"
          type="text"
          id="invoiceid"
          value=""
        />
      </div>
      <p
        id="invoiceidError"
        style={{visibility: "hidden", color: "red", textAlign: "center"}}
      >
        Please enter an Invoice ID
      </p>
      <div
        style={{textAlign: "center", marginTop: "0.625rem"}}
        id="paypal-button-container"
      ></div>
    </div>
  );
};
