import { MODAL_OPEN, MODAL_CLOSE } from './ModalConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = null;

const openModal = (state, { modalType, modalProps }) => ({
  modalType,
  modalProps
});

const closeModal = () => null;

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
});
