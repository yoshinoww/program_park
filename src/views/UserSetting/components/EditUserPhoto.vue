<template>
    <div>
        <van-nav-bar
                right-text="确认"
                left-arrow
                title="裁剪图片"
                @click-left="$emit('close')"
                @click-right="onSubmit"
                class="bar"
        />
        <div class="image">
            <img :src="imagePath" ref="image" style="max-width: 100%; display: block">
        </div>


    </div>
</template>

<script>
    import {updateUserPhoto} from "@/api/user";
    import Cropper from "cropperjs"
    import "cropperjs/dist/cropper.css"

    export default {
        name: "EditUserPhoto",
        props: {
            file: {}
        },
        data() {
            return {
                imagePath: window.URL.createObjectURL(this.file),
                cropper: null,
            }
        },
        methods: {
            async onSubmit() {
                let d = new FormData();
                d.append("files", this.file)
                console.log(d)
                const res = await updateUserPhoto(d);
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.$emit('edit',this.imagePath);
            }
        },
        mounted() {
            const img = this.$refs.image;
             const cropper = new Cropper(img, {
                 aspectRatio: 1,
                 autoCropArea: 0.8,//裁剪框初始化与原图比例
                 background: false,
                 modal: false,//周围阴影,  *
                 guides: true,//裁剪虚线    *
                 background: false,//网格背景  *
                 movable: false,//是否允许移动图片
                 zoomable: false,//放大
                 minCropBoxWidth: 100,//裁剪框最小值*
                 movable: false,//是否允许移动图片
             })
        }
    }
</script>

<style scoped>

    /deep/ .cropper-crop-box .point-se {
        opacity: 0 !important;
    }
   /* /deep/ .image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh !important;
    }*/
</style>