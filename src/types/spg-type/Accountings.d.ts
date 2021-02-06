/** 列表-查询账单信息列表-1,2,5,7 */
export interface AccountingsI {
  /** 账单状态0:无效1:有效 */
  accountingState: number | string;
  /** 区域标识 */
  areaId: number | string;
  /** 区域名称,最大长度200 */
  areaName: string;
  /** 开票状态 */
  billingState: number | string;
  /** 开票时间 */
  billingTime: number | string;
  /** 合同金额 */
  contractAmount: number | string;
  /** 合同编号,最大长度15 */
  contractNo: string;
  /** 合同状态 */
  contractState: number | string;
  /** 创建时间 */
  createTime: number | string;
  /** 删除标记0:未删除1:已删除 */
  deleted: number | string;
  /** 快递信息 */
  expressInfo: string;
  /** 融资金额 */
  financeAmount: number | string;
  /** 融资周期(单位:月) */
  financePeriod: string;
  /** 主键标识 */
  id: number | string;
  /** 交费金额 */
  paymentAmount: number | string;
  /** 交费截止时间 */
  paymentClosingTime: number | string;
  /** 交费状态0:未交费1:已交费 */
  paymentState: number | string;
  /** 交费时间 */
  paymentTime: number | string;
  /** 供应商区域标识 */
  providerAreaId: number | string;
  /** 供应商区域名称,最大长度200 */
  providerAreaName: string;
  /** 供应商标识 */
  providerId: number | string;
  /** 供应商名称,最大长度200 */
  providerName: string;
  /** 放款金额 */
  releaseAmount: number | string;
  /** 放款时间 */
  releaseTime: number | string;
  /** 供应商标识 */
  stockId: number | string;
  /** 采购人名称,最大长度200 */
  stockName: string;
  /** 更新时间 */
  updateTime: number | string;
}
