interface BackendResponse {
  success: boolean;
}

const backendRequest = (data: any): Promise<BackendResponse> => {
  return new Promise(() => {});
};

const sendVerificationRequest = (email: string): Promise<BackendResponse> => {
  const requestData = {
    type: "verification",
    email: email,
  };

  return backendRequest(requestData);
};

const resetPassword = (
  email: string,
  activationCode: string,
  newPassword: string
): Promise<BackendResponse> => {
  const requestData = {
    type: "reset",
    email: email,
    activationCode: activationCode,
    newPassword: newPassword,
  };

  return backendRequest(requestData);
};

const ResetPasswordService = {
  sendVerificationRequest,
  resetPassword,
};
export default ResetPasswordService;
