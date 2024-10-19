//Task class
class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}

//Taskslist class, initializes tasks array with tasks from local storage or empty array
class TasksList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasksList")) || [];
    this.nextId =
      this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 0;
  }

  displayAllTasks() {
    if (this.tasks.length === 0) {
      console.log("No tasks available.");
    } else {
      this.tasks.forEach((task) => {
        console.log(
          `ID: ${task.id}, Description: "${task.description}", Completed: ${task.completed}`
        );
      });
    }
  }

  addTask(description) {
    const newTask = new Task(this.nextId++, description, false);
    this.tasks.push(newTask);
    this.save();
    console.log(`Task added: #${newTask.id} ${description}`);
  }

  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((task) => task.id == taskId);
    if (task) {
      task.completed = !task.completed;
      this.save();
      console.log(
        `Task #${task.id} is ${task.completed ? "completed" : "incomplete"}.`
      );
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  updateTaskDescById(taskId, newDescription) {
    const task = this.tasks.find((task) => task.id == taskId);
    if (task) {
      task.description = newDescription;
      this.save();
      console.log(
        `Task #${task.id} description updated to "${newDescription}"`
      );
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  deleteTaskById(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id == taskId);
    if (taskIndex > -1) {
      const removedTask = this.tasks.splice(taskIndex, 1)[0];
      this.save();
      console.log(`Task "${removedTask.description}" deleted.`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  searchTasksByDesc(query) {
    const results = this.tasks.filter((task) =>
      task.description.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length > 0) {
      results.forEach((task) =>
        console.log(
          `ID: ${task.id}, Description: "${task.description}", Completed: ${task.completed}`
        )
      );
    } else {
      console.log(`No tasks found matching "${query}".`);
    }
  }

  save() {
    localStorage.setItem("tasksList", JSON.stringify(this.tasks));
  }
}

function main() {
  const tasksList = new TasksList();
  let choice = "1";

  do {
    displayMenu();
    choice = prompt(
      "Enter your choice:\nNote: To exit prompt and be able to open console\n" +
        "press cancel button or enter 0, then type 'main()' in console."
    );
    handleMenuChoice(choice, tasksList);
  } while (choice !== "0" && choice !== null);
}

function displayMenu() {
  const menuOptions =
    "Task Manager\n1: Add Task\n2: Display All Tasks\n3: Toggle Task Completion\n" +
    "4: Update Task Description\n5: Delete Task\n6: Search Tasks\n0: Exit";
  console.log(menuOptions);
}

function handleMenuChoice(choice, tasksList) {
  switch (choice) {
    case "1":
      const newTask = prompt("Enter task description:");
      tasksList.addTask(newTask);
      break;
    case "2":
      tasksList.displayAllTasks();
      break;
    case "3":
      const taskId = prompt("Enter task ID:");
      tasksList.toggleTaskCompletion(taskId);
      break;
    case "4":
      const taskIdToUpdate = prompt("Enter task ID:");
      const newDescription = prompt("Enter new task description:");
      tasksList.updateTaskDescById(taskIdToUpdate, newDescription);
      break;
    case "5":
      const taskIdToDelete = prompt("Enter task ID:");
      tasksList.deleteTaskById(taskIdToDelete);
      break;
    case "6":
      const query = prompt("Enter search query:");
      tasksList.searchTasksByDesc(query);
      break;
    case "0":
      console.log("Exiting the program.");
      break;
    default:
      console.log(`Invalid choice '${choice}'.`);
  }
}

main();
