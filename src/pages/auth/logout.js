import cookie from 'cookie';

export function GET() {
    return {
        headers: {
            'set-cookie': [
                cookie.serialize('access_token', 'deleted', {
                    maxAge: -1,
                    httpOnly: true,
                    path: '/',
                }),
                cookie.serialize('refresh_token', 'deleted', {
                    maxAge: -1,
                    httpOnly: true,
                    path: '/',
                }),
                cookie.serialize('token_type', 'deleted', {
                    maxAge: -1,
                    httpOnly: true,
                    path: '/',
                }),
            ],
            location: '/',
        },
        status: 302,
    };
}
