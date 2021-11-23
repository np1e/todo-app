const { isAfter, subDays, addDays, isSameDay, format, compareAsc, compareDesc } = require('date-fns');

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const kind = 'Todo';

class Todo {

    isFinished() {
        return this.status === 1;
    }

    get overdue() {
        return isAfter(new Date(), this.dueDate) && !isSameDay(this.dueDate, new Date());
    }

    get formattedDueDate() {
        const today = new Date();
        const yesterday = subDays(today, 1);
        const tomorrow = addDays(today, 1);

        if(isSameDay(this.dueDate, yesterday)) {
            return "Yesterday";
        } else if (isSameDay(this.dueDate, tomorrow)) {
            return "Tomorrow";
        } else if (isSameDay(this.dueDate, today)) {
            return "Today";
        } else {
            return format(this.dueDate, 'd MMM');
        }
    }
}


const createItem = function(title, description, dueDate, callback) {
    const key = datastore.key(kind);

    const todo = {
        key: key,
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            status: 0
        },
    };

    datastore.save(todo, callback);
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
    datastore.delete(datastore.key([kind, id]), callback);
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
    todo.id = entity[datastore.KEY].id;
    todo.title = entity.title;
    todo.description = entity.description ?? "";
    todo.dueDate = entity.dueDate;
    todo.status = entity.status ?? 0;

    return todo;
}

exports.create = createItem;