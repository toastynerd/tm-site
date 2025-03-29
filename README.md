# Personal Blog

A Next.js-powered personal blog with markdown support and syntax highlighting.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project uses a production branch strategy for deployments:

- `main` branch is used for development
- `production` branch is used for deployment to AWS Amplify

### Deploying to Production

1. Make sure your changes are merged into the `main` branch
2. Go to the "Actions" tab in GitHub
3. Select the "Deploy to Production" workflow
4. Click "Run workflow"
5. Confirm the deployment

The GitHub Action will:
1. Merge the `main` branch into `production`
2. Push the changes to GitHub
3. AWS Amplify will automatically detect the changes and deploy them

### AWS Amplify Configuration

The deployment is configured using `amplify.yml` in the root directory. The build process:
1. Installs dependencies using `npm ci`
2. Builds the application using `npm run build`
3. Deploys the `.next` directory

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- MDX for blog posts
- highlight.js for syntax highlighting

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
