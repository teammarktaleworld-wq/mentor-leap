# 🎟️ Coupon System Implementation Guide

## Overview

**Coupon System for "Interview to Offer Letter" Event**
- **Base Price:** ₹1999 → **Offer Price:** ₹499
- **Available Coupons:**
  - `CORP100%` → 100% Off (Free) ✅
  - `EARLYBIRD` → 25% Off (₹374.25) ✅
  - `TEAM` → 50% Off (₹249.50) ✅

---

## ✅ What Has Been Implemented

### 1. Backend (Checkout API)
- [x] Added discount calculation logic for 3 new coupon codes
- [x] Updated price calculation based on coupon type
- [x] Supports percentage-based discounts

### 2. Frontend (PaymentDetailsModal)
- [x] Coupon code input field with uppercase validation
- [x] Real-time price calculation display
- [x] Discount breakdown showing:
  - Original Price
  - Discount Amount & Percentage
  - Final Price
- [x] Inline coupon hints (CORP100%, EARLYBIRD, TEAM)
- [x] Dynamic button text ("Claim Free Access" for free coupons)

### 3. Database (Optional)
- [x] Script to store coupon metadata for admin tracking

---

## 🚀 How to Test Locally

### Step 1: Restart Your Development Server
```bash
# Stop current server (Ctrl + C)
npm run dev
```

### Step 2: Test in Browser
1. Go to **Events Page** → Click **"Interview to Offer Letter"**
2. Click **"Register Now"** or similar button
3. Fill in user details (Name, Phone, Company)
4. In the **"Invite Code"** field, enter one of:
   - `CORP100%`
   - `EARLYBIRD`
   - `TEAM`

### Step 3: Verify Price Calculation

| Coupon | Display | Final Price |
|--------|---------|-------------|
| (None) | ₹499 (no discount) | ₹499 |
| CORP100% | -₹499 (100% off) | ₹0 |
| EARLYBIRD | -₹125 (25% off) | ₹374 |
| TEAM | -₹250 (50% off) | ₹249 |

✅ **Expected:** Price breakdown appears instantly as you type the coupon code

---

## 🎯 How It Works (Technical Flow)

### User Journey:
```
1. User enters coupon code in modal
   ↓
2. Frontend calculates discount in real-time
   ↓
3. Price summary displays with original, discount, and final price
   ↓
4. User clicks "Proceed to Payment" or "Claim Free Access"
   ↓
5. Frontend sends couponCode to backend /checkout API
   ↓
6. Backend validates and applies discount
   ↓
7. If price = 0, creates FREE transaction
   If price > 0, creates Razorpay order with discounted amount
```

---

## 📝 Coupon Code Logic

```typescript
// In checkout API (/api/checkout/route.ts)

if (submittedCoupon === "CORP100%") {
    price = 0; // 100% Off
} else if (submittedCoupon === "EARLYBIRD") {
    price = 374; // 75% of 499 = 25% Off
} else if (submittedCoupon === "TEAM") {
    price = 249; // 50% of 499 = 50% Off
} else if (submittedCoupon === "MASTERCLASSFREE") {
    price = 0; // Legacy free coupon
} else {
    price = 499; // No coupon = full price
}
```

---

## 🔧 Future Enhancements

### 1. Coupon Validation from Firestore
```typescript
// Check if coupon exists and is active
const couponDoc = await db.collection("coupons").doc(couponCode).get();
if (!couponDoc.exists || !couponDoc.data().isActive) {
    // Invalid coupon - reject
}
```

### 2. Usage Limits
```typescript
// Track coupon usage
if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
    // Coupon limit reached
}
```

### 3. Expiry Dates
```typescript
// Check coupon expiry
if (coupon.expiryDate && new Date() > coupon.expiryDate) {
    // Coupon expired
}
```

### 4. User Limits (One coupon per user)
```typescript
// Check if user already used this coupon
const existing = await db.collection("transactions")
    .where("userId", "==", uid)
    .where("couponCode", "==", couponCode)
    .get();
```

---

## 📊 Admin Dashboard - View Coupon Stats

Update admin registrations page to show coupon usage:

```typescript
// In admin/registrations page

// Count coupon usage
const couponStats = {
  "CORP100%": 0,
  "EARLYBIRD": 0,
  "TEAM": 0
};

registrations.forEach(reg => {
  if (reg.userDetails?.couponCode in couponStats) {
    couponStats[reg.userDetails.couponCode]++;
  }
});
```

---

## ✅ Deployment Checklist

- [ ] Test all 3 coupons locally
- [ ] Verify price calculations match expected values
- [ ] Test free coupon flow (price = 0)
- [ ] Test paid coupon flow (Razorpay integration)
- [ ] Deploy to Firebase/Vercel
- [ ] Test in production
- [ ] Monitor transaction records for coupon usage
- [ ] Share coupon codes with marketing team

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Coupon not applying** | Check spelling (case-sensitive uppercase) |
| **Price not updating** | Hard refresh browser (Ctrl+Shift+R) |
| **Wrong discount amount** | Verify rounding logic in calculatePrice() |
| **Free coupon shows payment page** | Clear browser cache and test again |
| **Razorpay order fails** | Check if amount is in valid paise value |

---

## 📞 Support

For issues or questions about the coupon system:
1. Check this guide's troubleshooting section
2. Review the checkout API logs
3. Verify database coupons collection exists

---

**Implementation Date:** April 16, 2026
**Status:** ✅ Ready for Testing
