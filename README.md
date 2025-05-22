# Starthub - Startup Ecosystem Platform

A comprehensive platform connecting startups, investors, and mentors in the startup ecosystem.

## Features

- 🔐 Authentication with Supabase
- 👥 Community Management
- 💰 Funding Opportunities
- 🤝 Mentorship Programs
- 📚 Resource Library
- 🏢 Startup Showcase
- 👥 Co-founder Matching
- 💼 Investor Dashboard

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Radix UI Components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Johanabhishek/Starthub.git
cd Starthub
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/contexts` - React context providers
- `/hooks` - Custom React hooks
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.