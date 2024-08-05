import User from './user';
import Task from './task';

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'userId' });

export { User, Task };