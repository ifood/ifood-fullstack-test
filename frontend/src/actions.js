import {ITEMS_MODAL} from './types'

export const showItemsModal = (data) => {
  return {
    type: ITEMS_MODAL,
    data,
    visible: true
  }
};
export const hideItemsModal = () => {
  return {
    type: ITEMS_MODAL,
    data: {},
    visible: false
  }
};