// This is a mock service. In a real app, you would call the Model here.

export const getAllUsers = async () => {
    return [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
};

export const createUser = async (data: any) => {
    return { id: 3, ...data };
};
