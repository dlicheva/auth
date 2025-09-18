export const LOCALDEFAULTS = {
    cookie: {
        name: undefined
    },
    endpoints: {
        csrf: {
            url: '/api/csrf-cookie',
        },
        login: {
            url: '/api/auth/login',
            method: 'post',
        },
        logout: {
            url: '/api/auth/logout',
            method: 'post',
        },
        user: {
            url: '/api/auth/user',
            method: 'get',
        },
        refresh: {
            url: '/api/auth/refresh',
            method: 'post',
        },
    },
    token: {
        expiresProperty: 'expires_in',
        property: 'token',
        type: 'Bearer',
        name: 'Authorization',
        maxAge: false,
        global: true,
        required: true,
        prefix: '_token.',
        expirationPrefix: '_token_expiration.',
        httpOnly: false
    },
    refreshToken: {
        property: 'refresh_token',
        data: 'refresh_token',
        maxAge: 60 * 60 * 24 * 30,
        required: true,
        tokenRequired: false,
        prefix: '_refresh_token.',
        expirationPrefix: '_refresh_token_expiration.',
        httpOnly: false,
    },
    autoLogout: false,
    user: {
        property: 'user',
        autoFetch: true,
    },
    clientId: undefined,
    grantType: undefined,
    scope: undefined,
};

export const BuiltinSchemes = {
    local: 'LocalScheme',
    cookie: 'CookieScheme',
    refresh: 'RefreshScheme',
};

export const LocalSchemes = [
    'local',
    'cookie',
    'refresh',
]
