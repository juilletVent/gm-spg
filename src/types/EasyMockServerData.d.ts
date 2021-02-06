/* eslint-disable */

export interface ProjectInfoI {
  /** Easymock项目ID */
  _id: string;
  /** 项目名称 */
  name: string;
  /** 项目根路径（Mock中定义的） */
  url: string;
  /** 项目基本描述 */
  description: string;
  /** SwaggerDoc地址 */
  swagger_url: string;
  /** 母鸡 */
  members: any[];
  /** 母鸡 */
  group: any;
}

export interface MockInfoI {
  /** 接口ID */
  _id: string;
  /** 请求地址 */
  url: string;
  /** 接口类型 */
  method: string;
  /** 接口描述 */
  description: string;
  /** 接口Mock数据模型 */
  mode: string;
  /** 接口参数描述 */
  parameters: string;
  /** 接口响应描述 */
  response_model: string;
}

export interface ProjectGroupInfoI {
  /** 项目基本信息 */
  project: ProjectInfoI;
  /** 接口明细信息 */
  mocks: MockInfoI[];
}

export interface EasyMockServerDataI {
  [projectId: string]: ProjectGroupInfoI;
}
