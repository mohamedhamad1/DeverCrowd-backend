const status = {
  ok: 200,
  created: 201,
  badrequest: 400,
  unauthorized: 401,
  unauthanticated: 403,
  notfound: 404
};
const message = {
  requiredFields: "All Fields are required",
  unauthorized:"Unauthorized user",
  unauthanticated:"Unauthantication user",
  invalidCredentials: "Invalid credentials.",
  loginSuccess: "Login successful!",
  logoutSuccess: "Logout successful!",
  queryError: "Database query failed.",
  tokenRequired: "Token is required.",
  projectNotFound: "Project not found",
  messageNotFound: "Message not found",
  taskNotFound: "Task not found",
  invalidID: "Invalid ID.",
  tokenValid: "Token is valid. Can log in.",
  invalidToken: "Invalid or expired token.",
  messageDeleted: "Message Deleted successfully",
  messageNotExist: "Message Not Exist",
  emailRequired: "Email is required.",
  sendingOTP: "OTP sended successfully",
  InvalidOTP: "Invalid OTP.",
  expiredOTP: "OTP has expired.",
  validOTP: "OTP is valid.",
  projectCreated: "Project Created Successfully",
  passwordsDoNotMatch: "Passwords do not match.",
  passwordPolicy:
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
  passwordUpdated: "Password updated successfully.",
  wrongPassword: "Password not correct.",
  invalidEmailFormat: "Invalid email format.",
  userExist: "User is already in use.",
  accountCreated: "Account created successfully.",
  tokenExpiredOrInvalid: "Token is expired or invalid.",
};
module.exports = {
  status,
  message
};