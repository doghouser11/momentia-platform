# User System Architecture - Momentia

## Core Concepts

### User Account
- **Email + Password** authentication
- **Annual subscription** (Starter/Premium/Pro)
- **Site quota** based on plan (2/3/5 sites per year)
- **Renewal date** tracking

### Site Management
- **Site slots:** Track used vs available sites
- **Site status:** Draft, Published, Archived, Expired
- **Sharing capability:** Password sharing with friends/family

## Password Sharing Feature

### How It Works
1. **Primary account holder** creates account & pays
2. **Gets shareable credentials** for family/friends
3. **Secondary users** can login with same credentials
4. **All users see same dashboard** with shared site quota
5. **Activity log** shows who created what

### Technical Implementation
```
User Account
├── Primary User (pays & owns)
├── Shared Access (password sharing)
├── Site Quota (2/3/5 per year)
├── Sites Created
└── Usage Analytics
```

### Sharing Rules
- ✅ **Multiple logins** with same credentials
- ✅ **Shared site quota** (family uses together)  
- ✅ **All sites visible** to all users
- ⚠️ **One payment** covers all family usage
- ⚠️ **Primary user** responsible for renewals

## Database Schema

### Users Table
```sql
- id: UUID
- email: VARCHAR (unique)
- password_hash: VARCHAR
- plan: ENUM (starter, premium, pro)
- sites_used: INTEGER (current year usage)
- sites_limit: INTEGER (based on plan)
- subscription_start: DATE
- subscription_end: DATE
- created_at: TIMESTAMP
```

### Sites Table
```sql
- id: UUID
- user_id: UUID (foreign key)
- title: VARCHAR
- template_id: VARCHAR
- status: ENUM (draft, published, archived)
- created_at: TIMESTAMP
- event_date: DATE
- rsvp_deadline: DATE
```

### RSVP Responses Table
```sql
- id: UUID
- site_id: UUID (foreign key)
- guest_name: VARCHAR
- guest_email: VARCHAR
- status: ENUM (accepted, declined, pending, maybe)
- plus_ones: INTEGER
- dietary_requirements: TEXT
- created_at: TIMESTAMP
```

## User Journey

### Registration Flow
1. **Choose Plan** → Starter/Premium/Pro
2. **Create Account** → Email + Password
3. **Payment** → Stripe checkout
4. **Dashboard** → See available site slots
5. **Share Access** → Give credentials to family

### Site Creation Flow
1. **New Site** → Choose template
2. **Customize** → Add event details
3. **Publish** → Get shareable link
4. **Monitor RSVPs** → Dashboard + email reports
5. **Site Expires** → After event date + 30 days

### Subscription Management
- **View usage:** Sites used vs available
- **Renewal alerts:** 30 days before expiration
- **Upgrade/downgrade:** Change plans anytime
- **Family sharing:** Instructions for password sharing

## Pricing Strategy

### Plans & Limits
- **Starter (180€):** 2 sites/year
- **Premium (350€):** 3 sites/year  
- **Pro (500€):** 5 sites/year

### Family Sharing Benefits
- **Cost effective:** One payment for whole family
- **Flexible usage:** Who uses which sites doesn't matter
- **Simple sharing:** Just share login credentials
- **No complex permissions:** Everyone sees everything

## Technical Notes

### Security Considerations
- **Password sharing is intentional feature** (not a bug)
- **Session management:** Multiple concurrent logins OK
- **Audit log:** Track which user created which site
- **Payment responsibility:** Primary account holder only

### Usage Tracking
- **Annual reset:** Site quota resets on subscription renewal
- **Overage handling:** Block new sites when quota exceeded
- **Grace period:** 7 days to upgrade if over limit

This approach makes it family-friendly while maintaining clear business model.