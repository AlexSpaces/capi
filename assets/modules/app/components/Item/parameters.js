export const eventName = action => `modal:${action}-item:show`;
export const modalId = action => `${action}-item`;
export const countUrl = () => '/items/count';
export const findUrl = () => '/items';
export const deleteUrl = id => `/item/${id}`
export const getUrl = id => `/item/${id}`;
export const createUrl = () => '/items';
export const getForm = translate => {
    return {
        name: {
            type: 'text',
            label: translate('name'),
            required: true,
            col: 'col-9',
        },
        type: {
            type: 'text',
            label: translate('type'),
            required: true,
            col: 'col-3',
        }
    };
};
