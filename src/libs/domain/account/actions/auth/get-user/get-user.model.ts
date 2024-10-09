import { getUserAction } from './get-user.action';

export type UserActionResponse = Awaited<ReturnType<typeof getUserAction>>;
