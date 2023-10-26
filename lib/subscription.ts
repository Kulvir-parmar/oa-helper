import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const data = await getAuthSession();

  if (!data?.user) {
    return false;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: data?.user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
