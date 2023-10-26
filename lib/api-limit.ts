import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

import { MAX_FREE_COUNT } from '@/constants';

export const descreaseApiLimit = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return;
  }

  const userApiLimit = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (userApiLimit) {
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        apiLimit: userApiLimit.apiLimit - 1,
      },
    });
  }
};

export const isApiLimitExceeded = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return false;
  }

  const userApiLimit = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!userApiLimit || userApiLimit.apiLimit > 0) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimit = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return 0;
  }

  const userApiLimit = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.apiLimit;
};
