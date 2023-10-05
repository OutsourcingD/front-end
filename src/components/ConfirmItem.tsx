import React from "react";

const UseConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }

    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel && onCancel();
        }
    };

    return confirmAction;
};

export default UseConfirm;
