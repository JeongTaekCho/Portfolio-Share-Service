import { Modal } from "antd";

export const successModal = (message) => {
  Modal.success({
    title: message,
  });
};

export const errorModal = (message) => {
  Modal.error({
    title: message,
  });
};
