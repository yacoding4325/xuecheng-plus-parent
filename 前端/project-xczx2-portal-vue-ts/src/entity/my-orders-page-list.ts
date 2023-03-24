/**
 * 我的订单 分页结果集
 */
export interface IMyOrdersPageList {
  /**
   * 数据记录总数
   */
  counts?: number;
  first?: boolean;
  /**
   * 数据列表
   */
  items?: IOrdersDTO[];
  itemsSize?: number;
  /**
   * 当前页码
   */
  page?: number;
  /**
   * 总页数
   */
  pages?: number;
  /**
   * 一页数据数
   */
  pageSize?: number;
}

/**
 * 订单
 */
export interface IOrdersDTO {
  /**
   * 修改日期
   */
  changeDate?: Date;
  /**
   * 机构ID
   */
  companyId?: number;
  /**
   * 机构名称
   */
  companyName?: string;
  /**
   * 课程Id
   */
  coursePubId?: number;
  /**
   * 课程名称
   */
  coursePubName?: string;
  /**
   * 创建日期
   */
  createDate?: Date;
  /**
   * 结束时间
   */
  endTime?: Date;
  /**
   * 定价
   */
  initialPrice?: number;
  /**
   * 订单标识
   */
  orderId?: number;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 交易价
   */
  price?: number;
  /**
   * 起始时间
   */
  startTime?: Date;
  /**
   * 交易状态(0初始、 1已支付 -1已取消 -2已关闭 -3已退款)
   */
  status?: number;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 课程有效性
   */
  valid?: string;
}