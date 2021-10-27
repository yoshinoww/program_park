<template>
    <div>
        <van-nav-bar
                title="聊天"
                left-arrow
                @click-left="$router.back()"
        />

        <van-cell-group class="main-info" ref="info">
            <ChatItem v-for="message in messages" :message="message"></ChatItem>
        </van-cell-group>


        <van-cell-group class="main-send">
            <van-field v-model="message"  placeholder="请输入要发送的信息"/>
            <van-button type="info" size="small" class="send-btn" @click="onSend">发送</van-button>
        </van-cell-group>
    </div>
</template>

<script>
import ChatItem from "@/views/message/components/ChatItem";
import axios from "axios"
    export default {
        created() {
            this.messages.push({
               message:"你发一句话，对方回你一句骚话",
                type:'me',
            }
            );
        },
        components:{
            ChatItem,
        },
        name: "SendMessage",
        data() {
            return {
                message: "",
                messages:[],
            }
        },
        methods:{
          async  onSend(){
                this.messages.push({
                       message:this.message,
                        type:'me',
                    }
                );
                this.message='';
              const res =  await  axios("https://v1.jinrishici.com/rensheng.txt")
                this.messages.push({
                        message:res.data,
                        type:'you',
                    }
                );
              this.$refs.info.scrollTop=99999;
          }
        }
    }
</script>

<style scoped>
    .main-send {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .main-info {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 42px;
        top: 44px;
        overflow-y: auto;
    }

    .send-btn {
        width: 70px;
    }
</style>