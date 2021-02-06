/** 列表-查询-签约方配置信息列表-1,2,7 */
export interface SignatoriesI {
  /** 账户名 */
  accountName: string;
  /** 账号 */
  accountNo: string;
  /** 激活标记,0:未激活 1:激活 */
  activated: number | string;
  /** 配置版本号 */
  configVersion: number | string;
  /** 创建人 */
  createBy: number | string;
  /** 创建人姓名,最大长度200 */
  createName: string;
  /** 创建时间 */
  createTime: number | string;
  /** 主键标识 */
  id: number | string;
  /** 法人 */
  legalPerson: string;
  /** 联系方式 */
  linkmanMobile: string;
  /** 地址 */
  localAddress: string;
  /** 开户行 */
  openingBank: string;
  /** 邮编.最大长度50 */
  postCode: string;
  /** 签约方名称,最大长度200 */
  signatory: string;
  /** 更新时间 */
  updateTime: number | string;
}
