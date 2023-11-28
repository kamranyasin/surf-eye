export const api_url = "https://api.surfeye.video/";
export const media_url = "https://seawaves.pythonanywhere.com/media";
export const developement_url = "https://surfeye.video/";
// https://api.surfeye.video/
// https://seawaves.pythonanywhere.com
// http://3.71.171.192:8005/
// https://surfeyee.netlify.app/
// http://localhost:3000/
export const endpoints = {
  //VOTING_API
  GET_VOTING: `${api_url}voting`,
  POST_VOTING: `${api_url}voting`,
  //AUTH_API
  SIGNUP: `${api_url}signup`,
  LOGIN: `${api_url}login`,
  GOOGLE_SIGNIN: `${api_url}signupwithgoogle`,
  FORGOT_EMAIL_SENT: `${api_url}forgotPasswordlinkSend`,
  FORGOT_TOKEN_CHECK: `${api_url}forgettokenCheck`,
  FORGOT_CONFIRMATION: `${api_url}forgetConfirmation`,
  //COUPON_API
  POST_COUPONS: `${api_url}admincoupens`,
  GET_COUPONS: `${api_url}admincoupens`,
  PUT_COUPONS: `${api_url}admincoupens`,
  APPLY_COUPON: `${api_url}applycoupen?role=customer`,
  //FILTER_API
  GET_DATA: `${api_url}uploaddata`,
  //COACHING_API
  GET_COUCHING: `${api_url}getCoaching?role=customer`,
  //PAYMENT_API
  POST_PAYMENT: `${api_url}sessionbuy?role=customer`,
  POST_CHECKOUT: `${api_url}usersessionbuy?role=customer`,
  GET_CREDITS: `${api_url}sessionbuy?role=customer`,
  MY_SESSIONS: `${api_url}usersessionbuy?role=customer`,
  //PROFILE_API
  GET_PROFILE: `${api_url}profile?role=customer`,
  //REFERALCODE_API
  REFERAL_CODE: `${api_url}applyReferalcode?role=customer`,
  // DOWNLOAD_FILES:  `${api_url}downloadfile?role=customer&id=c39e00e0-6ad5-4c49-bbea-2736fcf19698`
};
