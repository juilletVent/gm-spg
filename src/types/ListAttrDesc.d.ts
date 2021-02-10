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
  /** 递归定义的下层子级结构，如果是当前层级结构是数组的话，则具备此属性，表明数组元素的结构 */
  items?: ListAttrDesc;
  /** 如果当前节点是对象结构，此属性描述对象所具备的属性，数组 */
  properties?: {
    [key: string]: ListAttrDesc;
  };
}
