# Resq: A Trust-Based System That Never Leaves You Stranded

## Overview
Resq is an innovative payment solution that allows friends to support each other financially in times of need. The system creates a safety net by enabling trusted users to bill their friends' cards when they're in a bind, while maintaining transparency and control.

## Core Features

### Emergency Billing
- Bill a friend's card when you're stranded or in need
- Instant payment processing to solve immediate problems
- Simple request interface that works even with low battery or poor connectivity

### Trust & Transparency
- Automatic email notifications any time your card is billed
- Customizable approval settings:
  - "Ask First" mode: Requires explicit approval for each charge
  - "Trust Completely" mode: Allows instant charges without approval
- Detailed transaction history and receipts

### Controls & Limits
- Set maximum billing limits (per transaction or monthly)
- Easily add or remove trusted friends
- Pause billing permissions temporarily
- Emergency lock feature

## How It Works

1. **Connect with friends**: Send and accept trust requests with friends
2. **Set preferences**: Configure notification preferences and spending limits
3. **Use in emergencies**: When stranded, request funds from a trusted friend
4. **Stay informed**: Both parties receive detailed transaction confirmations
5. **Manage later**: Settle debts through the app or via external means

## Use Cases

- **Transportation emergencies**: When you're stranded without funds for a ride homed
- **Forgotten wallet**: When you've left your payment methods at home
- **Temporary cash flow issues**: When waiting for a paycheck to clear

## Tech Stack

### Frontend
- **Web App**: React.js, TypeScript, TailwindCss, shadcn/ui, Tanstack Query, React Router

### Backend
- **Server**: Fastify, PostgreSQL, Prisma
- 
### Deployment
- **Hosting**: Vercel(Client), Render(Server & DB)

### Payment Processing
- Paystack API for card processing and account linking

## Privacy & Security Considerations
ResQ prioritizes user security and financial privacy with:
- End-to-end encryption for sensitive data
- Strict permission-based access controls


