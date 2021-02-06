import { EasyMockServerDataI } from "@/types/EasyMockServerData";
import { ProjectDesc } from "@/types/InterfaceDesc";

/**
 * 分析接口具备的所有基本信息（包含接口参数模型、接口响应模型、接口地址、接口描述）
 * @param mockData 由mock服务器返回的接口描述信息
 */
export default function analyseInterfaceInfo(
  mockData: EasyMockServerDataI
): ProjectDesc {
  const interfaceInfo: ProjectDesc = {};
  const parjectIds = Object.keys(mockData);
  parjectIds.forEach((id) => {
    interfaceInfo[id] = mockData[id].mocks.map((iInfo) => ({
      path: iInfo.url,
      desc: iInfo.description,
      params: JSON.parse(iInfo.parameters),
      responseModel: JSON.parse(iInfo.response_model),
      type: iInfo.method,
    }));
  });
  return interfaceInfo;
}
