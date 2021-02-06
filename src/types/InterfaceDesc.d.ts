/** 接口描述 */
export interface InterfaceDescI {
  /** 请求地址 */
  path: string;
  /** 接口描述 */
  desc: string;
  /** 接口参数描述 */
  params: any[];
  /** 接口响应描述 */
  responseModel: any;
  /** 接口类型 */
  type: string;
}

export type ProjectDesc = { [key: string]: InterfaceDescI[] };

/** 单个Get查询参数的描述 */
export interface GetParamModelI {
  /** 参数名 */
  name: string;
  /** 参数类型 */
  in: string;
  /** 参数描述 */
  description: string;
  /** 是否必须 */
  required: false;
  /** 参数类型 */
  type: string;
  /** 参数格式 */
  format: string;
  /** 参数样例 */
  example: string | number;
}

/** 完全基于响应数据模型的List接口类型定义-非标准RESTful API */
export interface ListResponseNoRESTfulI<T = any> {
  /** 数据列表 */
  data: T[];
  /** 错误信息 */
  message?: string;
  /** 分页信息 */
  meta: {
    pageNo: string | number;
    pageSize: string | number;
    totalCount: string | number;
    totalPages: string | number;
  };
  /** 母鸡 */
  requestId: string;
  /** 母鸡 */
  status: string | number;
}

// TODO 遵守RESTful格式的响应定义
export type ListResponseRESTful<T = any> = Array<T> | {};
