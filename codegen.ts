import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: 'src/libs/**/*.gql',
  generates: {
    'src/libs/shared/api/requests/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        exposeQueryKeys: true,
        exposeFetcher: true,
        withHooks: true,
        dedupeFragments: true,
        reactQueryVersion: 5,
        fetcher: 'graphql-request',
        addInfiniteQuery: true,
      },
    },
  },
};

export default config;
