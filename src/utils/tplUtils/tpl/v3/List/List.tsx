import { notification } from '@gmsoft/ui';
import styled from 'styled-components';
import { clone } from 'lodash';
import React, { useMemo } from 'react';
import creatSearchPage, { Filters, GetDataApi, PaginationI } from 'search-page';
// TODO 修改API引入
// import { api as API } from "@/api";
import Content from './Content';
import FilterForm from './FilterForm';

const ListLayout = styled.div`
  padding: 16px;
`;

const getDataApi: GetDataApi = async (filters: Filters, pagination: PaginationI) => {
  const filterPayload = clone(filters);

  filterPayload.pageNo = pagination.current;
  filterPayload.pageSize = pagination.pageSize;

  try {
    // TODO 修改调用API
    // const { data } = await API.xxxxxxxx({
    //   params: filterPayload,
    // });
    // TODO 确认接口返回数据结构
    return { data: [{}], total: 1 };
  } catch (error) {
    notification.error({
      message: '错误',
      description: `获取数据失败:${(error as Error).message}`,
    });
    return { data: [], total: 0 };
  }
};

function List() {
  const SearchPage = useMemo(
    () =>
      creatSearchPage({
        FiltersForm: FilterForm,
        getDataApi,
        hideOnSinglePage: false,
      }),
    []
  );

  return (
    <ListLayout>
      <SearchPage>{Content}</SearchPage>
    </ListLayout>
  );
}

export default List;
