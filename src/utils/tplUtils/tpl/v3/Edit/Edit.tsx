import { Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditForm from './EditForm';
import { EditLayout } from './style';
import { convertToField, usePageData, useSave } from './dataHandle';
import { BtnGroup, FooterLayout, PageHeader, Title } from '../View/style';

function Edit() {
  const { goBack } = useHistory();

  const [formData, setFormData] = useState();

  const { pageData, loading: initLoading } = usePageData();

  const formRef = useRef<any>(null);

  const { loading: saveLoading, onSave } = useSave();

  const onSaveClick = useCallback(() => {
    if (formRef.current) {
      formRef.current.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        onSave(values, goBack);
      });
    }
  }, [goBack, onSave]);

  useEffect(() => {
    if (!initLoading && pageData) {
      setFormData(convertToField(pageData, ['group1-key-input', 'group1-key-option']));
    }
  }, [initLoading, pageData]);

  return (
    <Spin spinning={initLoading} tip="加载中...">
      <EditLayout>
        <PageHeader>
          <Title>编辑页面页头标题</Title>
          <BtnGroup>
            <Button loading={saveLoading} icon="rollback" onClick={goBack}>
              返回
            </Button>
            <Button loading={saveLoading} type="primary" icon="save" onClick={onSaveClick}>
              保存
            </Button>
          </BtnGroup>
        </PageHeader>
        <EditForm formData={formData} onChange={setFormData} ref={formRef} />
        <FooterLayout>
          <Button loading={saveLoading} icon="rollback" onClick={goBack}>
            返回
          </Button>
          <Button loading={saveLoading} type="primary" icon="save" onClick={onSaveClick}>
            保存
          </Button>
        </FooterLayout>
      </EditLayout>
    </Spin>
  );
}

export default Edit;
