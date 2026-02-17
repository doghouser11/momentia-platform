# OpenClaw Cron Jobs Setup для Momentia

## 1. Daily MAYBE Reminders (9:00 AM)
```javascript
// Check for MAYBE guests 7 days before events
cron.add({
  name: "momentia-maybe-reminders",
  schedule: { 
    kind: "cron", 
    expr: "0 9 * * *", // Daily at 9:00 AM
    tz: "Europe/Sofia" 
  },
  payload: { 
    kind: "systemEvent", 
    text: "Check Momentia MAYBE guests and send 7-day reminders" 
  },
  sessionTarget: "main",
  enabled: true
})
```

## 2. Weekly Reports (Sundays at 10:00 AM)  
```javascript
// Generate and send weekly reports to event organizers
cron.add({
  name: "momentia-weekly-reports",
  schedule: { 
    kind: "cron", 
    expr: "0 10 * * 0", // Sundays at 10:00 AM
    tz: "Europe/Sofia"
  },
  payload: { 
    kind: "systemEvent", 
    text: "Generate and send Momentia weekly reports to all active event organizers" 
  },
  sessionTarget: "main", 
  enabled: true
})
```

## 3. Subscription Expiration Check (Daily at 8:00 AM)
```javascript
// Check for subscriptions expiring in 30 days
cron.add({
  name: "momentia-subscription-check",
  schedule: { 
    kind: "cron", 
    expr: "0 8 * * *", // Daily at 8:00 AM
    tz: "Europe/Sofia"
  },
  payload: { 
    kind: "systemEvent", 
    text: "Check Momentia subscriptions expiring in 30 days and send warnings" 
  },
  sessionTarget: "main",
  enabled: true
})
```

## 4. Admin Payment Notifications (Immediate)
```javascript
// Notify admin immediately when payment is received
// This is triggered by Stripe webhook, not cron
async function notifyAdminOfNewOrder(orderData) {
  await message({
    action: "send",
    to: "nikol_bg_93@proton.me",
    subject: `🔴 Нова поръчка Momentia: ${orderData.clientName}`,
    message: `
Нова поръчка за потвърждение:

👤 Клиент: ${orderData.clientName}
📧 Имейл: ${orderData.clientEmail} 
💼 План: ${orderData.planType}
💰 Сума: ${orderData.amount}€
⏰ Крайна дата: ${orderData.deadline}

Влез в админ панела за потвърждение:
https://momentia.online/admin
    `
  })
}
```

## Setup Commands

```bash
# Install required packages
cd momentia-platform
npm install @prisma/client resend qrcode

# Generate Prisma client  
npx prisma generate

# Setup environment variables
echo "RESEND_API_KEY=your_key_here" >> .env.local
echo "DATABASE_URL=your_turso_url" >> .env.local
echo "STRIPE_SECRET_KEY=your_stripe_key" >> .env.local
echo "MYPOS_API_KEY=your_mypos_key" >> .env.local
```

## Execution Flow

1. **Payment received** → Stripe webhook → Create Order → Email admin
2. **Admin marks delivered** → Generate subdomain + QR → Email client  
3. **Daily 8am** → Check expiring subscriptions → Email warnings
4. **Daily 9am** → Check MAYBE guests → Send 7-day reminders
5. **Sunday 10am** → Generate all weekly reports → Email organizers

## Email Templates Location

All email templates are in `/src/lib/email-automation.ts` with Bulgarian translations and proper formatting.