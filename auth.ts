import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { restClient } from '@/libs/shared/api/client';
import { AuthUser } from '@/data/models/user';

function replaceLogin(url: string, newPath: string) {
  const parsedUrl = new URL(url);
  const regex = /^\/([a-z]{2})\/login|^\/login/;

  parsedUrl.pathname = parsedUrl.pathname.replace(regex, (match, locale) => {
    return locale ? `/${locale}/${newPath}` : `/${newPath}`;
  });

  return parsedUrl.toString();
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const { data } = await restClient.post<AuthUser>('/v1/aut/acceder', {
            correo_electronico: credentials.username,
            contrasenia: credentials.password,
          });

          if (!data) return null;
          return {
            ...data,
            id: String(data.id),
            accessToken: data.token, // promote token for easy access in callbacks
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
          accessToken: user.token,
        } as any;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id),
          usuario: token.usuario,
          correo_electronico: token.correo_electronico,
          token: token.token,
          email: token.correo_electronico,
          emailVerified: new Date(),
          accessToken: token.token,
        };
        session.accessToken = token.accessToken;
      }

      return session;
    },
    redirect({ url, baseUrl }) {
      if (url.includes('signout')) {
        return `${baseUrl}/login`;
      }
      const route = replaceLogin(url, '');
      return route;
    },
  },
});
