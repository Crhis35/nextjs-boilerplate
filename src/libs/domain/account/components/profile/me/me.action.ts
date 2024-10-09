'use server';

import { validateSchema } from './me.model';
import { useUpdateUserMutation } from '@/libs/common/api/requests';
import { getServerGraphQLClient } from '@/libs/common/api/client/gql/server-interceptor';

export async function updateUser(data: FormData) {
  const { id, ...input } = validateSchema.parse(data);

  await new Promise(async (resolve, reject) => {
    try {
      const serverGqlClient = await getServerGraphQLClient();
      const updateUser = useUpdateUserMutation.fetcher(serverGqlClient, {
        input: {
          id,
          update: input,
        },
      });
      const result = await updateUser();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
