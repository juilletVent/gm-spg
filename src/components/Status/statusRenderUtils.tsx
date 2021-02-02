import React from 'react';
import isNil from 'ramda/es/isNil';
import Status, { StatusType } from './Status';

export interface StatusConf {
  /** 状态对应的值 */
  statusVal: string | number | 'def';
  /** 状态对应的文案 */
  statusText: string;
  /** 状态对应的标记颜色 */
  statusType?: StatusType;
}

type GenerateArgProps<T> = {
  /** 状态映射配置数组 */
  statusMappers: StatusConf[];
  /** 是否需要小圆点 */
  hasPoint?: boolean;
  /** 从数据对象获取statusVal的方法 */
  getStatusVal?: (data: T) => string | number;
};

export function generateRenderFn<T>(renderConfig: GenerateArgProps<T>) {
  const { statusMappers, hasPoint = true, getStatusVal } = renderConfig;

  // 直接传入状态渲染值
  function renderStatus(val: number | string);
  // 传入数据对象，状态渲染值交由值获取函数处理
  function renderStatus(data: T);

  // 渲染实现
  function renderStatus(arg: number | string | T) {
    let statusVal: number | string = '';

    // 如果传入的渲染值时对象，则判断是否在配置阶段传入了处理函数
    if (typeof arg === 'object') {
      if (typeof getStatusVal !== 'function') {
        // eslint-disable-next-line no-console
        console.error(
          '[非致命错误]：状态渲染生成函数的参数（getStatusVal）在实际渲染使用对象时不能为空，请传入getStatusVal函数，用以获取对象的状态渲染值。'
        );
        return;
      }
      // 通过值处理函数获取对象的状态渲染值
      statusVal = getStatusVal(arg);
    }

    // 通过状态渲染值匹配渲染配置
    let renderConf = statusMappers.find(item => item.statusVal === statusVal);
    if (isNil(renderConf)) {
      // 未匹配到已定义的状态：尝试寻找默认状态定义
      renderConf = statusMappers.find(item => item.statusVal === 'def');
    }
    if (isNil(renderConf)) {
      // 未匹配到默认状态定义，直接返回不渲染任何东西
      return;
    }

    // 根据渲染配置渲染对应的状态
    return (
      <Status status={hasPoint ? renderConf.statusType : undefined}>{renderConf.statusText}</Status>
    );
  }

  return renderStatus;
}
