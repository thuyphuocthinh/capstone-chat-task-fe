import { toast } from 'vue3-toastify';

import type { i_noti } from '#/types/noti_types';

export const set_noti_mess = (mess: i_noti): void => {
  if(mess.error) {
    toast.error(mess.message, {
      position: toast.POSITION.TOP_RIGHT
    })
  } else {
    toast.success(mess.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
