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
  try {
    const { data } = await axios.get(api, {
      params: {
        project_ids: targetProjects.map((item) => item.id).join(","),
      },
    });
    // const { data } = await axios.get(
    //   "http://localhost:8080/ContractMock.json",
    //   {}
    // );
    return data.data as EasyMockServerDataI;
  } catch (error) {
    throw new Error("Mock数据获取失败！");
  }
}
