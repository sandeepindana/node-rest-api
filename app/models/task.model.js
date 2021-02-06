const sql = require('./db.js');

// constructor

const Task = function (task) {
    this.id = task.id;
    this.title = task.title;
    this.status = task.status;
}


Task.create = function (newTask, result) {
    sql.query("INSERT INTO `tbl_tasks` SET ?", newTask, function (err, res) {
        if (!err) {
            console.log('Task created successfully');
            result(null, res.insertId, ...newTask);
        } else {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    });
};

Task.findById = function (id, result) {
    sql.query("SELECT * FROM `tbl_tasks` WHERE id=" + id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Data Available: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Task.getAll = function (result) {
    sql.query("SELECT * FROM `tbl_tasks`", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Data Available: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Task.updateByID = function (id, task, result) {
    sql.query("UPDATE `tbl_tasks` SET `title`=?, `status`=? WHERE `id`=" + id, [task.title, task.status], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated task: ", { id: id, ...task });
        result(null, { id: id, ...task });

    });
};


Task.remove = function (id, result) {
    sql.query("DELETE FROM `tbl_tasks` WHERE id=" + id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("delete task: ", id);
        result(null, res);

    });
};

module.exports = Task;