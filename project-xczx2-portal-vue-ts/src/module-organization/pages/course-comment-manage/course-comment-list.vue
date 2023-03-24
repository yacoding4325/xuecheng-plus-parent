<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <div class="banner">
        <span class="primary-title">评价管理</span>
      </div>

      <!-- 搜索栏 -->
      <div class="searcher">
        <el-input
          class="el-input"
          placeholder="请输入课程名称"
          suffix-icon="el-icon-search"
          v-model="listQueryData.targetName"
        />
        <el-radio-group v-model="listQueryData.level">
          <el-radio :label="2">全部评价</el-radio>
          <el-radio :label="1">好评</el-radio>
          <el-radio :label="0">中评</el-radio>
          <el-radio :label="-1">差评</el-radio>
        </el-radio-group>
      </div>

      <!-- 数据列表 -->
      <!-- TODO: 拆成组件 -->
      <div class="dataList">
        <el-row
          :gutter="10"
          v-for="(comment, index) in listResult.items"
          :key="index"
          class="course-comment"
        >
          <el-col :span="1">
            <img :src="comment.userHead" class="user-head" />
          </el-col>
          <el-col :span="23">
            <el-row>
              <el-col :span="24">
                <el-rate v-model="comment.starRank" disabled></el-rate>
              </el-col>
              <el-col :span="24">
                <el-row>
                  <el-col :span="23" class="comment-text">{{ comment.commentText }}</el-col>
                  <el-col :span="1">
                    <el-button
                      type="text"
                      size="mini"
                      @click="handleShowReplyTextarea(comment)"
                    >{{ getReplyStatus(comment) }}</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col
                :span="24"
                class="come-from"
              >已上课10小时 评价来自《{{ comment.comeFrom }}》 {{ comment.commentDate | dateTimeFormat }} 举报</el-col>
              <el-col
                :span="24"
                class="comment-reply"
                v-if="comment.replyDTOList && comment.replyDTOList.length"
              >
                <el-row
                  v-for="(reply, subIndex) in comment.replyDTOList"
                  :key="subIndex"
                  class="reply-item"
                >
                  <el-col :span="24" class="reply-text">{{ reply.nickName }}回复：{{ reply.replyText }}</el-col>
                  <el-col :span="24" class="reply-date">{{ reply.replyDate | dateTimeFormat }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="24" v-if="comment.showReplyTextarea" class="my-reply-text">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="comment.myReplyText"
                  placeholder
                  maxlength="200"
                  show-word-limit
                ></el-input>
              </el-col>
              <el-col :span="24" v-if="comment.showReplyTextarea" class="reply-button">
                <el-button
                  type="primary"
                  size="medium"
                  class="btn-add el-button"
                  :disabled="!comment.myReplyText"
                  @click="handleReplyCourseComment(comment)"
                >发表回复</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!-- 翻页控制 -->
      <div class="dataList-pagination">
        <Pagination
          v-show="listResult.counts > 0"
          :total="listResult.counts"
          :page.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          @pagination="getCourseCommentPageList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import {
  ICourseCommentPageVO,
  ICommentDTO
} from '@/entity/course-comment-page-list'
import {
  getCourseCommentPageList,
  replyCourseComment
} from '@/api/course-comment'

@Component({
  components: {
    Pagination
  }
})
export default class CourseCommentList extends Vue {
  // 是否载入中
  private listLoading: boolean = false
  // 请求参数Query
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // 请求参数body
  private listQueryData = {
    targetName: '',
    level: 2
  }
  // 评论列表
  private listResult: ICourseCommentPageVO = {}

  // 计算属性
  getReplyStatus(comment: any) {
    if (comment.replyDTOList && comment.replyDTOList.length > 0) {
      return '已回复'
    }
    return !comment.showReplyTextarea ? '回复' : '取消回复'
  }

  /**
   * 评论列表
   */
  private async getCourseCommentPageList() {
    this.listLoading = true
    let tempQueryData: any = {}
    if (this.listQueryData.targetName) {
      tempQueryData.targetName = this.listQueryData.targetName
    }
    if (this.listQueryData.level != 2) {
      tempQueryData.level = this.listQueryData.level
    }
    let listResult: ICourseCommentPageVO = await getCourseCommentPageList(
      this.listQuery,
      tempQueryData
    )
    if (listResult && listResult.items) {
      listResult.items = listResult.items.map((item: any) => {
        item.showReplyTextarea = false
        item.myReplyText = ''
        return item
      })
    }
    this.listResult = listResult
    this.listLoading = false
  }

  /**
   * 回复/取消回复
   */
  private handleShowReplyTextarea(comment: any) {
    comment.showReplyTextarea = !comment.showReplyTextarea
  }

  /**
   * 发表回复
   */
  private async handleReplyCourseComment(comment: any) {
    let body = {
      commentId: comment.commentId,
      replyText: comment.myReplyText
    }
    // 提交表单
    await replyCourseComment(body)

    // 用户提示
    this.$message.success('发布回复成功')
    comment.showReplyTextarea = false
    comment.myReplyText = ''

    // 刷新列表
    this.getCourseCommentPageList()
  }

  // 监控 watch
  // 搜索栏
  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getCourseCommentPageList()
  }

  // 翻页 pageSize
  @Watch('listQuery.pageSize', { immediate: true })
  private watchListQueryPageSize(newVal: number) {
    this.listQuery.pageNo = 1
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  .nav-bar {
    margin-top: 16px;
  }

  .workspace .banner .btn-add {
    float: right;
  }

  .searcher {
    margin-top: 16px;

    .el-input {
      width: 218px;
      margin-right: 40px;
    }
    // div {
    //   width: 218px;
    //   margin-right: 10px;
    // }
  }

  .dataList {
    margin-top: 16px;

    .course-comment {
      padding: 20px 0;
      border-top: 1px solid #ededed;

      .user-head {
        width: 100%;
        margin-top: 10px;
        border-radius: 50%;
      }

      .comment-text {
        color: #333333;
      }

      .come-from {
        color: #999999;
        font-size: 12px;
      }

      .comment-reply {
        margin-top: 20px;
        padding: 15px 14px 5px 14px;
        background-color: #f8f8f8;

        .reply-item {
          margin-bottom: 10px;

          .reply-text {
            color: #666666;
          }

          .reply-date {
            margin-top: 5px;
            color: #999999;
            font-size: 12px;
          }
        }
      }

      .my-reply-text {
        margin-top: 25px;
      }

      .reply-button {
        margin-top: 10px;
        text-align: right;
      }
    }

    .course-comment:last-child {
      border-bottom: 1px solid #ededed;
    }
  }

  .dataList-pagination {
    text-align: center;
    width: 100%;
  }
}
</style>
