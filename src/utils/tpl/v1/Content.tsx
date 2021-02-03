import React, { useCallback } from "react";
import { Row, Col, Table, Button, Icon, Tag } from "antd";
import { ContentProps } from "search-page";
import styled from "styled-components";

export const BtnGroup = styled.div`
  margin: 3px 0;
`;

const { Column } = Table;

function Content(props: ContentProps) {
  const { data, filters, pagination, forceUpdate } = props;
  const onSubmit = useCallback((record) => {}, []);

  return (
    <Table dataSource={data} rowKey="id" pagination={false} size="small">
      <Column
        width="20%"
        title="案件名称/区域"
        key="key1"
        render={(text, record: any) => (
          <>
            <p>重庆张三某某案件</p>
            <Tag color="blue">渝北区</Tag>
          </>
        )}
      />
      <Column
        width="20%"
        title="地点"
        key="key2"
        render={(text, record: any) => (
          <>
            <p>重庆市某岔路口小胡同</p>
            <Tag color="magenta">建设中</Tag>
          </>
        )}
      />
      <Column
        width="20%"
        title="犯罪嫌疑人"
        key="key3"
        render={(text, record: any) => (
          <>
            <p>张三</p>
            <div>131110110110</div>
          </>
        )}
      />
      <Column
        width="20%"
        title="犯罪方式"
        key="key4"
        render={(text, record: any) => "作案未遂"}
      />
      <Column
        width="20%"
        title="操作"
        key="key5"
        render={(text, record: any) => (
          <>
            <Button type="link" onClick={() => onSubmit(record)}>
              判处死刑
            </Button>
          </>
        )}
      />
    </Table>
  );
}

export default Content;
