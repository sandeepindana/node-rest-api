const Task = require("../models/task.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Task
    const task = new Task({
        title: req.body.title,
        status: req.body.status
    });

    // Save Task in the database
    Task.create(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        else res.send(data);
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        else res.send(data);
    });
};

// Find a single Task with a id
exports.findOne = (req, res) => {
    Task.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Task with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Task with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Task identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Task.updateById(
        req.params.id,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Task with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Task with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    Task.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Task with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Task with id " + req.params.id
                });
            }
        } else res.send({ message: `Task was deleted successfully!` });
    });
};
