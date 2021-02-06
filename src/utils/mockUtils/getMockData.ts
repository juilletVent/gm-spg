import { EasyMockConfI } from "@/types/EasyMockConf";
import { EasyMockServerDataI } from "@/types/EasyMockServerData";
import axios from "axios";

export default async function getMcokData(
  mockConf: EasyMockConfI,
  targetProjects: { id: string; name: string }[]
) {
  const api =
    mockConf.host.slice(-1) === "/"
      ? `${mockConf.host}api/mock/by_projects`
      : `${mockConf.host}/api/mock/by_projects`;
  const { data } = await axios.get(api, {
    params: {
      project_ids: targetProjects.map((item) => item.id).join(","),
    },
  });
  if (data.code === 200) {
    return data.data as EasyMockServerDataI;
  }
  throw new Error("Mock数据获取失败！");
}
