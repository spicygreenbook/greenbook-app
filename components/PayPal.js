import React from "react";

export const DonateButton = () => {
  return (
    <>
      <link href="/paypal.css" rel="stylesheet" />

      <div className="flex-container">
        <div className="align-right">
          <img src="/images/paypal.png" className="paypal-img" />
        </div>

        <div className="col-1">
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="top"
          >
            <input
              type="hidden"
              name="hosted_button_id"
              value="54M2WUMT6FTDU"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_US/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
      </div>
    </>
  );
};
