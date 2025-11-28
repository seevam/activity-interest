# Deployment Guide - Interest Discovery Activity

## Quick Start - Vercel Deployment

### 1. Prerequisites
- Vercel account (sign up at https://vercel.com)
- OpenAI API key (get one at https://platform.openai.com)

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Next.js configuration
4. Click "Deploy"

### 3. Configure Environment Variables

After deployment, add environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

```
Key: OPENAI_API_KEY
Value: sk-proj-... (your OpenAI API key)
Environment: Production, Preview, Development
```

4. Redeploy the application for changes to take effect

### 4. Test Your Deployment

Once deployed, test all features:
- ✅ Welcome screen loads
- ✅ Card drag and drop works
- ✅ Scenario questions display correctly
- ✅ AI profile generation works
- ✅ PDF download functions
- ✅ Responsive design on mobile

### 5. Custom Domain (Optional)

To add a custom domain:
1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

## Local Development

### 1. Clone the repository
```bash
git clone <repository-url>
cd activity-interest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for production
```bash
npm run build
npm start
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for profile generation |

## Troubleshooting

### Build Fails
- **Issue**: Build fails with OpenAI errors
- **Solution**: Ensure `OPENAI_API_KEY` is set in environment variables

### AI Profile Not Generating
- **Issue**: Loading screen hangs or shows error
- **Solution**:
  1. Check OpenAI API key is valid
  2. Check OpenAI account has credits
  3. Check browser console for errors

### PDF Download Not Working
- **Issue**: PDF doesn't download or is empty
- **Solution**:
  1. Check browser allows downloads
  2. Ensure all phases were completed
  3. Check browser console for errors

### Drag and Drop Not Working
- **Issue**: Cards won't drag
- **Solution**:
  1. Clear browser cache
  2. Try a different browser
  3. Check if JavaScript is enabled

## Performance Optimization

For optimal performance:
1. Enable Vercel Analytics in project settings
2. Monitor Core Web Vitals
3. Consider adding ISR (Incremental Static Regeneration) for static content
4. Use Vercel Edge Functions for faster API responses

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` already
2. **Rotate API keys** regularly
3. **Use environment variables** for all sensitive data
4. **Enable HTTPS** (automatic with Vercel)
5. **Monitor API usage** to prevent abuse

## Monitoring & Analytics

### Vercel Analytics
Enable in project settings to track:
- Page load times
- Core Web Vitals
- User interactions
- Conversion rates

### Error Tracking
Consider integrating:
- Sentry for error monitoring
- LogRocket for session replay
- PostHog for product analytics

## Scaling Considerations

As usage grows:
1. Monitor OpenAI API costs
2. Consider rate limiting on the API endpoint
3. Add caching for frequently requested data
4. Implement user authentication if needed
5. Add database for persistent storage

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review [Vercel documentation](https://vercel.com/docs)
- Check [Next.js documentation](https://nextjs.org/docs)
- Contact development team

## Estimated Costs

### Vercel
- **Free tier**: Sufficient for development and small-scale usage
- **Pro tier** ($20/month): Recommended for production

### OpenAI API
- Model: GPT-4 Turbo
- Estimated cost per profile: ~$0.02-0.05
- 100 students/month: ~$2-5
- 1000 students/month: ~$20-50

### Total Monthly Cost Estimate
- Small scale (100 students): $22-25
- Medium scale (1000 students): $40-70

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Share the URL with stakeholders
3. ✅ Collect initial user feedback
4. ✅ Monitor analytics and errors
5. ✅ Plan for Session 2 development

---

**Last Updated**: November 2025
**Version**: 1.0.0
