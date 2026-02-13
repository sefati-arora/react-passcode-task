const API_BASE_URL='http://localhost:4002';

const ApiEndPoint=
{
     baseUrl:`${API_BASE_URL}`,
     adminLogin:`${API_BASE_URL}/api/adminLogin`,
     otpVerify:`${API_BASE_URL}/api/otpVerify`,
     logOut:`${API_BASE_URL}/api/logOut`,
     userFetch:`${API_BASE_URL}/api/userFetch`,
     bookingFetch:`${API_BASE_URL}/api/bookingFetch`,
     EditPasscode:`${API_BASE_URL}/api/EditPasscode`,
     DashBoardData:`${API_BASE_URL}/api/DashBoardData`,
     verifyPasscode:`${API_BASE_URL}/api/verifyPasscode`,
     resendOtp:`${API_BASE_URL}/api/resendOtp`
}
export default ApiEndPoint;