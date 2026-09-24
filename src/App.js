import { useState } from "react";
import { FiArrowUp, FiCoffee, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiLock, FiMail, FiYoutube, FiCode } from "react-icons/fi";
import "./App.css";

const links = [
  ["Portfolio", "https://www.ashishranjan.net/", FiGlobe],
  ["GitHub", "https://github.com/a2rp", FiGithub],
  ["CodePen", "https://codepen.io/ash1198", FiCode],
  ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin],
  ["Facebook", "https://www.facebook.com/theash.ashish/", FiFacebook],
  ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiYoutube],
  ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
  ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
  ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
  ["Patreon", "https://patreon.com/a2rp", FiHeart],
];

function App() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 1) {
      setStatus("Enter an amount of at least ₹1.");
      return;
    }

    if (typeof window.Razorpay !== "function") {
      setStatus("Payment checkout is unavailable right now.");
      return;
    }

    setStatus("");
    const payment = new window.Razorpay({
      key: "rzp_test_ONyaLZToaGIma6",
      amount: Math.round(numericAmount * 100),
      currency: "INR",
      name: "Startup Projects",
      description: "Razorpay checkout demo",
      handler: (response) => {
        setStatus(`Payment created: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Ashish",
        email: "ash.ranjan09@gmail.com",
        contact: "8123747965",
      },
      notes: { address: "Bengaluru" },
      theme: { color: "#2563eb" },
      modal: { ondismiss: () => setStatus("Checkout closed.") },
    });
    payment.open();
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Razorpay checkout home">
          <img src="/logo.png" alt="Ashish Ranjan logo" />
          <span><small>A2RP</small>Razorpay Checkout</span>
        </a>
        <span className="header-note"><FiLock aria-hidden="true" /> Test mode</span>
      </header>

      <main id="top" className="page-content">
        <section className="intro">
          <p className="eyebrow">Payment integration demo</p>
          <h1>Simple Razorpay checkout for React.</h1>
          <p>Enter an amount to open the Razorpay test checkout flow. This project demonstrates the browser-side integration only.</p>
        </section>

        <section className="payment-card" aria-labelledby="payment-title">
          <div className="card-heading">
            <div><span className="card-kicker">Try the flow</span><h2 id="payment-title">Start a test payment</h2></div>
            <span className="currency">INR</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="amount">Amount</label>
            <div className="amount-field"><span aria-hidden="true">₹</span><input id="amount" type="number" min="1" step="1" inputMode="numeric" placeholder="500" value={amount} onChange={(event) => setAmount(event.target.value)} /></div>
            <button className="pay-button" type="submit">Open checkout <span aria-hidden="true">→</span></button>
          </form>
          <p className={`status ${status ? "visible" : ""}`} role="status">{status}</p>
        </section>

        <section className="info-grid">
          <article><strong>Test mode</strong><span>Use test credentials while exploring the checkout.</span></article>
          <article><strong>Secure setup</strong><span>Only the public checkout key belongs in frontend code.</span></article>
          <article><strong>Responsive</strong><span>The payment card works across small and large screens.</span></article>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><span>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span><div className="footer-links">{links.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon aria-hidden="true" /><span className="sr-only">{label}</span></a>)}</div></div>
      </footer>

      <button className="top-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top"><FiArrowUp /></button>
    </div>
  );
}

export default App;
