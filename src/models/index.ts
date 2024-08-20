import User from "./user";
import Task from "./task";
import PersonalInfo from "./personal";
import WorkExperience from "./experience";
import Education from "./education";
import Skill from "./skill";
import Language from "./language";
import Certification from "./certification";
import Message from "./message";

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { as: "assignee", foreignKey: "userId" });

User.hasOne(PersonalInfo, { foreignKey: "userId" });
User.hasMany(WorkExperience, { foreignKey: "userId" });
User.hasMany(Education, { foreignKey: "userId" });
User.hasMany(Skill, { foreignKey: "userId" });
User.hasMany(Language, { foreignKey: "userId" });
User.hasMany(Certification, { foreignKey: "userId" });

PersonalInfo.belongsTo(User, { foreignKey: "userId" });
WorkExperience.belongsTo(User, { foreignKey: "userId" });
Education.belongsTo(User, { foreignKey: "userId" });
Skill.belongsTo(User, { foreignKey: "userId" });
Language.belongsTo(User, { foreignKey: "userId" });
Certification.belongsTo(User, { foreignKey: "userId" });

// Message
User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Message, { foreignKey: "receiverId" });

Message.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export {
  User,
  Task,
  Message,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Language,
  Certification,
};
