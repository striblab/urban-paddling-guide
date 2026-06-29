<script>
    import Bookmark from "./components/Svg/bookmarkbottom.svelte";

    let {wide = false} = $props();
</script>

<div class="new-badge {wide ? 'wide hidden md:block' : ''}">
    <div class="type">
        <h6>NEW ROUTE</h6>
    </div>
    <Bookmark />
</div>

<style>
    div.new-badge {
        position: absolute;
        top: 0px;
        right: 15px;
        color: white;
        width: 90px;
        text-align:center;
        font-size: 15px;
        letter-spacing: 0.5px;
        font-weight: bold;
        font-family: 'graphik-medium', sans-serif;
    }

    div.new-badge.wide {
        left: 15px;
        right: auto;
    }

    div.type {
        padding: 25px 15px 15px 15px;
        background-color: #05442e;
    }

    div.new-badge.wide div.type {
       padding: 10px 15px;
    }

    @media only screen and (max-width: 600px) {
        :global(div.new-badge.wide svg) {
            display: none;
        }
        /* div.new-badge.wide {
            width: 45%;
            left: 0;
        } */
    }
</style>