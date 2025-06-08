import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'

interface ConfirmOptions {
  title?: string
  content?: string
  onOk?: () => void | Promise<void>
  onCancel?: () => void
  isDanger?: boolean
}

export function useConfirm() {
  return function showConfirm({
    title = 'Are you sure?',
    content = '',
    onOk,
    onCancel = () => {},
    isDanger = false,
  }: ConfirmOptions) {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      content,
      okButtonProps: {
        danger: isDanger,
      },
      async onOk() {
        if (onOk) {
          await onOk()
        }
      },
      onCancel,
      maskClosable: true
    })
  }
}
