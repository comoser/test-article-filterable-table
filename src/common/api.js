const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TODOS_URL = '/todos';

export const DEFAULT_PAGE = 1;
export const DEFAULT_NUMBER_OF_RESULTS = 10;

export const TodosAPI = {
    findAll: (page = DEFAULT_PAGE, limit = DEFAULT_NUMBER_OF_RESULTS, completed = null) => {
        return fetch(`${BASE_URL}${TODOS_URL}?_page=${page}&_limit=${limit}${completed !== null ? `&completed=${completed}` : ''}`);
    },
};
