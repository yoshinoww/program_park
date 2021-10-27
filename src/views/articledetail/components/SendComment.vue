<template>
    <div>
        <div class="issue">
            <van-field
                    v-model="content"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
            />
            <div class="issue-btn-item">
                <van-button round size="mini" class="issue-btn" @click="onSend">发布</van-button>
            </div>

        </div>


    </div>
</template>

<script>
    import {sendComment} from "@/api/comment";

    export default {
        name: "IssueComment",
        props:{
            article:{

            },
        },
        data() {
            return {
                content: ""
            }
        },
        methods:{
          async  onSend(){
              const  res= await sendComment({
                  "id3":this.article.authorId,
                  "id2":this.article.id,
                  "content":this.content,
              });
              if (!res.data.success){
                  this.$toast("获取数据失败！");
                  return;
              }
              this.content="";
              this.article.commentCount++;
              this.$toast("发送评论成功！");
              this.$emit("close");
            }
        }
    }
</script>

<style scoped>
    .issue {
        display: flex;
        align-items: center;
    }

    .issue .issue-btn-item {
        display: flex;
        flex-direction: column-reverse;
        height: 85px;
    }
    .issue .issue-btn-item .issue-btn{
        width: 70px;
    }
</style>