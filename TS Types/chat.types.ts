export type UserBasicData = {
    id: string;
    firstName: string;
    lastName: string;
};

export type Message = {
    text: string;
    messagedBy: UserBasicData;
    messagedOn: string;
    id: string;
    loggedUser: boolean;
};

export type MessageBoxProps = {
    data: Message;
};
