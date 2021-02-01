export default function getContent(opt) {
  return `
import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { FormWrapper, FiltersFormType } from 'search-page';
import { RangePicker } from 'from-antd-datepicker';
import { StockPicker } from '@/components/Picker';
import { useUser } from '@/hooks/useUser';
import OrgPicker, { OrgPickerType } from '@/components/OrgPicker';

const { Option } = Select;

const FilterForm: FiltersFormType = props => {
  const {
    form: { getFieldDecorator },
  } = props;

  const { orgId } = useUser();

  return (
    <FormWrapper {...props} simpleMode={{ rows: 1 }} filtersDefault={[]}>
      <Form.Item label="成交时间">
        {getFieldDecorator('purchaseTime', {})(<RangePicker format="YYYY-MM-DD" />)}
      </Form.Item>
      <Form.Item label="购买方式">
        {getFieldDecorator(
          'purchaseMethod',
          {}
        )(
          <Select allowClear>
            <Option value="1">线下购买</Option>
            <Option value="2">线上平台购买</Option>
            <Option value="3">832平台购买</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="状态">
        {getFieldDecorator(
          'state',
          {}
        )(
          <Select placeholder="请选择状态" allowClear>
            <Option value={0}>正常</Option>
            <Option value={1}>退回</Option>
            <Option value={2}>作废</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="预算单位">
        {getFieldDecorator(
          'budgetOrgId',
          {}
        )(
          // <StockPicker upId={orgId} />
          <OrgPicker orgType={OrgPickerType.TYPE_STOCK} upId={orgId} showIncludeLower />
        )}
      </Form.Item>
      <Form.Item label="供应商/成交人">
        {getFieldDecorator('purchaseSupplier', {})(<Input allowClear />)}
      </Form.Item>
      <Form.Item label="采购地区">
        {getFieldDecorator('provinceName', {})(<Input allowClear />)}
      </Form.Item>
      <Form.Item label="登记时间">
        {getFieldDecorator('createTime', {})(<RangePicker format="YYYY-MM-DD" />)}
      </Form.Item>
      <Form.Item label="备注">{getFieldDecorator('remarks', {})(<Input allowClear />)}</Form.Item>
    </FormWrapper>
  );
};

export default FilterForm;
  `;
}
