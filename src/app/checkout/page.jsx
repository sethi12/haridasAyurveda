// "use client";
// import { useEffect, useState } from "react";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export default function CheckoutPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // =========================
//   // LOAD RAZORPAY SDK (SAFE WAY)
//   // =========================
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);

//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//   // =========================
//   // FETCH CART
//   // =========================
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const cartId = localStorage.getItem("cartId");
//         const userId = localStorage.getItem("userId");

//         const res = await fetch(
//           userId
//             ? `${BASE_URL}/api/cart/${userId}`
//             : `${BASE_URL}/api/cart`,
//           {
//             headers: {
//               "x-cart-id": cartId || "",
//             },
//           }
//         );

//         const data = await res.json();
//         setCartItems(data.items || []);
//       } catch (err) {
//         console.error("Cart error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // =========================
//   // TOTAL
//   // =========================
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // =========================
//   // PAYMENT HANDLER
//   // =========================
//   const handlePayment = async () => {
//     try {
//       setProcessing(true);

//       if (!form.name || !form.phone || !form.address) {
//         alert("Fill all fields");
//         setProcessing(false);
//         return;
//       }

//       // ✅ Load Razorpay
//       const loaded = await loadRazorpay();
//       if (!loaded) {
//         alert("Payment system failed to load");
//         setProcessing(false);
//         return;
//       }

//       // ✅ Create Razorpay order
//       const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: total }),
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         console.error(text);
//         alert("Payment init failed");
//         setProcessing(false);
//         return;
//       }

//       const data = await res.json();

//       // ✅ Open Razorpay
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: data.order.amount,
//         order_id: data.order.id,
//         currency: "INR",
// handler: async function (response) {
//   try {
//     const verifyRes = await fetch(
//       `${BASE_URL}/api/payment/verify-payment`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//        body: JSON.stringify({
//   ...response,
//   userId: localStorage.getItem("userId"),
//   cartId: localStorage.getItem("cartId"), // 🔥 REQUIRED
//   shipping: form,
// })
//       }
//     );

//     if (!verifyRes.ok) {
//       const text = await verifyRes.text();
//       console.error("Verify failed:", text);
//       alert("Payment verification failed");
//       return;
//     }

//     alert("Payment Successful 🎉");

//     // ✅ Clear cart AFTER success
//     const cartId = localStorage.getItem("cartId");
//     const userId = localStorage.getItem("userId");

//     await fetch(
//       userId
//         ? `${BASE_URL}/api/cart/${userId}`
//         : `${BASE_URL}/api/cart`,
//       {
//         method: "DELETE",
//         headers: {
//           "x-cart-id": cartId || "",
//         },
//       }
//     );

//     // ✅ Redirect
//     // window.location.href = "/success";
//         alert("payment done ")
//   } catch (err) {
//     console.error(err);
//   }
// },

//         theme: {
//           color: "#1B5E20",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Something went wrong");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) return null;

//   return (
//     <div className="min-h-screen bg-[#FDFBF7] p-6">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

//         {/* LEFT */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-bold text-lg mb-4">Your Order</h2>

//           {cartItems.map((item) => (
//             <div key={item.productId} className="flex gap-4 mb-4">
//               <img src={item.image} className="w-16 h-16 rounded object-cover" />
//               <div className="flex-1">
//                 <p className="font-semibold">{item.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Qty: {item.quantity}
//                 </p>
//               </div>
//               <p className="font-bold">
//                 ₹{item.price * item.quantity}
//               </p>
//             </div>
//           ))}

//           <hr className="my-4" />

//           <div className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-bold text-lg mb-4">Shipping Details</h2>

//           <div className="space-y-3">
//             {Object.keys(form).map((key) => (
//               <input
//                 key={key}
//                 placeholder={key.toUpperCase()}
//                 className="w-full border p-3 rounded"
//                 onChange={(e) =>
//                   setForm({ ...form, [key]: e.target.value })
//                 }
//               />
//             ))}

//             <button
//               disabled={processing}
//               className="w-full bg-[#1B5E20] text-white py-3 rounded-lg font-bold mt-4 disabled:opacity-50"
//               onClick={handlePayment}
//             >
//               {processing ? "Processing..." : "Continue to Payment"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const userId = localStorage.getItem("userId");
        const res = await fetch(
          userId ? `${BASE_URL}/api/cart/${userId}` : `${BASE_URL}/api/cart`,
          { headers: { "x-cart-id": cartId || "" } }
        );
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      setProcessing(true);
      if (!form.name || !form.phone || !form.address) {
        alert("Fill all fields");
        setProcessing(false);
        return;
      }
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Payment system failed to load");
        setProcessing(false);
        return;
      }
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      if (!res.ok) {
        alert("Payment init failed");
        setProcessing(false);
        return;
      }
      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        order_id: data.order.id,
        currency: "INR",
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${BASE_URL}/api/payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                userId: localStorage.getItem("userId"),
                cartId: localStorage.getItem("cartId"),
                shipping: form,
              }),
            });
            if (!verifyRes.ok) {
              alert("Payment verification failed");
              return;
            }
            alert("Payment Successful 🎉");
            const cartId = localStorage.getItem("cartId");
            const userId = localStorage.getItem("userId");
            await fetch(userId ? `${BASE_URL}/api/cart/${userId}` : `${BASE_URL}/api/cart`, {
              method: "DELETE",
              headers: { "x-cart-id": cartId || "" },
            });
            // ✅ NOW REDIRECT TO THE NEW PAGE
    window.location.href = "/success";
          } catch (err) {
            console.error(err);
          }
        },
        theme: { color: "#1B5E20" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3B2E] py-10 md:py-20 px-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#1B5E20]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#113B14] mb-2">Checkout</h1>
          <p className="text-[#6B7D5E] uppercase tracking-[0.3em] text-[10px] font-bold">Secure Ayurvedic Portal</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ORDER SUMMARY */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(27,94,32,0.05)]">
              <h2 className="font-serif text-2xl font-bold text-[#113B14] mb-8 flex items-center gap-3">
                Order Summary
                <span className="text-xs font-sans bg-[#1B5E20]/10 text-[#1B5E20] px-3 py-1 rounded-full">
                  {cartItems.length} Items
                </span>
              </h2>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4 group">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#EDE4D4] shrink-0">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-bold text-[#113B14] text-sm leading-snug line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#6B7D5E] mt-1">Quantity: {item.quantity}</p>
                      <p className="font-bold text-[#1B5E20] text-sm mt-2">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#1B5E20]/10 space-y-3">
                <div className="flex justify-between text-sm text-[#6B7D5E]">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6B7D5E]">
                  <span>Shipping</span>
                  <span className="text-[#1B5E20] font-bold">FREE</span>
                </div>
                <div className="flex justify-between font-serif text-2xl font-bold text-[#113B14] pt-4">
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-6 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Master" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            </div>
          </div>

          {/* RIGHT: SHIPPING FORM */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
              <h2 className="font-serif text-2xl font-bold text-[#113B14] mb-8">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.keys(form).map((key) => (
                  <div key={key} className={`${key === 'address' ? 'md:col-span-2' : ''} space-y-1.5`}>
                    <label className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-widest ml-1">
                      {key}
                    </label>
                    <input
                      placeholder={`Enter ${key}...`}
                      value={form[key]}
                      className="w-full bg-[#FDFBF7] border border-[#EDE4D4] p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all placeholder:text-gray-300"
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button
                  disabled={processing}
                  className="w-full bg-[#1B5E20] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-[#1B5E20]/20 hover:bg-[#113B14] hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0"
                  onClick={handlePayment}
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Securing Payment...
                    </span>
                  ) : (
                    `Complete Payment • ₹${total}`
                  )}
                </button>
                <p className="text-center text-[9px] text-[#A8B8AA] font-bold uppercase tracking-widest mt-6">
                  100% Encrypted • Satisfaction Guaranteed • Fast Dispatch
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}