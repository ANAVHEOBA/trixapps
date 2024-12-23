export const validatePhoneNumber = (phone: string) => {
    // Add your phone validation logic
    return phone.length >= 10;
  };
  
  export const validateReferralCode = (code: string) => {
    // Add your referral code validation logic
    return code.length >= 6;
  };