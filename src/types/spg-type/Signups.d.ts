/** 列表-查询供应商签约列表-1,2,5,7 */
export interface SignupsI {
  /** 创建时间 */
  createTime: number | string;
  /** 选择增信单位,最大长度200 */
  creditEnhance: string;
  /** 删除标记0:未删除1:已删除 */
  deleted: number | string;
  /** 企业规模1大型2中型3小型4微型5不划型 */
  enterpriseScale: number | string;
  /** 主键标识 */
  id: number | string;
  /** 供应商注册时间 */
  importTime: number | string;
  /** 法人代表,最大长度100 */
  legalPerson: string;
  /** 法人身份证号,最大长度18 */
  legalPersonIdentity: string;
  /** 联系人 */
  linkman: number | string;
  /** 联系电话,最大长度32 */
  linkmanMobile: string;
  /** 联系人姓名,最大长度128 */
  linkmanName: string;
  /** 所在详细地址,最大长度300 */
  localAddress: string;
  /** 主体性质:1、政府2、企业3、个体户4、其它组织 */
  mainProperty: number | string;
  /** 是否是微企0:否1:是 */
  miniEnterprise: number | string;
  /** 供应商统一社会信用代码,最大长度18 */
  orgCode: string;
  /** 供应商平台编码,最大长度50 */
  platformCode: string;
  /** 邮政编码 */
  postCode: string;
  /** 供应商标识 */
  providerId: number | string;
  /** 供应商名称,最大长度200 */
  providerName: string;
  /** 注册资金 */
  registerMoney: number | string;
  /** 签约时间 */
  signUpTime: number | string;
  /** 签约方设置数据传输对象 */
  signatory: object;
  /** 签约配置标识 */
  signatoryId: number | string;
  /** 签约方名称,最大长度200 */
  signatoryName: string;
  /** 供应方式:1-代销2-生产3-同时 */
  supplyModel: number | string;
  /** 更新时间 */
  updateTime: number | string;
  /** 有效区域标识.最大长度20 */
  effectAreaId: number | string;
  /** 有效区域名称.最大长度50 */
  effectAreaName: string;
}
