<template>
  <base-page header-title='登录' :left-arrow='false'>
    <div class='lg-top'>
      <img src='../../assets/logo.png' alt="" />
    </div>
    <div class='lg-center-label'>
      <span>BOOKSTORE</span>
    </div>
    <van-cell-group v-if='loginWithPassword'>
      <van-field
      v-model='userName'
      label='用户名'
      label-width='60px'
      :right-icon='userName ? "cross" : ""'
      placeholder='请输入用户名'
      @click-right-icon='userName = ""'></van-field>
      <van-field
      v-model='password'
      type='password'
      label='密码'
      label-width='60px'
      :right-icon='password ? "cross" : ""'
      placeholder='请输入密码'
      @click-right-icon='password = ""'></van-field>
    </van-cell-group>
    <van-cell-group v-else>
      <van-field
      type='tel'
      v-model='phone'
      label='手机号'
      label-width='60px'
      :right-icon='phone ? "cross" : ""'
      placeholder='请输入手机号'
      @click-right-icon='onClickPhoenIcon'
      @input='onPhoneNumberInput'
      :disabled='isShowCodeField'></van-field>
      <van-field v-if='isShowCodeField'
      v-model='verificationCode'
      label='验证码'
      label-width='60px'
      :right-icon='verificationCode ? "cross" : ""'
      placeholder='请输入验证码'
      @click-right-icon='verificationCode = ""'>
        <van-button slot='button'
        type='info'
        size='small'
        @click='onClickCodeBut'
        :disabled='isCodeButWrite'>
          重新发送<span v-if='codeTime'>({{ codeTime }})</span>
        </van-button>
      </van-field>
    </van-cell-group>
    <div class='lg-right-label'
    @click='loginWithPassword = !loginWithPassword'>
      {{ loginMode }}
    </div>
    <div class='lg-bottom'>
      <van-button type="info" size="large" @click='onClickSave'>
        {{ confirmLabel }}
      </van-button>
    </div>
  </base-page>
</template>

<script lang="ts">
import BasePage from '@/components/basePage.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    BasePage
  }
})
export default class Login extends Vue {
  // data
  public userName: string = ''
  public password: string = ''
  public phone: string = ''
  public verificationCode: string = ''
  public loginWithPassword: boolean = false
  public codeTime: number = 0
  public isShowCodeField: boolean = false
  public time: any = null

  // compute
  public get confirmLabel (): string {
    if (this.loginWithPassword || this.isShowCodeField) {
      return '登录'
    }
    return '下一步'
  }
  public get isCodeButWrite (): boolean {
    return this.codeTime > 0
  }
  public get loginMode (): string {
    if (this.isShowCodeField) {
      return ''
    }
    if (this.loginWithPassword) {
      return '手机号登录'
    }
    return '账号登录'
  }

  // methods
  public onClickSave (): void {
    if (!this.isShowCodeField) {
      this.sendCode()
      return
    }
    if (!this.loginWithPassword) {
      this.codeLogin()
    } else {
      this.passwordLogin()
    }
  }
  public passwordLogin (): void {
    if (!this.userName) {
      this.$toast('请输入用户名')
      return
    }
    if (!this.password) {
      this.$toast('请输入密码')
      return
    }
    console.log(this.userName, this.password)
  }
  public codeLogin (): void {
    if (!this.phone) {
      this.$toast('请输入手机号')
      return
    }
    if (!this.verificationCode) {
      this.$toast('请输入验证码')
      return
    }
    console.log(this.phone, this.verificationCode)
  }
  public onPhoneNumberInput (): void {
    let number = this.phone.replace(/\s+/g, '')
    this.phone = number
  }
  public sendCode (): void {
    if (!this.phone) {
      this.$toast('请输入手机号')
      return
    }
    this.isShowCodeField = true
    this.codeTime = 60
    let _this = this
    this.time = setInterval(() => {
      this.codeTime--
      if (this.codeTime === 0) {
        clearInterval(_this.time)
      }
    }, 1000)
  }
  public onClickPhoenIcon (): void {
    this.phone = ''
    if (this.isShowCodeField) {
      this.isShowCodeField = false
      this.codeTime = 0
      clearInterval(this.time)
    }
  }
  public onClickCodeBut (): void {
    this.sendCode()
  }

  // com
}
</script>

<style lang="less">
@import '~@/style/variables.less';
.lg-top{
  width: 167px;
  height: 150px;
  margin: 0 auto;
  padding: @small-horz-padding 0;
  img{
    width: 100%;
    height: 100%;
  }
}
.lg-center-label{
  font-size: @h3-font-size;
  display: flex;
  justify-content: center;
  margin-bottom: @large-item-space;
  color: @base-color;
  text-shadow: @base-color 0 0 10px;
}
.lg-right-label{
  display: flex;
  justify-content: flex-end;
  margin: @horizontal-padding;
  font-size: @normal-font-size;
  color: @blue;
}
.lg-bottom{
  margin: @small-horz-padding;
}
</style>
