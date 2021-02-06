/** 列表-查询开票设置列表-1,2,5,7 */
export interface InvoicesI {
  /** 账号 */
  accountNo: string;
  /** 创建时间 */
  createTime: number | string;
  /** 删除标记0:未删除1:已删除 */
  deleted: number | string;
  /** 供应商邮箱,最大长度128 */
  email: string;
  /** 主键标识 */
  id: number | string;
  /** 发票类型 1.普通发票 2.增值税专票 */
  invoiceType: number | string;
  /** 供应商联系人标识,最大长度10 */
  linkman: number | string;
  /** 供应商联系手机号,最大长度128 */
  linkmanMobile: string;
  /** 供应商联系人名称,最大长度128 */
  linkmanName: string;
  /** 地址 */
  localAddress: string;
  /** 开户行 */
  openingBank: string;
  /** 供应商统一社会信用代码,最大长度50 */
  orgCode: string;
  /** 供应商平台编码,最大长度50 */
  platformCode: string;
  /** 邮编.最大长度50 */
  postCode: string;
  /** 供应商标识识 */
  providerId: number | string;
  /** 供应商名称,最大长度200 */
  providerName: string;
  /** 是否开具发票 0:不开具发票 1:要开具发票 */
  takeInvoice: number | string;
  /** 供应商税号,最大长度50 */
  taxNo: string;
  /** 更新时间 */
  updateTime: number | string;
}
