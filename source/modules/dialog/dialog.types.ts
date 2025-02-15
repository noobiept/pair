type DialogButton = {
    text: string;
    action: () => void;
};

export type DialogState = {
    title: string;
    body: string;
    buttons: DialogButton[];
};
