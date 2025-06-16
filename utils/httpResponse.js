const status = {
  ok: 200,
  created: 201,
  badrequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notfound: 404,
  Conflict: 409,
};
const message = {
  requiredFields: "All fields are required.",
  unauthorized: "Unauthorized user.",
  unauthenticated: "Unauthenticated user.",
  invalidCredentials: "Invalid credentials.",
  loginSuccess: "Login successful!",
  logoutSuccess: "Logout successful!",
  queryError: "Database query failed.",
  tokenRequired: "Token is required.",
  tokenValid: "Token is valid. You can log in.",
  invalidToken: "Invalid or expired token.",
  tokenExpiredOrInvalid: "Token is expired or invalid.",
  invalidID: "Invalid ID.",
  invalidjsonformat: "Invalid JSON format.",
  invalidEmailFormat: "Invalid email format.",
  
  emailRequired: "Email is required.",
  sendingOTP: "OTP sent successfully.",
  InvalidOTP: "Invalid OTP.",
  expiredOTP: "OTP has expired.",
  validOTP: "OTP is valid.",

  passwordsDoNotMatch: "Passwords do not match.",
  wrongPassword: "Incorrect password.",
  passwordPolicy:
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
  passwordUpdated: "Password updated successfully.",

  userExist: "User already exists.",
  userNotFound: "User does not exist.",
  accountCreated: "Account created successfully.",

  projectNotFound: "Project not found.",
  projectCreated: "Project created successfully.",
  getProjects: "Projects fetched successfully.",
  getProject: "Project details fetched successfully.",
  updateProject: "Project updated successfully.",
  deleteProject: "Project deleted successfully.",

  taskNotFound: "Task not found.",
  createTask: "Task created successfully.",
  gettask: "Task details fetched successfully.",
  updateTask: "Task updated successfully.",
  deleteTask: "Task deleted successfully.",

  messageNotFound: "Message not found.",
  messageNotExist: "Message does not exist.",
  messageCreated: "Message created successfully.",
  getMessages: "Messages fetched successfully.",
  getMessage: "Message details fetched successfully.",
  updateMessage: "Message updated successfully.",
  deleteMessage: "Message deleted successfully.",

  LogNotFound: "Log not found.",
  getLogs: "Logs fetched successfully.",
  getLog: "Log details fetched successfully.",
  updateLog: "Log updated successfully.",
  deleteLog: "Log deleted successfully.",

  getComments: "Comments fetched successfully.",
  createComment: "Comment created successfully.",
  deleteComment: "Comment deleted successfully.",
  commentNotFound: "Comment not found.",

  getAllUsers: "All users fetched successfully.",
  getSingleUser: "User details fetched successfully.",
  getuser: "User details fetched successfully.",
};

module.exports = {
  status,
  message,
};
