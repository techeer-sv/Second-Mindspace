import { useState } from 'react';
import styles from './Modal.module.scss';
import Modal from 'react-modal';
// import { ModalProps, Node } from 'utils/types';
import { Node } from 'utils/types';
import WriteModal from 'pages/NodeMap/components/WriteModal';
import { ModalProps } from 'utils/types';
import PostTable from '../PostTable';

// modal
export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick: () => void;
  nodeName: string;
  buttonName1?: string;
  buttonName2?: string;
  selectedNodeInfo: Node;
  updateNodeInfo: (id: number | string, isActive: boolean) => void;
}

function NodeModal({
  isOpen,
  onRequestClose,
  onClick,
  nodeName,
  buttonName1,
  buttonName2,
  selectedNodeInfo,
  updateNodeInfo,
  button2Click,
  listOpen,
  onListClick,
  onListRequestClose,
}: ModalProps) {
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);

  const openWriteModal = () => {
    setWriteModalIsOpen(true);
    onClick();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(166, 166, 200, 0.2)',
          },
          content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(166, 166, 200, 0.6)',
            borderRadius: '1rem',
            border: 'none',
            width: '28rem',
            height: '15rem',
          },
        }}
      >
        <button className={styles.header__button} onClick={onClick}>
          <span className={styles.header__span}>x</span>
        </button>
        <div className={styles.content}>
          <span className={styles.content__title}>{nodeName}</span>
          <div>
            <button onClick={openWriteModal} className={styles.content__button}>
              {buttonName1}
            </button>
            <button className={styles.content__button}>{buttonName2}</button>
          </div>
        </div>
      </Modal>
      <WriteModal
        nodeInfo={selectedNodeInfo}
        isOpen={writeModalIsOpen}
        updateNodeInfo={updateNodeInfo}
        onRequestClose={() => setWriteModalIsOpen(false)}
      />
    </>
      </Modal>
      {/* 글 목록 리스트 모달 */}
      <Modal
        isOpen={listOpen}
        onRequestClose={onListRequestClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(166, 166, 200, 0.2)',
          },
          content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(166, 166, 200, 0.6)',
            borderRadius: '1rem',
            border: 'none',
            width: '50rem',
            height: '38rem',
          },
        }}
      >
        <button className={styles.header__button} onClick={onListClick}>
          <span className={styles.header__span}>x</span>
        </button>
        <PostTable />
      </Modal>
    </>
  );
}

export default NodeModal;
