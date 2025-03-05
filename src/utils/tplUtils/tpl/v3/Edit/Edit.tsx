import { Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditForm from './EditForm';
import { EditLayout } from './style';
import { convertToField, usePageData } from './dataHandle';
import { BtnGroup, FooterLayout, PageHeader, Title } from '../View/style';

function Edit() {
  const { goBack } = useHistory();

  const [formData, setFormData] = useState();

  const { pageData, loading } = usePageData();

  const formRef = useRef<any>(null);

  const onSave = useCallback(() => {
    if (formRef.current) {
      formRef.current.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        console.log('values: ', values);
      });
    }
  }, []);

  useEffect(() => {
    console.log('loading: ', loading);
    console.log('pageData: ', pageData);
    if (!loading && pageData) {
      setFormData(convertToField(pageData, ['key-input', 'key-option']));
    }
  }, [loading, pageData]);

  return (
    <Spin spinning={loading} tip="加载中...">
      <EditLayout>
        <PageHeader>
          <Title>详细页面页头标题</Title>
          <BtnGroup>
            <Button icon="rollback" onClick={goBack}>
              返回
            </Button>
            <Button type="primary" icon="save" onClick={onSave}>
              保存
            </Button>
          </BtnGroup>
        </PageHeader>
        <EditForm formData={formData} onChange={setFormData} ref={formRef} />
        <FooterLayout>
          <Button icon="rollback" onClick={goBack}>
            返回
          </Button>
          <Button type="primary" icon="save" onClick={onSave}>
            保存
          </Button>
        </FooterLayout>
      </EditLayout>
    </Spin>
  );
}

export default Edit;
