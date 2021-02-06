import { InterfaceDescI, ProjectDesc } from "@/types/InterfaceDesc";
import { get, isNil } from "lodash";

function filterListApi(apis: InterfaceDescI[]): InterfaceDescI[] {
  const isListApi = (api: InterfaceDescI) => {
    const data = get(api, "responseModel.200.schema.properties");
    const hasList =
      get(data, "data.type") === "array" && !isNil(get(data, "meta"));
    return hasList;
  };

  return apis.filter(isListApi);
}

export function filterListSchemaInterface(
  projectDesc: ProjectDesc
): ProjectDesc {
  const projectKeys = Object.keys(projectDesc);
  const filtered: ProjectDesc = {};
  projectKeys.forEach((key) => {
    filtered[key] = filterListApi(projectDesc[key]);
  });
  return filtered;
}
