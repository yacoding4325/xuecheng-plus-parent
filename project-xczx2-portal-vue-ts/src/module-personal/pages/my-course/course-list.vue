<template>
  <div class="personal-cont">
    <div class="my-course">
      <div class="title">
        <div class="lab-title">全部课表</div>
        <div class="tit-Item">
          <span>
            <em class="active">按学习时间进行排序</em>
            <em>按加入时间进行排序</em>
          </span>
          <span>
            <em class="active">全部</em>
            <em>付费</em>
            <em>即将过期</em>
            <em>失效</em>
          </span>
        </div>
      </div>
      <div class="cont">
        <!-- 数据列表 -->
        <template v-if="listData.items">
          <div class="col-lg-6" :key="index" v-for="(item, index) in listData.items">
            <div class="item">
              <div class="imgIco">
                <img src="../../../assets/img/timg.png" width="60" height="28" alt />
              </div>
              <div class="title">
                <span class="lab">继续学习</span>
                {{item.coursePubName}}
              </div>
              <div class="about" v-if="item.teachplanId">
                <span class="lab">正在学习</span>
                {{item.teachplanName}}
              </div>
              <div class="parting"></div>
              <div class="butItem text-center">
                <a
                  v-if="!item.teachplanId"
                  target="_blank"
                  class="golearing"
                  :href="`${portal_url}/pages/learing-course-video.html?coursePubId=${item.coursePubId}`"
                >开启课程</a>
                <a
                  v-else
                  target="_blank"
                  class="golearing"
                  :href="`${portal_url}/pages/learing-course-video.html?coursePubId=${item.coursePubId}&teachplanId=${item.teachplanId}`"
                >继续学习</a>
                <a
                  target="_blank"
                  class="classcom"
                  :href="`${portal_url}/pages/learing-article-comment.html?coursePubId=${item.coursePubId}`"
                >课程评价</a>
              </div>
            </div>
          </div>
        </template>

        <div class="clearfix"></div>

        <br />
        <!-- 翻页控制 -->
        <div class="dataList-pagination">
          <Pagination
            v-show="listData.counts > 0"
            :total="listData.counts"
            :page.sync="listQuery.pageNo"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
        <div class="clearfix"></div>

        <div class="help">
          <span class>帮助和常见问题 ></span>
          <span class>问题反馈 ></span>
        </div>
      </div>
    </div>
    <div id="listcont">
      <li>
        <a href="#">课程成绩</a>
      </li>
      <li>
        <a href="#">联系老师</a>
      </li>
      <li>
        <a href="#">课程延期</a>
      </li>
      <li>
        <a href="#">退出课程</a>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { getMyCoursePageList } from '@/api/my-course'
import { IMyCoursePageList, ICourseRecordDTO } from '@/entity/my-course'

@Component({
  components: {
    Pagination
  }
})
export default class MyCourse extends Vue {
  private portal_url: string = process.env.VUE_APP_CLIENT_PORTAL_URL

  // 查询
  private listData: IMyCoursePageList = {} // 数据体
  private listLoading: boolean = false // 是否载入中
  // api params
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }

  // 业务函数
  private async getList() {
    this.listLoading = true
    this.listData = await getMyCoursePageList(this.listQuery)
    this.listLoading = false
  }

  // 生命周期 life
  created() {
    this.getList()
  }

  // 监控 watch
  // 翻页 pageSize
  @Watch('listQuery.pageSize', { immediate: true })
  private watchListQueryPageSize(newVal: number) {
    this.listQuery.pageNo = 1
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';
.personal-cont {
  padding: 0px 10px 10px 25px;
  .top {
    .tit {
      padding: 10px 0;
      font-size: 18px;
      line-height: 45px;
      font-weight: bold;
      color: $master-color-5;
    }
    .top-cont {
      position: relative;
      padding: 15px 15px 15px 51px;
      background: $master-color-0;
      height: 200px;
      .imgIco {
        position: absolute;
        left: -55px;
        top: 10px;
        img {
        }
      }
      .title {
        font-size: 26px;
        margin-top: 10px;
        margin-bottom: 20px;
        .lab {
          position: relative;
          top: -3px;
          margin-right: 10px;
          font-size: 18px;
          color: $master-color-1;
        }
        .status {
          margin-left: 10px;
          border: solid 1px $master-color-3;
          display: inline-block;
          position: relative;
          top: -3px;
          padding: 3px 10px;
          color: $master-color-3;
          font-size: 15px;
        }
      }
      .about {
        font-size: 18px;
        color: $master-color-5;
        .lab {
          font-size: 16px;
        }
        .data {
          font-size: 18px;
          color: $master-color-2;
        }
      }
      .about::before {
        content: ' ';
        display: inline-block;
        position: relative;
        margin-right: 10px;
        top: 2px;
        width: 16px;
        height: 16px;
        background: url(../../../assets/img/play.png) center center no-repeat;
      }
      .rate {
        margin-top: 20px;
        margin-bottom: 20px;
        li {
          display: inline-block;
          list-style: none;
          width: 15px;
          height: 15px;
          margin-right: 10px;
          border-radius: 50%;
          border: solid 1px rgba(0, 164, 255, 0.5);
        }
        .active {
          background: rgba(0, 164, 255, 0.5);
          border: solid 0px rgba(0, 164, 255, 0.5);
        }
        span {
        }
      }

      .goLear {
        display: inline-block;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 10px;
        text-align: center;
        width: 160px;
        line-height: 36px;
        color: $master-color-0;
        background: $master-color-3;
        border: solid 1px $master-color-3;
      }
      .evalu {
        display: inline-block;
        font-weight: bold;
        text-align: center;
        width: 160px;
        color: $master-color-3 !important;
        line-height: 36px;
        color: $black;
        background: $master-color-0;
        border: solid 1px $master-color-3;
      }
      .division {
        width: 2px;
        height: 180px;
        position: absolute;
        top: 0px;
        right: 33%;
        background: $backColor;
      }
      .division::after,
      .division::before {
        content: ' ';
        display: inline-block;
        position: relative;
        top: -10px;
        left: -5px;
        background: $backColor;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .division::after {
        top: 154px;
      }
      .text-right {
        text-align: center;
      }
      .btn-primary {
        position: relative;
        top: 50px;
      }
    }
  }
  .my-course {
    padding: 0px;
    .title {
      padding: 10px 0;
      font-size: 18px;
      line-height: 45px;
      font-weight: bold;
      .lab-title {
        font-size: 18px;
        color: $master-color-5;
      }
      .tit-Item {
        background: $master-color-0;
        padding: 0 10px;
        line-height: 15px;
        color: $master-color-1;
        span {
          padding: 10px 0;
          display: inline-block;
          font-size: 14px;
          em {
            display: inline-block;
            padding: 0 20px;
            border-right: solid 1px $master-color-2;
          }
          em:last-child {
            border: none;
          }
        }
        span:last-child {
          float: right;
        }
        .active {
          color: $master-color-5;
        }
      }
    }
    .cont {
      .col-lg-6 {
        padding: 0px;
      }
      .item {
        background: $master-color-0;
        position: relative;
        padding-bottom: 10px;
        .imgIco {
          position: absolute;
          left: -4px;
          top: 30px;
        }
        .title {
          font-size: 22px;
          color: $black;
          font-weight: 400;
          margin-top: 10px;
          margin-bottom: 20px;
          line-height: 14px;
          padding: 30px 0px 0 70px;
          .lab {
            position: relative;
            top: -2px;
            margin-right: 10px;
            font-size: 16px;
            color: $master-color-1;
          }
          .status {
            margin-left: 10px;
            border: solid 1px $master-color-3;
            display: inline-block;
            position: relative;
            top: -3px;
            padding: 3px 10px;
            color: $master-color-3;
            font-size: 15px;
          }
          .out {
            color: $master-color-2;
            border-color: $master-color-2;
          }
          .outst {
            color: $greenTheme;
            border-color: $greenTheme;
          }
        }
        .about {
          font-size: 18px;
          padding: 10px 10px 10px 70px;
          color: $master-color-5;
          .lab {
            font-size: 16px;
          }
        }
        .about::before {
          content: ' ';
          display: inline-block;
          position: relative;
          margin-right: 10px;
          top: 2px;
          width: 16px;
          height: 16px;
          background: url(../../../assets/img/play.png) center center no-repeat;
        }
        .time {
          padding: 0px 10px 10px 70px;
          font-size: 14px;
          font-weight: 300;
          color: $master-color-1;
        }
        .rate {
          margin-top: 10px;
          padding: 0px 15px 15px 70px;
          li {
            display: inline-block;
            list-style: none;
            width: 15px;
            height: 15px;
            margin-right: 10px;
            border-radius: 50%;
            border: solid 1px rgba(0, 164, 255, 0.5);
          }
          .active {
            background: rgba(0, 164, 255, 0.5);
            border: solid 0px rgba(0, 164, 255, 0.5);
          }
          span {
            position: relative;
            top: -2px;
            color: $master-color-1;
            em {
              margin-left: 10px;
            }
          }
        }
      }
      .col-lg-6:nth-child(2n + 1) {
        .item {
          margin: 0px 5px 0px 0;
        }
      }
      .col-lg-6:nth-child(2n) {
        .item {
          margin: 0px 0px 0px 5px;
        }
      }
      .comment {
        width: 100%;
        padding-left: 70px;
        margin-top: 40px;
        margin-bottom: 20px;
        color: $master-color-1;
        .star-show {
          width: 109px;
          height: 19px;
          margin-top: 0px;
          display: inline-block;
          background: url(../../../assets/img/star-show.png) no-repeat;
          background-size: contain;
          .score {
            display: inline-block;
            i {
              display: none;
            }
          }
        }
        .text {
          display: inline-block;
          margin: 0 10px;
          em {
            color: $master-color-3;
          }
        }
      }
      .parting {
        width: 100%;
        height: 20px;
        position: relative;
        margin-top: 10px;
        border-top: solid 1px $backColor;
      }
      .parting::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        right: -5px;
        top: -5px;
        border-radius: 50%;
        background: $backColor;
      }
      .parting::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        left: -5px;
        top: -5px;
        border-radius: 50%;
        background: $backColor;
      }
      .butItem {
        margin-bottom: 10px;
        a {
          margin: 0 15px;
          color: $master-color-2;
          font-weight: 300;
          padding: 4px 10px;
        }
        .golearing {
          border: solid 1px $master-color-5;
          background: $master-color-5;
          color: $master-color-0;
        }
        .classcom {
          border: solid 1px $master-color-5;
          color: $master-color-5;
        }
      }
    }
  }
  .help {
    margin-top: 10px;
    padding: 10px;
    font-size: 18px;
    background: $master-color-0;
    color: $master-color-1;
    span {
      margin-right: 40px;
    }
    span::before {
      position: relative;
      top: 2px;
      margin-right: 3px;
    }
  }
  .aft {
    font-size: 15px;
    position: absolute;
    line-height: 10px;
    right: 10px;
    cursor: pointer;
    color: $master-color-2;
    top: 10px;
    font-weight: bold;
    text-align: right;
    ul {
      position: relative;
      top: 10px;
      padding: 15px;
      background: $master-color-0;
    }
    li {
      line-height: 34px;
      list-style: none;
      a {
        color: $black;
      }
    }
    li:hover {
      a {
        color: $master-color-5;
      }
    }
  }
  .ac {
    color: $master-color-5;
    ul {
      border: solid 1px $borderColor;
    }
  }
  #listcont {
    position: absolute;
    bottom: 9999px;
  }
}
</style>
