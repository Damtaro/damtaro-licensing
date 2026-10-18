// Local QA only. This entry is not imported by the application or included in dist.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/index.css';
import BusinessStemInfo from '../../src/components/licensing/BusinessStemInfo';
import CartDrawer from '../../src/components/cart/CartDrawer';
const fixture = { officialStems: { verificationStatus: 'verified', count: 3, labels: ['TEST FIXTURE - layer A', 'TEST FIXTURE - layer B', 'TEST FIXTURE - layer C'] }, privateDownloadUrl: 'https://private.invalid/protected-stem.wav' };
export default function Harness() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ id: 'qa-cart', track: { id: 9, title: 'TEST FIXTURE' }, license: { type: 'business', title: 'Business License' } }]);
  const [checkout, setCheckout] = useState(false);
  return <div className="min-h-screen bg-black p-6 text-white"><h1>Local component QA fixture</h1><BusinessStemInfo track={fixture} /><button onClick={() => setOpen(true)}>Open test cart</button><p role="status">{checkout ? 'Checkout callback received' : 'Ready'}</p><CartDrawer selectedCurrency={{ code: 'USD' }} open={open} items={items} onClose={() => setOpen(false)} onRemoveItem={id => setItems(current => current.filter(item => item.id !== id))} onContinueShopping={() => setOpen(false)} onProceedToCheckout={() => { setCheckout(true); setOpen(false); }} /></div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><Harness /></React.StrictMode>);
