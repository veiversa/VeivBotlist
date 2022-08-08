export function GET() {
    return {
        headers: {
            Location: `https://discord.com/api/oauth2/authorize?client_id=${
                import.meta.env.VITE_CLIENT_ID
            }&redirect_uri=${encodeURIComponent(
                import.meta.env.VITE_SITE_URL + '/auth/callback'
            )}&response_type=code&scope=identify`,
        },
        status: 302,
    };
}
