<template>
    <div>
        <van-cell v-if="message.type=='you'" class="you">
            <van-image
                    class="user-avater"
                    slot="icon"
                    round
                    src="http://192.168.137.39:8081/toutiao/image/cry.jpg"
            />
            <div slot="title" class="main-info">
                <div class="name">
                    骚话王
                    <span class="time">
                        {{getTime}}
                    </span>
                    <div class="content">{{message.message}}</div>
                </div>

            </div>
        </van-cell>


        <van-cell v-if="message.type=='me'" class="me">
            <div slot="default" class="main-info">
                <div class="name">
                    <span class="time">
                      {{getTime}}
                    </span>
                    <span class="username"> Yoshinoww</span>

                    <van-image
                            class="user-avater"
                            round
                            src="http://192.168.137.39:8081/toutiao/image/cry.jpg"
                    />
                    <div class="content">{{message.message}}</div>
                </div>

            </div>
        </van-cell>
    </div>
</template>

<script>
    import dayjs from 'dayjs'

    export default {
        name: "ChatItem",
        props: {
            message: {
                required: true,
            }
        },
        computed: {
            getTime() {
                return dayjs().format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
</script>

<style scoped>
    .you .user-avater {
        width: 40px;
        height: 40px;
    }

    .you .name {
        font-size: 14px;
        color: #406599;
    }

    .you .content {
        font-size: 16px;
        color: #222;
        background-color: #f6f6f6;
        padding-left: 10px;
        border-radius: 8px;
    }

    .you .time {
        font-size: 12px;
        color: #cccccc;
        margin-left: 130px;
    }

    .you .main-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }




    .me .user-avater {
        width: 40px;
        height: 40px;
    }

    .me .name {
        font-size: 14px;
        color: #406599;
    }

    .me .content {
        font-size: 16px;
        color: #222;
        background-color: #f6f6f6;
        padding-left: 10px;
        border-radius: 8px;
    }

    .me .username {
        margin-left: 110px;
    }

    .me .time {
        font-size: 12px;
        color: #cccccc;
        margin-left: 5px;
    }

    .me .main-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

</style>