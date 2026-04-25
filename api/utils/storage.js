const fs = require('fs');
const PATH = './tasks.json';

const readTasks = async () => JSON.parse(await fs.promises.readFile(PATH, 'utf8'));
const writeTasks = async (data) => fs.promises.writeFile(PATH, JSON.stringify(data, null, 2), 'utf8');

module.exports = { readTasks, writeTasks };