export interface ValidationErrors {
  address?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export function validateLeadForm(data: {
  address: string;
  name: string;
  phone: string;
  email?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.address.trim()) {
    errors.address = 'Property address is required';
  }

  if (!data.name.trim()) {
    errors.name = 'Your name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
  }

  if (data.email && data.email.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
