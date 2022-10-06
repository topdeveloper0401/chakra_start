import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserType } from 'lib/query/types';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '~/lib/query/admin';

let currentUser: UserType;

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'email', type: 'email', placeholder: '' },
                password: { label: 'password', type: '' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const user = email && (await getUser({ email }));

                if (!user) {
                    throw new Error('UserNotFound');
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (passwordMatch) {
                    currentUser = { ...user.toObject() };

                    return credentials;
                } else {
                    throw new Error('WrongPassword');
                }
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/login', // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true;
        // },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...user,
                    ...token,
                },
            };
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (currentUser) {
                return {
                    ...token,
                    ...currentUser,
                };
            } else {
                return token;
            }
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: true,
});
