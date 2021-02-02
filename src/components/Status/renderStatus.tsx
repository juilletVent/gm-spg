import React from 'react';
import { isEmpty } from 'lodash';
import { getValue as get } from '@gmsoft/tools';
import Status, { StatusType } from './Status';

export interface StatusMap {
  /** 类型枚举对应的值 */
  statusVal: number;
  /** 类型对应的文案 */
  statusText: string;
  /** 类型对应的标记颜色 */
  statusType?: StatusType;
}

export function generateRenderFn<T = any>(
  statusMap: Array<StatusMap>,
  calcFn?: (data: T) => number,
  showPoint = true,
  defShowPoint = true,
  defShowText = '未知'
) {
  function renderFunction(status: number): React.ReactNode;
  function renderFunction<T>(data: T): React.ReactNode;

  function renderFunction(...args: Array<any>) {
    let conf: StatusMap | undefined;

    if (args.length === 1) {
      switch (typeof args[0]) {
        case 'string':
        case 'number':
          conf = statusMap.find(item => +item.statusVal === +args[0]);
          break;
        case 'object':
          if (typeof calcFn === 'function' && !isEmpty(args[0])) {
            // 认为是对象+回调处理入参
            const statusVal = calcFn(args[0]);
            conf = statusMap.find(item => +item.statusVal === statusVal);
          }
          break;
        default:
      }
    } else {
      throw new Error('generateRenderFn参数类型约定检验失败，请传入指定类型的参数');
    }

    const statusTemp = get(conf, 'statusType');
    const statusText = get(conf, 'statusText', defShowText);

    // 不需要小圆点的，认定为异常状态下也不需要小圆点，直接返回状态文本
    if (!showPoint) {
      return statusText;
    }

    // 已知状态，返回带有小圆点的DOM
    if (statusTemp) {
      return <Status status={statusTemp}>{statusText}</Status>;
    }

    // 未知状态（已经经过第一层判断：已知状态具备小圆点），根据defShowPoint判断未知状态是否需要小圆点
    if (defShowPoint) {
      return <Status status={StatusType.STATUS_FAILED}>{statusText}</Status>;
    }

    // 未知状态不需要小圆点的直接返回状态文本
    return statusText;
  }

  return renderFunction;
}
