const UserModel = require('./userModel');
const GroupModel = require('./groupModel');
const UserGroupModel = require('./userGroupModel');

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'user_id' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'group_id' });

module.exports = { UserModel, GroupModel, UserGroupModel };
