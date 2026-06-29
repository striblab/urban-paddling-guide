<script>
    import Bookmark from "./components/Svg/bookmarkbottom.svelte";
</script>

<div class="new-badge">
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

    div.type {
        padding: 25px 15px 15px 15px;
        background-color: #05442e;
    }
</style>