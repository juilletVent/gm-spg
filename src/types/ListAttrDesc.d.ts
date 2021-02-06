/** 描述接口返回列表中的单独一项的数据类型定义 */
export interface ListAttrDesc {
  /** 字段名称 */
  key: string;
  /** 字段描述 */
  description: string;
  /** 字段格式 */
  format?: string;
  /** 字段类型 */
  type: string;
}
