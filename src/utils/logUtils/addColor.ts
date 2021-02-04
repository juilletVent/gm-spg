import colorsConsole from "colors-console";

export default function addColor(color: string, content: string) {
  return colorsConsole(color, content);
}

export const g = (content: string) => addColor("green", content);
export const y = (content: string) => addColor("yellow", content);
export const b = (content: string) => addColor("blue", content);
export const r = (content: string) => addColor("red", content);
