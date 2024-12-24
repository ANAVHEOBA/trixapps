export interface Country {
    name: string;
    code: string;
    flag: string;
    dial_code: string;
  }
  
  export const countries: Country[] = [
    { name: 'United States', code: 'US', flag: '🇺🇸', dial_code: '+1' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dial_code: '+44' },
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬', dial_code: '+234' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', dial_code: '+1' },
    { name: 'India', code: 'IN', flag: '🇮🇳', dial_code: '+91' },
    { name: 'Ghana', code: 'GH', flag: '🇬🇭', dial_code: '+233' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', dial_code: '+27' },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪', dial_code: '+254' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺', dial_code: '+61' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', dial_code: '+49' },
    // Add more countries as needed
  ];