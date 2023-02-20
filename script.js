/* General functions */
const copyToClipboard = (content) => {
  navigator.clipboard.writeText(content);
};

const showAlert = (alertElement) => {
  alertElement.classList.remove('hidden');
  setTimeout(() => {
    alertElement.classList.add('hidden');
  }, 3000);
};

/* Email masking tool */

/* emt input */
const inputEmail = document.getElementById('emt-email');
/* emt buttons */
const maskEmailBtn = document.getElementById('emt-mask-email-btn');
const emailResetBtn = document.getElementById('emt-reset');
/* emt elements */
const emailResponse = document.getElementById('emt-response-email');
const emailShortCut = document.getElementById('emt-response-shortcut');
const emailResponseContainer = document.getElementById(
  'emt-response-container'
);
const emailAlert = document.getElementById('emt-alert');

const initEmt = () => {
  inputEmail.value = '';
  emailShortCut.value = '';
  emailResponseContainer.classList.add('hidden');
  emailAlert.classList.add('hidden');
};

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
};

const emailShortcutGenerator = (maskedEmail) => {
  return `Is ${maskedEmail} the best email address for me to send you a confirmation of your appointment?`;
};

const maskUsername = (username) => {
  return (
    username.charAt(0) +
    username.slice(1, -1).replace(/./g, '*') +
    username.charAt(username.length - 1)
  );
};

const maskEmail = (email) => {
  const parts = email.split('@');
  const usernamme = parts[0];
  const maskedUsername = maskUsername(usernamme);
  const domain = parts[1];
  const maskedEmail = maskedUsername + '@' + domain;
  return maskedEmail.toLowerCase();
};

maskEmailBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!validateEmail(inputEmail.value)) {
    showAlert(emailAlert);
    return;
  }
  emailAlert.classList.add('hidden');
  emailResponseContainer.classList.remove('hidden');
  emailResponse.textContent = maskEmail(inputEmail.value);
  emailShortCut.textContent = emailShortcutGenerator(
    maskEmail(inputEmail.value)
  );
  setTimeout(() => {
    initEmt();
  }, 20000);
});

emailResponse.addEventListener('click', (e) => {
  e.preventDefault();
  copyToClipboard(emailResponse.textContent);
});

emailShortCut.addEventListener('click', (e) => {
  e.preventDefault();
  copyToClipboard(emailShortCut.textContent);
});

emailResetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  initEmt();
});

/* Phone number format remover */

/* pnfr input */
const inputPhoneNumber = document.getElementById('pnfr-phone');
/* pnfr buttons */
const phoneRemoveFormatBtn = document.getElementById('pnfr-remove-format');
const resetRemovePhoneNumberBtn = document.getElementById('pnfr-reset');
/* pnfr element */
const phoneNumberResponse = document.getElementById('pnfr-reponse-number');
const phoneNumberAlert = document.getElementById('pnfr-alert');
const phoneRemoveResponseContainer = document.getElementById(
  'pnfr-response-container'
);

const initPnfr = () => {
  inputPhoneNumber.value = '';
  phoneNumberResponse.value = '';
  phoneRemoveResponseContainer.classList.add('hidden');
  phoneNumberAlert.classList.add('hidden');
};

const removePhoneNumberFormat = (phoneNumber) => {
  const regex = /\D/g;
  const removeCountryCode = phoneNumber.split('+1').reverse()[0];
  const strippedPhoneNumber = removeCountryCode.replace(regex, '');
  return strippedPhoneNumber;
};

const validatePhoneNumber = (phoneNumber) => {
  const regex = /^[0-9+()\-\s]+$/;
  return regex.test(phoneNumber);
};

phoneRemoveFormatBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!validatePhoneNumber(inputPhoneNumber.value)) {
    showAlert(phoneNumberAlert);
    return;
  }
  phoneRemoveResponseContainer.classList.remove('hidden');
  phoneNumberResponse.textContent = removePhoneNumberFormat(
    inputPhoneNumber.value
  );
  setTimeout(() => {
    initPnfr();
  }, 20000);
});

phoneNumberResponse.addEventListener('click', (e) => {
  e.preventDefault();
  copyToClipboard(phoneNumberResponse.textContent);
});

resetRemovePhoneNumberBtn.addEventListener('click', (e) => {
  e.preventDefault();
  initPnfr();
});

/* Mileage calculator */

/* mc input */
const modelYearInput = document.getElementById('mc-year');
/* mc buttons */
const calculateMileageBtn = document.getElementById('mc-calculate-mileage');
const mileageCalculatorResetBtn = document.getElementById('mc-reset');
/* mc elements */
const mileageCalculatorAlert = document.getElementById('mc-alert');
const mileageCalculatorResponse = document.getElementById('mc-reponse-mileage');
const mileageCalculatorResponseContainer = document.getElementById(
  'mc-response-container'
);

const initMc = () => {
  modelYearInput.value = '';
  mileageCalculatorResponse.textContent = '';
  mileageCalculatorAlert.classList.add('hidden');
  mileageCalculatorResponseContainer.classList.add('hidden');
};

const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const validateYear = (year) => {
  if (isNaN(year)) {
    return false;
  }
  const minYear = 2000;
  const maxYear = getYear();
  return year >= minYear && year <= maxYear;
};

const calculateMileage = (modelYear) => {
  const milesPerYear = 10000;
  const currentYear = getYear();
  const mileage = (currentYear - modelYear) * milesPerYear;
  return mileage;
};

calculateMileageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!validateYear(modelYearInput.value)) {
    showAlert(mileageCalculatorAlert);
    return;
  }
  mileageCalculatorResponseContainer.classList.remove('hidden');
  mileageCalculatorResponse.textContent = calculateMileage(
    modelYearInput.value
  );
  setTimeout(() => {
    initMc();
  }, 20000);
});

mileageCalculatorResetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  initMc();
});

mileageCalculatorResponse.addEventListener('click', () => {
  copyToClipboard(mileageCalculatorResponse.textContent);
});

/* Appointment note generator */

/* ang inputs */

const noteInfo = {
  recall: document.getElementById('ang-recall-code'),
  date: document.getElementById('ang-date'),
  system: document.getElementById('ang-system'),
  transportation: document.getElementById('ang-transportation'),
  complimentary: document.getElementById('ang-complimentary'),
  additional: document.getElementById('ang-additional'),
  parts: document.getElementById('ang-parts-availability'),
};

const test = {
  recall: 'OEM Code 01ZC3',
  date: '',
  system: '',
  transportation: 'drop off',
  complimentary: 'multi-point inspection',
  additional: 'oil change',
  parts: 'parts-yes',
};
/* ang buttons */
const generateNoteBtn = document.getElementById('ang-note');
const apptNoteGeneratorResetBtn = document.getElementById('ang-reset');
/* ang elements */
const noteGeneratorAlert = document.getElementById('ang-alert');
const noteGeneratorResponse = document.getElementById('ang-response-note');
const noteGeneratorResponseContainer = document.getElementById(
  'ang=response-container'
);

const initAng = () => {
  document.getElementById('ang-recall-code').value = '';
  document.getElementById('ang-date').value = '';
  document.getElementById('ang-system').value = '';
  document.getElementById('ang-transportation').value = '';
  document.getElementById('ang-complimentary').value = '';
  document.getElementById('ang-additional').value = '';
  document.getElementById('ang-parts-availability').value = '';
  noteGeneratorAlert.classList.add('hidden');
  noteGeneratorResponseContainer.classList.add('hidden');
  noteGeneratorResponse.textContent = '';
};

const validateInfo = (info) => {
  for (let key in info) {
    if (info.hasOwnProperty(key)) {
      if (
        info[key].value === '' ||
        info[key].value === null ||
        info[key].value === undefined
      ) {
        return true;
      }
    }
  }
  return false;
};

const generateNote = (info) => {
  const note = `${
    info.recall.value ? info.recall.value : 'CHECK RECALL!!!'
  } Appt booked on ${
    info.system.value ? info.system.value : 'CHECK SCHEDULING SYSTEM!!!'
  } for ${info.date.value ? info.date.value : 'CHECK DATE AND TIME!!!'}, ${
    info.transportation.value ? info.transportation.value : 'drop off'
  } selected, ${
    info.complimentary.value ? `${info.complimentary.value} added,` : ''
  } ${info.additional.value ? `additional ${info.additional.value},` : ''} ${
    info.parts.value === 'parts-yes'
      ? `RMBO shows parts are available`
      : 'Parts LIMITED call consumer if not available'
  }.`;
  return note;
};

generateNoteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateInfo(noteInfo)) {
    noteGeneratorAlert.classList.remove('hidden');
  }
  noteGeneratorResponseContainer.classList.remove('hidden');
  noteGeneratorResponse.textContent = generateNote(noteInfo);
  setTimeout(() => {
    initAng();
  }, 60000);
});

apptNoteGeneratorResetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  initAng();
});

noteGeneratorResponse.addEventListener('click', (e) => {
  e.preventDefault();
  copyToClipboard(noteGeneratorResponse.textContent);
});
