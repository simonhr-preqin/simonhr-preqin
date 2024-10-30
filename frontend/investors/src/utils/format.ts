const language = 'en';

export const toDate = (dat: string): number => Date.parse(dat);

export const formatDate = (dat: Date | number): string => Intl.DateTimeFormat(language, { month: 'long', day: 'numeric', year: 'numeric' }).format(dat);

export const formatCurrency = (num: number, currency: string = 'GBP'): string =>
  Intl.NumberFormat(language, { notation: 'compact', style: 'currency', currency }).format(num);
