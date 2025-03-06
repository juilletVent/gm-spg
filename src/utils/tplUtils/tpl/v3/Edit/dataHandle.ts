import { message, Modal } from '@gmsoft/ui';
import Axios from 'axios';
import { get } from 'lodash';
import { Form, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

export function usePageData() {
  const { bizId } = useParams<{ bizId: string }>();

  const [pageData, setPageData] = useState<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bizId || bizId === 'add') {
      setLoading(false);
      return;
    }

    Axios.get(`/get/${bizId}`)
      .then(
        ({ data }) => {
          setPageData({
            'group1-key-input': get(data, 'group1-key-input'),
            'group1-key-option': get(data, 'group1-key-option'),
          });
        },
        error => {
          notification.error({
            message: '获取数据失败',
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
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

export function useSave() {
  const { bizId } = useParams<{ bizId: string }>();

  const [loading, setLoading] = useState(false);

  const onSave = useCallback(
    async (payload: any, onDone?: () => void) => {
      setLoading(true);

      try {
        await Axios.post('/save', { ...payload, id: bizId !== 'add' ? bizId : undefined });
        message.success('保存成功');
        if (onDone) {
          onDone();
        }
      } catch (error) {
        Modal.error({
          title: '错误',
          content: `保存失败: ${(error as Error).message}`,
        });
      }

      setLoading(false);
    },
    [bizId]
  );

  return { loading, onSave };
}
