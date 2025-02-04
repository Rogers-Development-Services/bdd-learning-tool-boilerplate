import TaskManager from './TaskManager';
import Task from './Task';

// This is describing our test of the Task Manager class
describe('TaskManager', () => {
    let taskManager;

    //This takes a call back, and before any tests are run, we set the variable taskManager to be a new instance of the class TaskManager
    beforeEach(() => {
        taskManager = new TaskManager();
    })

    //Test #1: We expect any new instance of TaskManager to contain a task list, which only contains an empty array.
    it('should have an empty array upon instantiation', async () => {
        expect(taskManager.taskList).toEqual([]);
    })

    //Test #2: This describes our test of the AddTask function
    describe('AddTask', () => {
        it('should add a task with the given description', async () => {

            const mockDescription = 'task1';

            taskManager.addTask(mockDescription);

            //Whenever a new instance of TaskManager our taskList array should be empty, and if a new task is to be added it should appear at the first index
            expect(taskManager.taskList[0]).toBeInstanceOf(Task);
            //Whenever a new task is added to the taskList (at index 0), it's description should be 'task1'
            expect(taskManager.taskList[0].description).toBe(mockDescription);
        })
    })

    // Test #3: This test describes our test when a description is empty
    describe('empty description', () => {
        // We expect our addTask method when called, to return a message when a new task has an empty string as it's description
        it('should throw an error', async () => {
            expect(() => {
                taskManager.addTask('');
            }).toThrowError('Please provide a task description');
        })

        // If there is a task list which has an empty description, it should not be stored.
        it('should not store a task', async () => {
            try {
                taskManager.addTask('');
            } catch { }

            // We expect that the TaskManager's taskList will not contain an object/description with an empty string
            expect(taskManager.taskList).not.toContainEqual(
                expect.objectContaining({ description: '' }),
            )
        })
    })

    // Test #4: This test describes our Toggle Task functionality
    describe('Toggle Task', () => {
        it('should toggle the task for the given id', async () => {
            // this sets mockTask to a new instance of the Task class with the description property set to 'buy apples (with a random id generated by uuid)
            const mockTask = new Task('buy apples');

            // this sets the taskList's first task (at index 0) the 'buy apples' task (which is an object)
            taskManager.taskList = [mockTask];

            // this calls the toggleTask method to change the status of the current task to true from false
            taskManager.toggleTask(mockTask.id);

            // We expect that the mockTask obj's toggled property to be true.
            expect(mockTask.toggled).toBe(true);
        })
    })

    // Test #5: This test describes our delete Task functionality
    describe('Delete Task', () => {
        it('should delete the task for the given id', async () => {
            const removableTask = new Task('buy apples');

            taskManager.taskList = [removableTask];

            taskManager.deleteTask(removableTask.id);

            expect(taskManager.taskList).not.toContainEqual(
                expect.objectContaining({ id: removableTask.id }),
            )
        })
    })
});