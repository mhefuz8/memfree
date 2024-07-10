'use client';

import { useTransition } from 'react';
import { generateUserStripe } from '@/actions/generate-user-stripe';
import { SubscriptionPlan, UserSubscriptionPlan } from '@/types';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { tree } from 'next/dist/build/templates/app-page';

interface BillingFormButtonProps {
    offer: SubscriptionPlan;
    subscriptionPlan: UserSubscriptionPlan;
    year: boolean;
}

export function BillingFormButton({
    year,
    offer,
    subscriptionPlan,
}: BillingFormButtonProps) {
    let [isPending, startTransition] = useTransition();
    const generateUserStripeSession = generateUserStripe.bind(
        null,
        offer.stripeIds[year ? 'yearly' : 'monthly'],
    );

    const stripeSessionAction = () =>
        startTransition(async () => await generateUserStripeSession());

    const userOffer =
        subscriptionPlan.stripePriceId ===
        offer.stripeIds[year ? 'yearly' : 'monthly'];

    return (
        <Button
            rounded="full"
            className="w-full"
            disabled={true}
            onClick={stripeSessionAction}
        >
            {isPending ? (
                <>
                    <Icons.spinner className="mr-2 size-4 animate-spin" />{' '}
                    Loading...
                </>
            ) : (
                <>{userOffer ? 'Manage Subscription' : 'Upgrade'}</>
            )}
        </Button>
    );
}