This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Functional Code Structure
Main files that could be used for development:
```bash
├── app
│   ├── _components --add your components here if needed
│   ├── _icons  --icon resources
│   ├── api
│   │   └── management
│   │       ├── customer    --handle customer related requests, persist data
│   │       └── game-card   --handle game card related requests, persist data
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── management
│       ├── customer    --customer pages
│       ├── game-card   --game card pages
│       ├── layout.js
│       └── page.js
│── db
│   └── schema.ts   --table structure definition
└── entities.puml   --entity diagram
```

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Drizzle, take a look at the following resources:

- [Drizzle Documentation](https://orm.drizzle.team/docs/introduction)

## Github Commit Conventions
everyone commits their code on their own branch, and pull the updates from `main` after the code is completed, and merge the changes into `main` before pushing.

## How to view the entity diagram
install the `PlantUML` plugin for your IDE, and open the `entities.puml` file.