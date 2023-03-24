<template>
  <div class="workspace">
    <!-- 步骤 -->
    <div class="steps">
      <!-- 导航 -->
      <div class="nav">
        <el-steps :active="stepsActive" finish-status="success" simple>
          <el-step title="签订入驻协议">
            <template slot="icon">1</template>
          </el-step>
          <el-step title="提交资料">
            <template slot="icon">2</template>
          </el-step>
          <el-step title="入驻审核">
            <template slot="icon">3</template>
          </el-step>
        </el-steps>
      </div>

      <div class="body">
        <!-- step 1 签订入驻协议 -->
        <common-entering-step1-sign-agreement
          ref="step1"
          v-show="stepsActive === 0"
          :signAgreement.sync="signAgreement"
        />

        <!-- step 2 机构提交资料 -->
        <company-entering-step2-submit-information
          ref="company-step2"
          v-show="stepsActive === 1 && type === '0'"
        />
        <!-- step 2 个人提交资料 -->
        <personal-entering-step2-submit-information
          ref="personal-step2"
          v-show="stepsActive === 1 && type === '1'"
        />

        <!-- step 3 入驻审核 -->
        <common-entering-step3-audit-information ref="step3" v-show="stepsActive === 2" />
      </div>

      <!-- 按钮 上一步 下一步 提交 -->
      <div class="footer">
        <!-- 上一步 -->
        <el-button v-if="stepsActive === 1" @click="handlePrev">上一步</el-button>
        <!-- 下一步 -->
        <el-button type="primary" :disabled="!signAgreement" @click="handleNext">
          <template v-if="stepsActive === 0">下一步</template>
          <template v-else-if="stepsActive === 1">提交</template>
          <template v-else>回首页</template>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import CommonEnteringStep1SignAgreement from './components/common-entering-step1-sign-agreement.vue'
import CompanyEnteringStep2SubmitInformation from './components/company-entering-step2-submit-information.vue'
import PersonalEnteringStep2SubmitInformation from './components/personal-entering-step2-submit-information.vue'
import CommonEnteringStep3AuditInformation from './components/common-entering-step3-audit-information.vue'

@Component({
  components: {
    CommonEnteringStep1SignAgreement,
    CompanyEnteringStep2SubmitInformation,
    PersonalEnteringStep2SubmitInformation,
    CommonEnteringStep3AuditInformation
  }
})
export default class Entering extends Vue {
  // 机构入驻0，个人入驻1
  private type: any = '0'
  // 当前step
  private stepsActive: number = 0
  // 我已阅读并同意此协议
  private signAgreement: boolean = false

  // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化
  @Watch('$route')
  onRouteChanged(to: Route, from: Route) {
    this.init(to)
  }

  /**
   * 生命周期钩子
   */
  created() {
    this.init(this.$route)
  }

  /**
   * 初始化
   */
  private init(route: Route) {
    this.type = route.name === 'company-entering' ? '0' : '1'
    this.stepsActive = 0
    this.signAgreement = false
  }

  // 上一页
  private handlePrev() {
    this.stepsActive -= 1
  }

  // 下一页
  private async handleNext() {
    if (this.stepsActive === 0) {
      this.stepsActive += 1
    } else if (this.stepsActive === 1) {
      if (this.type === '0') {
        await (this.$refs[
          'company-step2'
        ] as CompanyEnteringStep2SubmitInformation).submitCompany()
      } else {
        await (this.$refs[
          'personal-step2'
        ] as PersonalEnteringStep2SubmitInformation).savePersonalOrg()
      }
      // TODO: 这个地方浏览器console会报错
      this.stepsActive += 1
    } else {
      location.href = `${process.env.VUE_APP_CLIENT_PORTAL_URL}/pages/learing-index.html`
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  padding: 20px;
  .nav {
    padding-bottom: 20px;
  }
  .body {
    padding: 30px 0px 50px 0px;
    // background-color: darkcyan;
  }
  .footer {
    padding: 20px 0px 20px 0px;
    // border-top: 1px solid #ededed;
    text-align: center;
  }
}
</style>
