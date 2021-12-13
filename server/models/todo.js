const { isAfter, subDays, addDays, isSameDay, format, compareAsc, compareDesc } = require('date-fns');

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const kind = 'Todo';

class Todo {
}


exports.create = async function(title, description, dueDate, callback) {
    const key = datastore.key(kind);

    const todo = {
        key: key,
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            finished: false
        },
    };

    datastore.upsert(todo, async (err, response)  => {
        if (err) {
            callback(undefined, err);
        } else {
            const id = parseInt(response.mutationResults[0]?.key.path[0]?.id, 10);
            const [item] = await datastore.get(datastore.key([kind, id]));
            callback(mapTodo(item), undefined);
        }
    });
}

exports.get = async function(id, callback) {
    const [todo] = await datastore.get(datastore.key([kind, id]));

    callback(error = null, mapTodo(todo));
}

exports.finish = function(id, callback) {
    console.log(`Finish todo ${id}`);
    callback(null, {});
}

exports.delete = function(id, callback) {
    console.log(`Delete todo ${id}`);
    const todoKey = datastore.key([kind, Number(id)])
    datastore.delete(todoKey, callback);
}


exports.fetchAll = function(callback, options = {sort: "date", order: "asc"}) {
    
    const query = datastore
        .createQuery(kind)
        .order('dueDate', {descending: options.order === "desc"})
        .limit(10);

    datastore.runQuery(query).then((data) => {
        const entities = data[0];
        const todos = [];
        
        entities.forEach(entity => {
            todos.push(mapTodo(entity));
        })

        callback(error = null, todos);
    });
}

/* entity =  {
    description: 'This is a test task',
    title: 'Test1',
    dueDate: 2021-11-17T09:20:07.031Z,
    [Symbol(KEY)]: Key {
      namespace: undefined,
      name: '98a7ca133c1c5',
      kind: 'Todo',
      path: [Getter]
    }
  }; */
function mapTodo(entity) {
    let todo = new Todo();
    console.log(entity);
    todo.id = entity[datastore.KEY].id;
    todo.title = entity.title;
    todo.description = entity.description ?? "";
    todo.dueDate = entity.dueDate;
    todo.finished = entity.finished;

    return todo;
}