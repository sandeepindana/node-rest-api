module.exports = app => {
    const tasks = require("../controllers/task.controller.js");

    // Create a new Task
    app.post("/tasks", tasks.create);

    // Retrieve all Tasks
    app.get("/tasks", tasks.findAll);
    console.log("helooooooooo");


    // Retrieve a single Task with id
    app.get("/tasks/:id", tasks.findOne);

    // Update a Task with id
    app.put("/tasks/:id", tasks.update);

    // Delete a Task with id
    app.delete("/tasks/:id", tasks.delete);

};