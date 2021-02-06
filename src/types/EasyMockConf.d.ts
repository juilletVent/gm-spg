interface ProjectConfI {
  id: string;
  name: string;
  urlPreprocessor?: (uri: string) => string;
  baseUrl: string;
}

export interface EasyMockConfI {
  /** 地址 */
  host: string;
  /** 输出地址 */
  output: string;
  /** 模板 */
  template: string;
  /** 目标项目 */
  projects: ProjectConfI[];
}
