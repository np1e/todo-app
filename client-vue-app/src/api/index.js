import rest from './axios';

class Api {

    async ping() {
        await rest.get('/ping', response => {
            console.log(response);
        }, (error_status, error_msg) => {
            console.log(error_status, error_msg);
        });
    }

    fetchTodos(success, error) {
        rest.get('/todos', success, error);
    }

    deleteTodo(id, success, error) {
        rest.del(`/todos/${id}`, success, error);
    }

    createTodo(payload, success, error) {
        rest.post('/todos', payload, success, error);
    }
}

export default new Api();