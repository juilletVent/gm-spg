import React from 'react';
import styled from 'styled-components';

const Lyout = styled.div`
  display: inline-block;
`;

const Point = styled.span`
  display: inline-block;
  margin-right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 1000px;
  vertical-align: middle;
  background-color: ${props => props.color};
`;

export enum StatusType {
  /**
   * 灰色，未完成
   */
  STATUS_UNDONE = 'rgba(0,0,0,0.25)',
  /**
   * 红色，失败
   */
  STATUS_FAILED = '#F5222D',
  /**
   * 蓝色，进行中
   */
  STATUS_UNDERWAY = '#1890FF',
  /**
   * 绿色，成功、完成
   */
  STATUS_SUCCESS = '#52C41A',
  /**
   * 橘黄色，异常、警告
   */
  STATUS_EXCEPTION = '#FAAD14',
}

type Props = {
  status?: StatusType;
  children: React.ReactNode;
};

export default function Status(props: Props) {
  const { children, status } = props;

  return (
    <Lyout>
      {status && <Point color={status} />}
      {children}
    </Lyout>
  );
}
