import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    useStripe,
    Elements,
    useElements,
} from "@stripe/react-stripe-js";

let pk = "pk_test_51GvEQwLe7hUMH3W59ROr76MUKnm9Bowt8lZ4QMnGLaALu41kXuF1qX47mtjSLfwfVwuiBnP4PuI36ReryayJE02C008ouVbLzs";

if (typeof window !== "undefined") {
    if (window && window.location && window.location.host.indexOf("greenbook") > -1) {
        pk = "pk_live_51GvEQwLe7hUMH3W5kV9rWA1fDMDLPDVI0j8wtanT09j2hoWTGb5z48VJ8M3Kuu8Rc5P3yP3Rjldad9MQwohN96td00LjNcA16c";
    }
}

const stripePromise = loadStripe(pk);

function format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function num(num) {
    return (((num || "") + "").replace(/[^0-9\.\-]/gi, "") || 0) * 1;
}

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    if (typeof document === 'undefined') {
        // console.log('is not web do not continue');
        return <span />;
    }
    // console.log("state reset for some reason");

    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(0);
    const [useCustomAmount, setUseCustomAmount] = useState(false);
    const [fields, setFields] = useState({
        amount: 50,
    });

    const setValue = (key, value) => {
        let updateFields = { ...fields };
        updateFields[key] = value;
        setFields(updateFields);
        // console.log("fields are", fields);
    };

    const sendApi = (token) => {
        // console.log("sending fields", { token: token, ...fields });

        const card = elements.getElement(CardElement);

        fetch("/api/donation", {
            method: "post",
            body: JSON.stringify({ token: token, ...fields }),
        })
            .then(function (res) {
                // console.log("response is", res);
                return res.json();
            })
            .then(async function (data) {
                // console.log("response is", data);

                if (data.error) {
                    document.getElementById("card-errors").textContent =
                        data.error;
                    return false;
                } else {
                    try {
                        const result = await stripe.confirmCardPayment(
                            data.intentSecret,
                            {
                                payment_method: {
                                    card: card,
                                    billing_details: { name: fields.name },
                                },
                            }
                        );
                        if (result.error) {
                            // console.log(err);
                            document.getElementById("card-errors").textContent =
                                result.error.message;
                            return false;
                        } else {
                            setSuccess(true);
                        }
                    } catch (err) {
                        // console.log(err);
                        document.getElementById("card-errors").textContent =
                            err.message;
                        return false;
                    }
                }
                setSending(0);
            });
            
    };



    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        setSending(1);

        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the customer that there was an error.
                var errorElement = document.getElementById("card-errors");
                errorElement.textContent = result.error.message;
                setSending(0);
            } else {
                //setValue("token", result.token.id);
                sendApi(result.token.id);
            }
        });
    };

    useEffect(() => {}, [fields, useCustomAmount]);

    let amounts = [15, 25, 50, 100, 150];

    // console.log("render");

    return (
        <div className={'stripe'}>
            <link href="/stripe.css" rel="stylesheet" />
            {success ? (
                <div style={{ margin: "80px 0" }}>
                    <h2>We have received your donation. Thank You!</h2>
                    <p>You should be receiving an email receipt shortly.</p>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    disabled={!sending}
                    action="/api/donation"
                    method="post"
                    id="payment-form"
                >
                    <div className={'formRow'}>
                        <label htmlFor="card-name">Name on card</label>
                        <input
                            type="text"
                            name="name"
                            id="card-name"
                            value={fields.name}
                            onChange={(e) => setValue("name", e.target.value)}
                            required
                        />
                    </div>
                    <div className="formRow">
                        <label htmlFor="card-address">Billing address</label>
                        <div className="flex-row-address">
                            <div className="flex-item-address">
                                <div className={'subLabel'}>
                                    Street address
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="card-address"
                                    value={fields.address}
                                    onChange={(e) =>
                                        setValue("address", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-item-zip">
                                <div className={'subLabel'}>Zip code</div>
                                <input
                                    type="text"
                                    name="name"
                                    id="card-zip"
                                    pattern="^\s*\d{5}(-\d{4})?\s*$"
                                    size="5"
                                    value={fields.zip}
                                    onChange={(e) =>
                                        setValue("zip", e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'formRow'}>
                        <label htmlFor="card-email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="card-email"
                            value={fields.email || ""}
                            onChange={(e) => setValue("email", e.target.value)}
                            required
                        />
                    </div>
                    <div className="formRow">
                        <label htmlFor="card-amount">Donation Amount</label>
                        <div className="flex-row-amounts">
                            {amounts.map((n) => (
                                <span
                                    key={n}
                                    className={
                                        'amount_box' +
                                        " " +
                                        (fields.amount === n
                                            ? 'amount_selected'
                                            : "")
                                    }
                                    onClick={(e) => {
                                        setValue("amount", n);
                                        setUseCustomAmount(false);
                                    }}
                                >
                                    ${format(n)}
                                </span>
                            ))}
                            <span
                                className={
                                    'amount_box' +
                                    " " +
                                    (useCustomAmount
                                        ? 'amount_selected'
                                        : "")
                                }
                                onClick={(e) => {
                                    if (!useCustomAmount) {
                                        setValue("amount", "");
                                        setUseCustomAmount(true);
                                    } else {
                                        // do nothing its already custom
                                    }
                                }}
                            >
                                Custom
                            </span>
                            {useCustomAmount && (
                                <div>
                                    <input
                                        type="number"
                                        name="custom-amount"
                                        placeholder="Amount"
                                        value={fields.amount || ""}
                                        onChange={(e) =>
                                            setValue("amount", num(e.target.value))
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'formRow'}>
                        <label htmlFor="card-element">
                            Credit or debit card
                        </label>
                        <div
                            id="card-element"
                            className={'card_element'}
                            style={{ margin: "20px 0" }}
                        >
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            color: "#828282",
                                            fontFamily:
                                                '"noto sans", "Helvetica Neue", Helvetica, sans-serif',
                                            fontSmoothing: "antialiased",
                                            fontSize: "20px",
                                            borderRadius: "5px",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#fa755a",
                                            iconColor: "#fa755a",
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div id="card-errors" role="alert"></div>
                    </div>
                    <div className="form-row">
                        <button id="card-button" disabled={!stripe && !sending} className={'button'} sending={sending}>
                            {sending ? 
                                (<span>Processing Donation...</span>) : 
                                (<span>Donate ${format(fields.amount)}</span>)
                            }
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

const Striper = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};
export default Striper;
