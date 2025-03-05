import React from "react";
import { Input, Select } from "antd";
import { FiltersFormType, FormWrapper } from "search-page";

const { FormItem } = FormWrapper;
const { Option } = Select;

const FilterForm: FiltersFormType = (props) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <FormWrapper {...props} simpleMode={{ count: 3 }}>
      <FormItem label="输入类型">
        {getFieldDecorator("inputType")(
          <Input placeholder="请输入" allowClear />
        )}
      </FormItem>
      <FormItem label="选择类型">
        {getFieldDecorator("selectType")(
          <Select placeholder="请选择" allowClear>
            <Option value="1">Option-1</Option>
            <Option value="2">Option-2</Option>
          </Select>
        )}
      </FormItem>
    </FormWrapper>
  );
};

export default FilterForm;
