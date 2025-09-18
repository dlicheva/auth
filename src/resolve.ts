import type { StrategyOptions, ModuleOptions, SchemeNames, ImportOptions } from './types';
import type { Nuxt } from '@nuxt/schema';
import { BuiltinSchemes } from './runtime/inc/default-properties';
import { hasOwn } from './utils';
import { resolvePath } from '@nuxt/kit';
import { existsSync } from 'fs';
import { hash } from 'ohash';

export async function resolveStrategies(nuxt: Nuxt, options: ModuleOptions) {
    const strategies: StrategyOptions[] = [];
    const strategyScheme = {} as Record<string, ImportOptions>;

    for (const name of Object.keys(options.strategies!)) {
        if (!options.strategies?.[name] || options.strategies?.[name].enabled === false) {
            continue;
        }

        // Clone strategy
        const strategy = Object.assign({}, options.strategies![name]);

        // Default name
        if (!strategy.name) {
            strategy.name = name;
        }

        // Default provider (same as name)
        if (!strategy.provider) {
            strategy.provider = strategy.name;
        }

        // Determine if SSR is enabled
        if (hasOwn(strategy, 'ssr')) {
            strategy.ssr = strategy.ssr;
        } else {
            strategy.ssr = nuxt.options.ssr;
        }

        // Default scheme (same as name)
        if (!strategy.scheme) {
            strategy.scheme = strategy.name as SchemeNames;
        }

        try {
            // Resolve and keep scheme needed for strategy
            const schemeImport = await resolveScheme(strategy.scheme);
            delete strategy.scheme;
            strategyScheme[strategy.name] = schemeImport!;

            // Add strategy to array
            strategies.push(strategy);
        } catch (e) {
            console.error(`[Auth] Error resolving strategy ${strategy.name}: ${e}`);
        }
    }

    return {
        strategies,
        strategyScheme,
    };
}

export async function resolveScheme(scheme: string) {
    if (typeof scheme !== 'string') {
        return;
    }

    if (BuiltinSchemes[scheme as keyof typeof BuiltinSchemes]) {
        return {
            name: BuiltinSchemes[scheme as keyof typeof BuiltinSchemes],
            as: BuiltinSchemes[scheme as keyof typeof BuiltinSchemes],
            from: '#auth/runtime',
        };
    }

    const path = await resolvePath(scheme);

    if (existsSync(path)) {
        const _path = path.replace(/\\/g, '/');
        return {
            name: 'default',
            as: 'Scheme$' + hash({ path: _path }),
            from: _path,
        };
    }
}