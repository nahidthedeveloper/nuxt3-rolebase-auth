import {NuxtAuthHandler} from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: runtimeConfig.authSecret,

    pages: {
        signIn: "/login",
        error: "/login",
    },

    providers: [
        CredentialsProvider.default({
            name: "credentials",
            credentials: {},
            async authorize(credentials: { username: string; password: string }) {
                const payload = {
                    username_or_email: credentials.username,
                    password: credentials.password,
                };

                try {
                    const response = await fetch(
                        `${process.env.SERVER_URL}/auth/login/`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                        }
                    );

                    if (!response.ok) {
                        const errors = await response.json();
                        let fieldsErrors: Array<{ name: string; message: string }> = [];
                        Object.entries(errors).forEach(([key, value]) => {
                            fieldsErrors.push({
                                name: key,
                                message: value as string,
                            });
                        });
                        throw new Error(JSON.stringify(fieldsErrors));
                    }

                    return await response.json();
                } catch (error) {
                    throw new Error(
                        error instanceof Error ? error.message : "An unknown error occurred"
                    );
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token = {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
        async session({session, token}) {
            session.user = {
                ...token,
                ...session.user,
            };
            return session;
        },
    },
});
