<script>
</script>

<div class="hero bg-[#fffbf4] pb-20">
    <div class="video-wrapper relative w-full">
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
    <div class="subhead w-[90%] mx-auto">
        <h1
            class="font-publico-banner-black text-[45px] md:text-[55px] text-center mx-auto text-white mt-[-100vh] pt-[37.5vh] md:pt-[45vh] max-w-[250px] md:max-w-4xl headline leading-[1.2]"
        >
            Paddling the city
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
                Canoe, kayak or paddleboard: Your ultimate guide to paddling in
                the Twin Cities metro area, whether you’re a beginner or a
                seasoned paddler
            </h2>
            <p
                class="byline text-center uppercase font-graphik-regular text-[13px] tracking-widest mt-8 hidden md:block"
            >
                The Minnesota Star Tribune • May 12, 2025
            </p>

            <p
                class="byline text-center uppercase font-graphik-regular text-[13px] tracking-widest mt-8 block md:hidden"
            >
                The Minnesota Star Tribune<br />May 12, 2025
            </p>
        </div>
    </div>
</div>

<div
    class="w-[90%] font-publico-text-roman text-[18px] md:text-[20px] leading-[1.6] max-w-2xl mx-auto pt-0"
>
    <p class="mb-4">
        You don’t have to go to the Boundary Waters to have fun paddling a
        canoe.
    </p>
    <p class="mb-4">
        In Minnesota, we pride ourselves on being connected to water. But
        getting out there is easier said than done. Where do I put in my boat?
        How fast is too fast for moving water? How long will this take? Are
        there rentals? The information you need is all over the place, if you
        can find it at all.
    </p>
    <p class="mb-4">
        We think it could be easier, so some water-loving Minnesota Star Tribune
        staff members set out to create an urban paddling guide. We researched,
        paddled and mapped our favorite routes within the metro area.
    </p>
    <p class="mb-6">
        We hope this guide helps you see the Twin Cities in new ways: take a
        lazy river ride toward the Minneapolis skyline; explore a little-seen
        part of St. Paul; practice portaging at Lebanon Hills in the southern
        suburbs. See you on the water, and please tag <a
            href="http://instagram.com/startribune"
            target="_blank">@startribune</a
        > in your urban paddling photos.
    </p>
    <div class="pt-2 pb-0">
        <h5
            class="font-graphik-bold uppercase tracking-widest text-[12px] md:text-[14px] my-4 text-left md:text-center"
        >
            While you’re out there, don’t forget to
        </h5>
        <ul
            class="mb-6 font-graphik-regular text-[16px] md:text-[18px] leading-[1.3] relative"
        >
            <li class="mb-2 md:mb-4">
                <span class="font-publico-headline-bold"
                    >Bring a life jacket.</span
                > State law requires one for each person on board your watercraft.
            </li>
            <li class="mb-2 md:mb-4">
                <span class="font-publico-headline-bold">Think twice</span>
                before paddling in winds over 10 mph.
            </li>
            <li class="mb-2 md:mb-4">
                <span class="font-publico-headline-bold"
                    >Watch water levels</span
                > on rivers and creeks.
            </li>
            <li class="mb-2 md:mb-4">
                <span class="font-publico-headline-bold">Swim with care.</span>
            </li>
            <li class="mb-2 md:mb-4">
                <span class="font-publico-headline-bold">Be mindful</span> of private
                property.
            </li>
        </ul>
    </div>
</div>

<style type="text/css">
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
        z-index: 100;
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
