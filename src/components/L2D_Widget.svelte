<script lang="ts">
    import { onMount } from 'svelte';

    const Source = '/l2d_resource/autoload.js';

    onMount(() => {
        if(typeof window == 'undefined' || typeof document == 'undefined') return;
        
        if(window.innerWidth < 1024) return;

        if(document.querySelector('script[data-l2d-widget]')) return;

        const script = document.createElement('script');
        script.src = Source;
        script.async = true;
        script.defer = true;
        script.dataset.l2dWidget = "true";

        document.body.appendChild(script);

        return () => {};
    });


</script>