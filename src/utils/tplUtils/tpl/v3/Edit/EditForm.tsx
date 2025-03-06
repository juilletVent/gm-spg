import React, { useImperativeHandle } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormGroup, GroupTitle } from './style';

const { Item: FormItem } = Form;
const { Option } = Select;

interface Props extends FormComponentProps {
  formData: any;
  onChange: (formData: any) => void;
}

function EditForm(props: Props, ref) {
  const { form } = props;
  const { getFieldDecorator } = form;

  useImperativeHandle(ref, () => ({
    validateFieldsAndScroll: form.validateFieldsAndScroll,
    getFieldsValue: form.getFieldsValue,
  }));

  return (
    <Form>
      <FormGroup>
        <GroupTitle>表单分组一</GroupTitle>
        <Row gutter={15}>
          <Col span={8}>
            <FormItem label="输入类型字段描述">
              {getFieldDecorator('group1-key-input', {
                rules: [
                  {
                    required: true,
                    message: '请输入',
                  },
                  {
                    max: 20,
                    message: '最多输入20个字符',
                    type: 'string',
                  },
                ],
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="选择类型字段描述">
              {getFieldDecorator('group1-key-option', {
                rules: [
                  {
                    required: false,
                    message: '请选择',
                  },
                ],
              })(
                <Select placeholder="请选择" allowClear>
                  <Option value="1">选项一</Option>
                  <Option value="2">选项二</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <GroupTitle>表单分组二</GroupTitle>
        <Row gutter={15}>
          <Col span={8}>
            <FormItem label="输入类型字段描述">
              {getFieldDecorator('group2-key-input', {
                rules: [
                  {
                    required: true,
                    message: '请输入',
                  },
                  {
                    max: 20,
                    message: '最多输入20个字符',
                    type: 'string',
                  },
                ],
              })(<Input placeholder="请输入" allowClear />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="选择类型字段描述">
              {getFieldDecorator('group2-key-option', {
                rules: [
                  {
                    required: false,
                    message: '请选择',
                  },
                ],
              })(
                <Select placeholder="请选择" allowClear>
                  <Option value="1">选项一</Option>
                  <Option value="2">选项二</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}

export default Form.create<Props>({
  mapPropsToFields(props) {
    const { formData } = props;
    return formData;
  },
  onFieldsChange(props, _, allFields) {
    props.onChange(allFields);
  },
})(React.forwardRef(EditForm));
