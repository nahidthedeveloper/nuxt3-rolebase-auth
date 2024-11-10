import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
    secret: runtimeConfig.authSecret,

    pages: {
        signIn: '/login',
        error: '/login',
    },

    providers: [
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: { username: string; password: string }) {
                const payload = {
                    username_or_email: credentials.username,
                    password: credentials.password,
                };
                try {
                    const { data } = await axios.post(`${process.env.SERVER_URL}/auth/login/`, payload);
                    return data;
                } catch (error) {
                    if (error instanceof Error && 'response' in error) {
                        const { data: errors } = (error as any).response;

                        let fieldsErrors: Array<{ name: string; message: string }> = [];
                        Object.entries(errors).forEach((entry) => {
                            const [key, value] = entry;
                            fieldsErrors.push({
                                name: key,
                                message: value,
                            });
                        });
                        throw new Error(JSON.stringify(fieldsErrors));
                    }
                }
            },
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...token,
                ...session.user,
            };
            return session;
        },
    },
});
