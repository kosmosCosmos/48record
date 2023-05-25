<template>
    <div class="myVideo">
        <div id="dplayer" ref="player" class="dplayer video-box" ></div>
    </div>
</template>

<script>
import "video.js/dist/video-js.css";
import Hls from "hls.js";
import DPlayer from "dplayer";
import {useRoute} from 'vue-router';
export default {
    data() {
        return {
            dp: null,
            videoInfo: {
                img: "", // 视频封面
                url: ""
            },
        };
    },
    created() {
        const route = useRoute()
        this.videoInfo.url=route.query.show
        this.$nextTick(() => {
            this.loadVideo(this.videoInfo);
        });
    },
    methods: {
        loadVideo(videoInfo) {
            this.dp = new DPlayer({
                element: this.$refs.player,
                loop: false,
                video: {
                    pic: videoInfo.img, // 封面
                    url: videoInfo.url,
                    type: "customHls",
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls();
                            hls.loadSource(video.src);
                            hls.attachMedia(video);
                        },
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.video-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>