<script>
</script>

<div class="hero bg-[#fffbf4] pb-20">
    <div class="video-wrapper relative w-full motion-reduce:hidden">
        <video
            src="https://static.startribune.com/assets/outdoors/urban-paddling/MinneapolisMississippi_1_1.mp4"
            autoplay
            muted
            loop
            playsinline
            id="bgVideo"
        >
        </video>
    </div>
    <div
        class="hidden motion-reduce:block sticky top-0 h-[100svh] md:h-[180svh] bg-bottom bg-cover bg-[url('https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/uppermississippiriver_vertical.jpg?w=900')] md:bg-[url('https://ststatic.stimg.co/assets/outdoors/urban-paddling/hero/uppermississippiriver.jpg?w=2000')]"
    ></div>
    <div class="subhead w-[90%] mx-auto">
        <h1
            class="font-publico-banner-black text-[45px] md:text-[55px] text-center mx-auto text-white mt-[-100vh] pt-[37.5vh] md:pt-[45vh] max-w-[325px] md:max-w-4xl headline leading-[1.2]"
        >
            Paddling the Twin Cities
        </h1>
        <svg
            id="strib-chevron-down"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="white"
            class="strib-icon strib-chevron-down mx-auto mt-12 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m15 5.125-1.251-1.25L8 9.623 2.251 3.875 1 5.125l7 7z" />
        </svg>
        <div
            class="max-w-lg w-[90%] mx-auto mb-[110vh] mt-[50vh] text-white text-center"
        >
            <h2
                class="font-publico-headline-light text-[20px] md:text-[24px] leading-[1.6] tracking-wide"
            >
                Canoe, kayak or paddleboard: Your ultimate guide to paddling
                routes in the Twin Cities metro area, whether you’re a beginner
                or a seasoned pro
            </h2>
            <p
                class="byline text-center uppercase font-graphik-regular text-[13px] tracking-widest mt-8 hidden md:block"
            >
                The Minnesota Star Tribune • May 14, 2025
            </p>

            <p
                class="byline text-center uppercase font-graphik-regular text-[13px] tracking-widest mt-8 block md:hidden"
            >
                The Minnesota Star Tribune<br />May 14, 2025
            </p>
        </div>
    </div>
</div>

<style type="text/css">
    :global(.intro p a) {
        border-bottom: 1px solid #05442e;
        transition: 0.5s opacity;
    }
    :global(.intro p a:hover) {
        opacity: 0.5;
        transition: 0.5s opacity;
    }

    div.video-wrapper {
        position: sticky;
        width: 100%;
        height: 100vh;
        top: 0;
        overflow: hidden;
    }

    li {
        position: relative;
    }
    li:before {
        content: "•";
        position: absolute;
        left: -15px;
        height: 10px;
    }

    div.subhead {
        z-index: 5;
        position: relative;
        margin: 0 auto;
    }
    div.video-wrapper video#bgVideo {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        max-width: none;
    }
    video {
        object-fit: cover;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    h1.headline {
        opacity: 0;
        animation: fadeIn linear 3s forwards;
    }

    svg#strib-chevron-down {
        opacity: 0;
        animation: fadeIn linear 3s forwards;
        animation-delay: 1.5s;
    }
    ul {
        column-count: 2;
        column-gap: 60px;
    }

    @media only screen and (max-width: 400px) {
        li:before {
            left: -10px;
        }
        ul {
            column-count: 1;
        }
    }
</style>
