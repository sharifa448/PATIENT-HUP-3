import { useMemo, useState } from "react";
import "./App.css";

const pharmacies = [
  { id: 1, name: "Carry Medical", medicine: "Esomeprazole", price: 10, description: "Fresh medicines and excellent quality drugs", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=700&q=85" },
  { id: 2, name: "Pool Medical", medicine: "Esomeprazole", price: 9, description: "High quality is our strength", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=85" },
  { id: 3, name: "OK Pharmacy", medicine: "Esomeprazole", price: 8, description: "Different medicines for your daily needs", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=700&q=85" },
  { id: 4, name: "Hamza Pharma", medicine: "Esomeprazole", price: 11, description: "Quality medicines and friendly service", image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=700&q=85" },
];

const menuItems = [
  ["▦", "Dashboard"], ["▤", "Appointments"], ["♙", "Find Doctor"], ["▣", "Find Clinic"],
  ["☏", "Chat"], ["▤", "Find MarketPlace"], ["✚", "Find Pharmacy"], ["♧", "My Dependents"],
  ["⚒", "My Account"], ["⚙", "Settings"],
];

function App() {
  const [activePage, setActivePage] = useState("Find Pharmacy");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  const filteredPharmacies = useMemo(() => pharmacies.filter((pharmacy) =>
    `${pharmacy.name} ${pharmacy.medicine}`.toLowerCase().includes(search.toLowerCase())
  ), [search]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(pharmacy) {
    setCart((current) => {
      const existing = current.find((item) => item.id === pharmacy.id);
      return existing
        ? current.map((item) => item.id === pharmacy.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...pharmacy, quantity: 1 }];
    });
    setMessage(`${pharmacy.medicine} from ${pharmacy.name} added to cart.`);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) return;
    setMessage(`Demo order placed for ${customer.name}. Total: ${cartTotal} RM. This project is not connected to a real payment system.`);
    setCart([]);
    setCustomer({ name: "", phone: "", address: "" });
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  return (
    <div className="dashboard">
      <aside className={`sidebar ${menuOpen ? "" : "sidebar-closed"}`}>
        <div className="logo"><span className="logo-mark">My<span>HUB</span></span><small>Smart Healthcare</small></div>
        <nav className="menu" aria-label="Main menu">
          {menuItems.map(([icon, label]) => <button key={label} className={`menu-item ${activePage === label ? "active" : ""}`} onClick={() => {
            setActivePage(label);
            setMessage(label === "Find Pharmacy" ? "" : `${label} selected. This page is a demo.`);
          }}><span className="menu-icon">{icon}</span><span>{label}</span></button>)}
        </nav>
        <div className="sidebar-note"><span>✚</span><p>Care for your health, every day.</p></div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="page-heading">
            <div className="breadcrumb">⌂ &nbsp;/&nbsp; {activePage}</div>
            <div className="heading-row"><h2>{activePage}</h2><button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle sidebar">☰</button></div>
          </div>
          <div className="top-actions">
            <label className="search-box"><span>⌕</span><input type="search" placeholder="Search medicines or pharmacies..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
            <button className="cart-top-button" onClick={() => { setCartOpen(true); setCheckoutOpen(false); }}>🛒 <span>Shopping Cart</span><b>{cartCount}</b></button>
            <button className="top-link" onClick={() => setMessage("You have logged out of the demo.")}>● Log out</button>
            <button className="icon-button" aria-label="Settings" onClick={() => setMessage("Settings are not available in this demo.")}>⚙</button>
          </div>
        </header>

        <section className="content-panel">
          <div className="content-intro"><div><span className="eyebrow">MY PATIENT HUB · PHARMACY</span><h1>Search Pharmacies for Medicines</h1><p>Choose a pharmacy and add the medicines you need to your shopping cart.</p></div><div className="intro-icon">✚</div></div>
          {message && <div className="notice" role="status"><span>{message}</span><button onClick={() => setMessage("")} aria-label="Close message">×</button></div>}
          <div className="results-line"><span><strong>{filteredPharmacies.length}</strong> pharmacies found</span><span className="results-tip">Prices are shown in RM</span></div>
          <div className="pharmacy-grid">
            {filteredPharmacies.map((pharmacy) => <article className="pharmacy-card" key={pharmacy.id}>
              <div className="product-image"><img src={pharmacy.image} alt={`${pharmacy.medicine} medicine`} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="image-label">Medicine</span><span className="image-heart" aria-hidden="true">♡</span></div>
              <div className="medicine-row"><span>{pharmacy.medicine}</span><strong>{pharmacy.price} <small>RM</small></strong></div>
              <div className="pharmacy-name"><span className="pharmacy-avatar">{pharmacy.name.charAt(0)}</span><div><h3>{pharmacy.name}</h3><span className="pharmacy-caption">Verified Pharmacy</span></div></div>
              <p className="description">{pharmacy.description}</p>
              <button className="buy-button" onClick={() => addToCart(pharmacy)}><span>＋</span> ADD TO CART</button>
            </article>)}
          </div>
          {filteredPharmacies.length === 0 && <div className="empty-message"><span>⌕</span><h3>No results found</h3><p>Try searching for another medicine or pharmacy.</p></div>}
        </section>
        <footer className="footer">© 2026 MyPatientHUB · Pharmacy Dashboard <span>Made for better healthcare</span></footer>
      </main>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <section className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-heading"><div><span className="eyebrow">YOUR ORDER</span><h2 id="cart-title">Your Shopping Cart</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
          {!checkoutOpen ? <>
            {cart.length === 0 ? <div className="cart-empty"><span>🛒</span><h3>Your cart is empty</h3><p>Choose a medicine from the pharmacy list.</p><button className="secondary-button" onClick={() => setCartOpen(false)}>Continue Shopping</button></div> : <>
              <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-info"><strong>{item.medicine}</strong><span>{item.name}</span><b>{item.price} RM</b><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">＋</button></div></div><button className="remove-item" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></div>)}</div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>{cartTotal} RM</strong></div><p>Delivery fees are not included in this demo.</p><button className="checkout-button" onClick={() => setCheckoutOpen(true)}>Proceed to Checkout <span>←</span></button></div>
            </>}
          </> : <form className="checkout-form" onSubmit={placeOrder}><p className="form-intro">Enter the following information to place a demo order.</p><label>Full Name<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Your name" /></label><label>Phone Number<input required type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="Phone Number" /></label><label>Delivery Address<textarea required rows="3" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Your address" /></label><div className="checkout-total"><span>Order Total</span><strong>{cartTotal} RM</strong></div><button className="checkout-button" type="submit">Place Demo Order</button><button className="back-button" type="button" onClick={() => setCheckoutOpen(false)}>Back to Cart</button><small className="demo-disclaimer">This is a demo only. No real order or payment will be processed.</small></form>}
        </section>
      </div>}
    </div>
  );
}

export default App;
