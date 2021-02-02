import React from "react";
import { Row, Col } from "antd";
import { clone } from "lodash";
import createSearchPage, { GetDataApi } from "search-page";
import { notificationPop, NotificationType } from "@/components";
import { getValue } from "@gmsoft/tools";
import { demand as API_DEMAND } from "@/api";
import { RouteComponentProps } from "react-router";
import FiltersForm from "./FilterForm";
import Content from "./Content";

type Props = {};

async function getDataApi(filters, pagination) {
  const filter = clone(filters);
  // 分页参数处理
  filter.page = pagination.current;
  filter.pageSize = pagination.pageSize;
  // 处理时间组件的key与接口不一致以及结构不一致问题
  filter.purchaseTimeStart = getValue(filter, "purchaseTime.start");
  filter.purchaseTimeEnd = getValue(filter, "purchaseTime.end");
  filter.createTimeStart = getValue(filter, "createTime.start");
  filter.createTimeEnd = getValue(filter, "createTime.end");
  filter.includeLower = getValue(filter, "budgetOrgId.includeLower");
  filter.budgetOrgId = getValue(filter, "budgetOrgId.id");
  delete filter.purchaseTime;
  delete filter.createTime;

  try {
    const { data } = await API_DEMAND.demand_help_get({
      params: filter,
    });
    return {
      data: { data: data.data, statistics: data.statistics },
      total: +data.count,
    };
  } catch (e) {
    notificationPop(NotificationType.ERROR, "错误", `查询失败：\${e.message}`);
    return { data: { data: [] }, total: 0 };
  }
}

const SearchPage = createSearchPage({
  FiltersForm,
  getDataApi,
  filtersDefault: {
    state: 0,
  },
});

function RecordManage(props: Props & RouteComponentProps) {
  const { history } = props;

  return (
    <SearchPage>
      {(_props) => <Content {..._props} history={history} />}
    </SearchPage>
  );
}

export default RecordManage;
