import {PostHog} from 'posthog-node'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY

export const posthogClient = POSTHOG_API_KEY
  ? new PostHog(
    POSTHOG_API_KEY,
    {host: 'https://app.posthog.com'}
  ) : undefined;
