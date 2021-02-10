# gm-spg

Fast init for SearchPage in everywhere.

## Description

帮助快速创建 SearchPage 所需的相关代码、周边组件、数据模型声明。

## Usage

1. 创建默认 SearchPage 默认模板

   ```shell
   spg gen def [moduleName] [version]
   # 在执行目录下创建一个名为ContractManage的列表模块，使用的模板版本号为 v1
   # 将在命令运行目录下创建ContractManage文件夹，并写出相关文件
   spg gen def ContractManage v1
   ```

2. 创建列表接口的 TS 声明文件

   ```shell
   spg gen api [--cover]
   # 将会读取项目根路径下的.easy-mock.js文件，并进入交互模式选择需要生成的Api组，生成的目标文件将存放在src/types/spg-type下
   spg gen api
   ```

   指定 `--cover` 选项，将会覆盖已经存在的同名接口文件。

   **重要说明：接口文件的命名规则为：接口地址的最后两段转换为帕斯卡命名风格加上`.d.ts`，如：接口地址为：/how/are/you，则此接口对应的文件名为：AreYou.d.ts，如果你将要生成的接口组内存在在此规则下多个接口映射到同一个文件名，将导致错误！**

3. 创建状态渲染组件

   ```shell
   # 将在src/components/下创建Status渲染组件，主要配合带有状态渲染的模板使用
   spg gen status
   ```

帮助快速创建

## Todo

[ x ] 生成基础模板
[ x ] 生成接口模型声明

## Question

1. 生成接口声明文件是文件名重名问题
2. 模板优化、模版与项目抽离
