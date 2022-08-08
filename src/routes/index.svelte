<script context="module">
    import { browser } from '$app/env';
    
    /** @type {import('@sveltejs/kit/types').Load} */
    export async function load({ session }) {
        // @ts-ignore
        if (session.tokens && browser) {
            await fetch('/auth/store_tokens', {
                method: 'POST',
                // @ts-ignore
                body: JSON.stringify(session.tokens),
            });
            
            window.location.reload();
        }
        
        return {
            // @ts-ignore
            props: { user: session.user },
        };
    }
    import "fluent-svelte/theme.css";
</script>

<script>
// @ts-nocheck


    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    

    /** @type {Record<string, any> | false} */
    export let user;
</script>

<head>
	<title>VeivBotlist</title>
</head>
<div>
	
	<Navbar {user} />
	<Footer />
</div>
