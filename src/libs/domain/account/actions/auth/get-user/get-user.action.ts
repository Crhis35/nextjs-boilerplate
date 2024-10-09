import { cookies } from 'next/headers';

import { fetchAuthSession } from 'aws-amplify/auth/server';

import { runWithAmplifyServerContext } from '@/common/hoc/amplify';
import { useGetUserByCognitoIdQuery } from '@/libs/common/api/requests';
import { getServerGraphQLClient } from '@/libs/common/api/client/gql/server-interceptor';

export const getUserAction = async () => {
  try {
    const { tokens } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async contextSpec => fetchAuthSession(contextSpec),
    });

    const serverGqlClient = await getServerGraphQLClient();

    const fetchUser = useGetUserByCognitoIdQuery.fetcher(serverGqlClient, {
      cognitoId: tokens?.idToken?.payload.sub,
    });

    const { users } = await fetchUser();

    return {
      user: users.edges?.[0]?.node,
      cognito: tokens?.idToken?.payload,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
