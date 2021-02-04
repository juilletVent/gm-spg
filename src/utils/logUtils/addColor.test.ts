import addColor, { g, y, b, r } from "./addColor";

const colors = {
  g: "\u001b[32m",
  y: "\u001b[33m",
  r: "\u001b[31m",
  b: "\u001b[34m",
  end: "\u001b[0m",
  magenta: "\u001b[35m",
  cyan: "\u001b[36m",
  white: "\u001b[37m",
};
const testContent = "testContent";

test("ColorsConsole测试组", () => {
  expect(r(testContent)).toEqual(`${colors.r}${testContent}${colors.end}`);
  expect(g(testContent)).toEqual(`${colors.g}${testContent}${colors.end}`);
  expect(b(testContent)).toEqual(`${colors.b}${testContent}${colors.end}`);
  expect(y(testContent)).toEqual(`${colors.y}${testContent}${colors.end}`);
  expect(addColor("magenta", testContent)).toEqual(
    `${colors.magenta}${testContent}${colors.end}`
  );
  expect(addColor("cyan", testContent)).toEqual(
    `${colors.cyan}${testContent}${colors.end}`
  );
  expect(addColor("white", testContent)).toEqual(
    `${colors.white}${testContent}${colors.end}`
  );
});
