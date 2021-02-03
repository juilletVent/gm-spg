import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Tag, Form, Button, Icon, Popconfirm } from "antd";
import { ContentProps } from "search-page";
import { History } from "history";
import { isNaN, isNil, clone } from "lodash";
import styled from "styled-components";
import { currency, timeStampFormat, getValue, getSearch } from "@gmsoft/tools";
import { BtnGroup } from "@/components/Layout/BtnGroup";
import { AutoText } from "@/components";
import notInIframe from "@/utils/judgeIframe";
import OperaterBtns from "@/components/OperaterBtns";
import { unix2Date } from "@/utils/commonUtils";
import renderUtils from "./renderConf";
import { RecordItem } from "./RecordItem";
import { pathConf } from "../Home/routeRegisterCenter";
import CancelDrawer from "./CancelDrawer";

const { renderType, renderMethod, renderState } = renderUtils;
const { Column } = Table;
export const ExtraInfo = styled.div`
  float: right;
  line-height: 34px;
  padding: 0 5px;
  font-size: 14px;
  color: #e83f55;
`;

function Content(props: ContentProps & { history: History<any> }) {
  const { data, forceUpdate, filters, history } = props;
  // 作废的激活对象
  const [active, setActive] = useState<RecordItem>();
  const [drawerVisible, setVisible] = useState<boolean>(false);
  const onAddFinancing = useCallback(() => {
    if (notInIframe) {
      history.push(pathConf.ROUTE_PURCHASE_RECORD_INPUT);
    } else {
      window.top.eventBus.emit(
        "route.angular",
        "poverty-alleviation.purchase-record-input"
      );
    }
  }, [history]);

  const onExport = useCallback(() => {
    const filter = clone(filters);
    // 处理时间组件的key与接口不一致以及结构不一致问题
    filter.purchaseTimeStart = getValue(filter, "purchaseTime.start");
    filter.purchaseTimeEnd = getValue(filter, "purchaseTime.end");
    filter.createTimeStart = getValue(filter, "createTime.end");
    filter.createTimeEnd = getValue(filter, "createTime.end");
    delete filter.purchaseTime;
    delete filter.createTime;
    window.open(
      `\${process.env.REACT_APP_YW_GATEWAY}/demand/help/excel\${getSearch(filter)}`
    );
  }, [filters]);

  const switchVisible = useCallback(
    (record?: RecordItem) => {
      setActive(!drawerVisible ? record : undefined);
      setVisible(!drawerVisible);
    },
    [drawerVisible]
  );

  return (
    <>
      <BtnGroup>
        <Button type="primary" onClick={onAddFinancing}>
          <Icon type="plus" />
          新增扶贫采购
        </Button>
        <Button type="primary" onClick={onExport}>
          <Icon type="export" />
          导出
        </Button>
        <ExtraInfo>
          总金额：{isNaN(+data.statistics) ? "--" : currency(+data.statistics)}
        </ExtraInfo>
      </BtnGroup>
      <Table dataSource={data.data} rowKey="id" pagination={false}>
        <Column
          width="17%"
          title="预算单位/采购地区"
          key="region"
          render={(text, record: RecordItem) => (
            <>
              <AutoText rows={1}>{record.budgetOrgName}</AutoText>
              <Tag color="blue">{record.provinceName}</Tag>
            </>
          )}
        />
        <Column
          width="17%"
          title="供应商/采购类别"
          key="type"
          render={(text, record: RecordItem) => (
            <>
              <AutoText rows={1}>{record.purchaseSupplier}</AutoText>
              <AutoText zeroMarginBottom>{renderType(record)}</AutoText>
            </>
          )}
        />
        <Column
          width="15%"
          title="商品名称"
          key="name"
          render={(text, record: RecordItem) => (
            <AutoText zeroMarginBottom>{record.goodsName}</AutoText>
          )}
        />
        <Column
          width="10%"
          align="right"
          title={
            <>
              <p>成交金额(元)</p>
              <div>购买方式</div>
            </>
          }
          key="amount"
          render={(text, record: RecordItem) => (
            <>
              <p>
                {isNaN(+record.goodsMoney)
                  ? "--"
                  : currency(+record.goodsMoney)}
              </p>
              <div>{renderMethod(record)}</div>
            </>
          )}
        />
        <Column
          width="10%"
          title="成交/登记时间"
          key="time"
          render={(text, record: RecordItem) => (
            <>
              <AutoText>{unix2Date(record.purchaseTime)}</AutoText>
              <AutoText zeroMarginBottom>
                {unix2Date(record.createTime)}
              </AutoText>
            </>
          )}
        />
        <Column
          width="14%"
          key="备注"
          title="备注"
          render={(text, record: RecordItem) => (
            <AutoText zeroMarginBottom rows={2}>
              {record.remarks}
            </AutoText>
          )}
        />
        <Column
          width="7%"
          title="状态"
          key="state"
          render={(text, record: RecordItem) => renderState(record)}
        />
        <Column
          width="18%"
          title="操作"
          align="center"
          key="operater"
          render={(text, record: RecordItem) => (
            <OperaterBtns>
              <Button
                onClick={() =>
                  history.push(
                    `\${pathConf.ROUTE_PURCHASE_RECORD_VIEW}?bizId=\${record.goodsCode}`
                  )
                }
                type="link"
                size="small"
              >
                查看
              </Button>
              {record.purchaseMethod !== 3 && +record.state === 0 && (
                <Button
                  onClick={() => switchVisible(record)}
                  type="link"
                  size="small"
                >
                  作废
                </Button>
              )}
            </OperaterBtns>
          )}
        />
      </Table>
      <CancelDrawer
        visible={drawerVisible}
        switchVisible={switchVisible}
        activeItem={active}
        forceUpdate={forceUpdate}
      />
    </>
  );
}

export default Content;
