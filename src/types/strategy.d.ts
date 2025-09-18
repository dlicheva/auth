import type { RefreshableSchemeOptions, } from './scheme';
import type { RecursivePartial } from './utils';

export type Strategy<S = {}> = S & Strategies;

// @ts-ignore: endpoints dont match
export interface AuthSchemeOptions extends RefreshableSchemeOptions {}

export interface Strategies {
    provider?: ProviderNames;
    enabled?: boolean;
}

export type StrategyOptions<SOptions extends RecursivePartial<AuthSchemeOptions> = RecursivePartial<AuthSchemeOptions>> = ProviderPartialOptions<ProviderOptions & SOptions & Strategy>;
