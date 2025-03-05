import { OperaterBtns } from '@gmsoft/ui';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ContentProps } from 'search-page';
import { Table, Popconfirm, Button } from 'antd';
import React, { useCallback } from 'react';
import renderUtils from './renderConf';

const OperatorLayout = styled.div`
  display: flex;
  padding-bottom: 10px;
  gap: 5px;
`;

const { renderStatus } = renderUtils;
const { Column } = Table;

function Content(props: ContentProps) {
  const { data } = props;

  const history = useHistory();

  const onView = useCallback(
    record => {
      history.push(`/test-curd/detail/${record.id}`);
    },
    [history]
  );
  const onAdd = useCallback(() => {
    history.push(`/test-curd/edit/add`);
  }, [history]);
  const onEdit = useCallback(
    record => {
      history.push(`/test-curd/edit/${record.id}`);
    },
    [history]
  );
  const onDel = useCallback(record => {
    console.log(record);
  }, []);

  return (
    <>
      <OperatorLayout>
        <Button icon="plus" type="primary" onClick={onAdd}>
          新增
        </Button>
        <Button icon="delete" type="danger">
          删除
        </Button>
      </OperatorLayout>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column width="20%" title="第一列" key="column1" dataIndex="data_key_1" />
        <Column width="20%" title="第二列" key="column2" dataIndex="data_key_2" />
        <Column width="20%" title="第三列" key="column3" dataIndex="data_key_3" />
        <Column
          width="10%"
          title="状态"
          key="state"
          render={(_, record: any) => renderStatus(record)}
        />
        <Column
          width="15%"
          title="操作"
          key="operate"
          render={(_, record: any) => (
            <OperaterBtns>
              <Button type="link" onClick={() => onView(record)}>
                查看
              </Button>
              <Button type="link" onClick={() => onEdit(record)}>
                编辑
              </Button>
              <Popconfirm placement="left" title="确定删除吗？" onConfirm={() => onDel(record)}>
                <Button type="link">删除</Button>
              </Popconfirm>
            </OperaterBtns>
          )}
        />
      </Table>
    </>
  );
}

export default Content;
