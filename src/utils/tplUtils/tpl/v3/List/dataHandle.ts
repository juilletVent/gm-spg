import { message, Modal } from '@gmsoft/ui';
import Axios from 'axios';
import { useCallback, useState } from 'react';

export function useDel() {
  const [loading, setLoading] = useState(false);

  const onDel = useCallback(async (ids: string[] | string, onDone?: () => void) => {
    setLoading(true);

    try {
      await Axios.delete('/del', { data: { ids: typeof ids === 'string' ? [ids] : ids } });
      message.success('删除成功');

      if (onDone) {
        onDone();
      }
    } catch (error) {
      Modal.error({
        title: '删除失败',
        content: (error as Error).message,
      });
    }

    setLoading(false);
  }, []);

  return { loading, onDel };
}
