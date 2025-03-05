import { Form } from 'antd';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function usePageData() {
  const { bizId } = useParams<{ bizId: string }>();

  const [pageData, setPageData] = useState<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bizId || bizId === 'add') {
      setLoading(false);
      return;
    }

    setPageData({
      'key-input': 'key-input',
      'key-option': '1',
    });
    setLoading(false);
  }, [bizId]);

  return { pageData, loading };
}

export function convertToField(data: any, formKey: string[]) {
  const formField: any = {};

  formKey.forEach(key => {
    formField[key] = Form.createFormField({
      value: get(data, key),
    });
  });

  return formField;
}
