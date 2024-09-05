## General

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Task
Implement connections of Next.js 14 application to third-party API on an independent domain using standard Next.js 14 methods.
Authorization for access is implemented using AccessToken with a short lifetime. RefreshToken with longer lifetime is used to update AccessToken.  Both tokens are stored in the user's browser cookies.

## Limitations
- Do not use third-party query libraries like `Axios`
- Do not use the dirty hack of redirecting API requests to Next.js `Route Handlers`
- Do not use third-party cookie packages to bypass Next.js security mechanisms

## Getting Started
First of all you need to download and install the backend for this application from [here](https://github.com/zakharsk/cookies-refresh-back.git).

Next, rename `.env.example` to `.env.local` and insert the values of the `ACCESS_JWT_SECRET` and `REFRESH_JWT_SECRET` variables you created during the backend deployment phase.

Then, run the development server:

```bash
npm run dev
```

## Authorization
Any pair of strings between 4 and 32 characters long is accepted as a username and password. An authorized user can permanently delete their data from the system at any time.
There is no way to recover the password, so try not to forget it.

If you use on-line [example](https://cookies-refresh-front.vercel.app/) application, the data will be written to free `Postgres` database on the [Koyeb](https://www.koyeb.com/) service, if you use it locally, the data will be stored in `SQLite`. 