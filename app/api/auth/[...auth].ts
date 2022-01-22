// https://blitzjs.com/docs/passportjs
// https://github.com/blitz-js/blitz/blob/canary/examples/auth/app/api/auth/%5B...auth%5D.ts

import { passportAuth, PublicData } from "blitz";
import db from "db";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Role } from "types";

function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(process.env.GITHUB_ID, "You must provide the GITHUB_CLIENT_ID env variable");
assert(process.env.GITHUB_SECRET, "You must provide the GITHUB_CLIENT_SECRET env variable");
assert(process.env.GITHUB_CALLBACK_URL, "You must provide the GITHUB_CALLBACK_URL env variable");

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/",
  strategies: [
    {
      strategy: new GitHubStrategy(
        {
          clientID: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? (process.env.GITHUB_CALLBACK_URL as string)
              : "http://localhost:3000/api/auth/github/callback",
        },
        async function (
          _token: string,
          _tokenSecret: string,
          profile: any,
          done: (err: Error | null, data?: { publicData: PublicData }) => void
        ) {
          const email = profile.emails && profile.emails[0]?.value;

          if (!email) {
            return done(new Error("Github OAuth response doesn't have email."));
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          });

          const publicData = {
            userId: user.id,
            role: user.role as Role,
            source: "github" as const,
            avatar: profile.photos[0].value,
            userName: profile.username,
          };
          done(null, { publicData });
        }
      ),
    },
  ],
}));
