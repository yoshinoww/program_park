<template>
    <div>
        <van-nav-bar
                class="app-nav-bar"
                title="登录"
                left-arrow
                @click-left="$router.back()"
        />

        <van-form
                @submit="login"
                @failed="onFailed"
                :show-error="false"
                :show-error-message="false"
                ref="login-form"
        >

            <van-field
                    v-model="user.email"
                    icon-prefix="iconfont"
                    left-icon="email"
                    name="email"
                    placeholder="请输入邮箱/用户名"
                    :rules="formatCtrl.email"
                    class="email-icon"
            />

            <van-field
                    v-model="user.code"
                    clearable
                    name="code"
                    icon-prefix="iconfont"
                    left-icon="code"
                    placeholder="请输入验证码"
                    :rules="formatCtrl.code"
                    class="code-icon"
            >
                <template #button>
                    <van-button :disabled="CodeDisabled" :text="Codename" size="small" round class="send-btn"
                                @click.prevent="onSendCode"></van-button>
                </template>
            </van-field>

            <div class="login-btn-warp">
                <van-button type="info" block class="login-btn">登录</van-button>
            </div>

        </van-form>


        <div class="tip">
            <div>
                欢迎注册/登录pg_p，注册登录是一体的哦!
            </div>
            <div>
                请注意查看您的邮箱(*´・ω・`)
            </div>
            <div>
                万能账号1: 2423276253@qq.com &nbsp;&nbsp;1
            </div>
            <div>
                万能账号2: 2321004743@qq.com &nbsp;&nbsp;1
            </div>
            <div>
                出问题请联系QQ:2321004743
            </div>
        </div>


    </div>

</template>


<script>
    import {login, sendCode} from "@/api/user";
    import "../../styles/font/iconfont.css"

    export default {
        name: "Login",
        data() {
            return {
                user: {
                    email: "2423276253@qq.com",
                    code: "1",
                },
                formatCtrl: {
                    email: [{
                        required: true,
                        message: '请填写用户名'
                    },
                        {
                            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: "邮箱格式错误"
                        }],
                    code: [{
                        required: true,
                        message: '请填写验证码'
                    }]
                },
                isCountDownShow: false,
                Codename: "请发送验证码",
                isCodeTime: false,
                CodeDisabled: false,
            }
        },
        methods: {
            async login() {
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                });

                const res = await login({
                    "email": this.user.email,//记得改
                    "password": this.user.code,
                });
                if (res.data) {
                    this.$toast.success("登录成功!");
                    this.$store.commit('setUser', res.data.data.token)
                    //  this.$router.back();
                    if (this.$route.query.redirect === undefined) {
                        this.$router.push('/');
                    } else {
                        this.$router.push(this.$route.query.redirect);
                    }


                } else this.$toast.fail("登录失败!邮箱或验证码错误");
            },
            onFailed(error) {
                if (error.errors[0]) {
                    this.$toast({
                        message: error.errors[0].message,
                        //position:"top",
                    });
                }
            },
            async onSendCode() {
                try {
                    await this.$refs["login-form"].validate("email");
                    const res = await sendCode({
                        "email": this.user.email,
                    })

                    this.isCodeTime = true;
                    let time = 121;

                    this.CodeDisabled = true;
                    let end = setInterval(() => {
                        this.Codename = "剩余" + --time + " s";
                        if (time <= 0) {
                            this.CodeDisabled = false;
                            this.Codename = "请发送验证码";
                            this.isCodeTime = false;
                            clearInterval(end);
                        }
                    }, 1000)
                } catch (e) {
                    this.$toast({
                        message: e.message,
                    })
                }


            }
        },

    }
</script>

<style scoped>
    .login-btn-warp {
        padding: 26px 16px;
    }

    .login-btn-warp .login-btn {
        color: #fff;
        border: none;
    }

    .send-btn {
        background-color: #ededed;
        height: 34px;
    }

    .send-btn .van-button__text {

    }

    /deep/ .code-icon i, /deep/ .email-icon i {
        font-size: 28px;
    }

    .tip {
        position: fixed;
        top: 300px;
        left: 55px;
        right: 30px;
        bottom: 200px;
        font-size: 14px;
        color: #cccccc;
    }
</style>
