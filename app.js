"use strict";

(() => {
  const EDGE_FUNCTION_URL = "https://zugwicbbfbefbbwugfxq.supabase.co/functions/v1/institution-applications";
  const SUPABASE_ANON_KEY = "sb_publishable_34jNpaqwtFeYboTVgO-mYw_efc0T-Ew";
  const COPY = {
    ar: {
      tagline: "منظومة تعليمية متكاملة", mainSite: "الموقع الرئيسي", eyebrow: "بوابة انضمام المؤسسات التعليمية",
      heroTitle: 'انضم إلى منظومة <span>iLogia</span> التعليمية',
      heroDescription: "نساعد المدارس والمراكز التعليمية على تطوير تجربتها التعليمية وإدارة خدماتها من خلال منظومة رقمية متكاملة.",
      secure: "بياناتكم محفوظة بأمان", egypt: "للمؤسسات التعليمية في مصر", partnership: "شراكة تعليمية",
      artTitle: "معًا نحو تجربة أفضل", artStatus: "خطوة أولى نحو التطوير", yourInstitution: "مؤسستكم",
      getStarted: "ابدأ رحلتك معنا", chooseType: "اختر نوع مؤسستك",
      chooseHelp: "خطوات بسيطة تفصل بينكم وبين الانضمام إلى منظومتنا.", schoolCard: "تسجيل مدرسة",
      schoolHelp: "للمدارس الحكومية والخاصة والدولية", centerCard: "تسجيل سنتر تعليمي",
      centerHelp: "للسناتر والمراكز التعليمية", portalNote: "هذه البوابة مخصصة لتسجيل المؤسسات التعليمية فقط.",
      footerLabel: "بوابة تسجيل المؤسسات التعليمية", footerLink: "ilogia-eg.com",
      backToSelection: "العودة للاختيار", secureRegistration: "تسجيل آمن", newApplication: "طلب انضمام جديد",
      schoolTitle: "تسجيل مدرسة", centerTitle: "تسجيل سنتر تعليمي",
      formIntro: "أكمل البيانات التالية، وسيتواصل معكم فريقنا لمناقشة الخطوات القادمة.",
      contact: "بيانات التواصل", location: "الموقع الجغرافي", additional: "تفاصيل إضافية",
      institutionDetails: "بيانات المؤسسة", review: "مراجعة الطلب", beforeSubmit: "قبل الإرسال",
      reviewTitle: "راجع بيانات الطلب", reviewHelp: "تأكد من صحة المعلومات قبل إرسال طلب الانضمام.",
      step: "الخطوة", of: "من", optionalNote: "يمكنك تخطي الحقول الاختيارية.",
      chooseOption: "اختر من القائمة", writeHere: "اكتب هنا...", required: "هذا الحقل مطلوب.",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.", invalidPhone: "يرجى إدخال رقم هاتف صحيح.",
      invalidUrl: "يرجى إدخال رابط صحيح.", previous: "السابق", next: "متابعة",
      submit: "إرسال طلب الانضمام", submitting: "جارٍ إرسال الطلب...", edit: "تعديل",
      consent: "أقر بصحة البيانات المقدمة، وأوافق على استخدامها للتواصل بشأن طلب انضمام مؤسستي إلى iLogia.",
      consentError: "يرجى الموافقة قبل إرسال الطلب.",
      privacy: "نحافظ على سرية بيانات مؤسستكم ونستخدمها لمراجعة هذا الطلب فقط.",
      received: "وصل طلبكم بأمان", successTitle: "تم استلام طلب الانضمام بنجاح!",
      successText: "سيقوم فريق iLogia بمراجعة بيانات مؤسستكم والتواصل معكم في أقرب وقت ممكن.",
      backToSite: "العودة إلى موقع iLogia", optional: "اختياري",
      genericError: "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.",
      invalidApplication: "يرجى مراجعة البيانات المطلوبة والتأكد من صحتها.",
      networkError: "تعذر الاتصال بالخدمة. تحقق من اتصالك بالإنترنت ثم حاول مجددًا.",
      rateError: "تم تجاوز عدد المحاولات المسموح. انتظر قليلًا ثم حاول مجددًا.",
      configError: "خدمة التسجيل غير مهيأة بعد. يرجى المحاولة لاحقًا.",
      honeypotError: "تعذر التحقق من الطلب. يرجى تحديث الصفحة والمحاولة مجددًا.",
      field: {
        institutionName: "اسم المؤسسة", schoolType: "نوع المدرسة", educationalStage: "المرحلة التعليمية",
        studentCount: "عدد الطلاب التقريبي", teacherCount: "عدد المدرسين التقريبي", specializations: "التخصصات التعليمية",
        subjects: "المواد الدراسية", targetStages: "المراحل الدراسية المستهدفة", branchCount: "عدد الفروع",
        contactName: "اسم المسؤول عن التواصل", ownerName: "اسم صاحب السنتر أو المدير المسؤول",
        contactRole: "المنصب الوظيفي", phone: "رقم الهاتف", whatsapp: "رقم WhatsApp",
        schoolEmail: "البريد الإلكتروني الرسمي", email: "البريد الإلكتروني",
        governorate: "المحافظة", city: "المدينة / المنطقة", address: "العنوان التفصيلي",
        mapUrl: "رابط الموقع على Google Maps", schoolWebsite: "الموقع الإلكتروني للمدرسة",
        website: "الموقع الإلكتروني", schoolIntroduction: "نبذة تعريفية عن المدرسة",
        services: "الخدمات التي ترغبون في استخدامها من iLogia", additionalNotes: "ملاحظات إضافية",
        facebookUrl: "رابط صفحة Facebook", additionalDetails: "تفاصيل إضافية"
      },
      values: {
        public: "حكومية", private: "خاصة", language: "لغات", international: "دولية", azhar: "أزهرية", other: "أخرى",
        kindergarten: "رياض الأطفال", primary: "المرحلة الابتدائية", preparatory: "المرحلة الإعدادية",
        secondary: "المرحلة الثانوية", multiple: "أكثر من مرحلة",
        under100: "أقل من 100", students100: "100 – 300", students300: "301 – 700",
        students700: "701 – 1,500", students1500: "أكثر من 1,500",
        under10: "أقل من 10", teachers10: "10 – 30", teachers30: "31 – 60",
        teachers60: "61 – 100", teachers100: "أكثر من 100",
        digitalContent: "محتوى تعليمي رقمي", institutionManagement: "إدارة المؤسسة",
        studentFollowUp: "متابعة الطلاب", teacherDevelopment: "تطوير المعلمين", digitalClassrooms: "فصول تعليمية رقمية",
        ...Object.fromEntries([
          ["cairo", "القاهرة"], ["giza", "الجيزة"], ["alexandria", "الإسكندرية"], ["qalyubia", "القليوبية"],
          ["sharqia", "الشرقية"], ["dakahlia", "الدقهلية"], ["gharbia", "الغربية"], ["monufia", "المنوفية"],
          ["beheira", "البحيرة"], ["kafr-elsheikh", "كفر الشيخ"], ["damietta", "دمياط"], ["port-said", "بورسعيد"],
          ["ismailia", "الإسماعيلية"], ["suez", "السويس"], ["north-sinai", "شمال سيناء"], ["south-sinai", "جنوب سيناء"],
          ["fayoum", "الفيوم"], ["beni-suef", "بني سويف"], ["minya", "المنيا"], ["assiut", "أسيوط"],
          ["sohag", "سوهاج"], ["qena", "قنا"], ["luxor", "الأقصر"], ["aswan", "أسوان"],
          ["red-sea", "البحر الأحمر"], ["new-valley", "الوادي الجديد"], ["matrouh", "مطروح"]
        ])
      }
    },
    en: {
      tagline: "Education, connected", mainSite: "Main website", eyebrow: "INSTITUTIONAL PARTNERSHIP PORTAL",
      heroTitle: 'Join the <span>iLogia</span> education ecosystem',
      heroDescription: "We help schools and educational centers enhance their learning experience and services through one connected digital ecosystem.",
      secure: "Your information is kept secure", egypt: "For educational institutions in Egypt", partnership: "EDUCATION PARTNER",
      artTitle: "Better learning, together", artStatus: "Your next step starts here", yourInstitution: "Your institution",
      getStarted: "GET STARTED", chooseType: "Choose your institution type",
      chooseHelp: "A few simple steps to join our growing education ecosystem.", schoolCard: "Register a school",
      schoolHelp: "Public, private and international schools", centerCard: "Register a learning center",
      centerHelp: "For tutoring centers and learning hubs", portalNote: "This portal is exclusively for educational institutions.",
      footerLabel: "Institutional registration portal", footerLink: "Visit ilogia-eg.com",
      backToSelection: "Back to selection", secureRegistration: "Secure registration", newApplication: "NEW APPLICATION",
      schoolTitle: "Register a school", centerTitle: "Register a learning center",
      formIntro: "Complete the following details and our team will be in touch about next steps.",
      contact: "Contact details", location: "Location", additional: "More about your institution",
      institutionDetails: "Institution details", review: "Review", beforeSubmit: "ALMOST THERE",
      reviewTitle: "Review your application", reviewHelp: "Make sure everything looks right before sending.",
      step: "Step", of: "of", optionalNote: "Optional fields can be left blank.",
      chooseOption: "Choose an option", writeHere: "Write here...", required: "This field is required.",
      invalidEmail: "Enter a valid email address.", invalidPhone: "Enter a valid phone number.",
      invalidUrl: "Enter a valid URL.", previous: "Previous", next: "Continue",
      submit: "Submit application", submitting: "Submitting...", edit: "Edit",
      consent: "I confirm that the information provided is accurate and consent to its use for reviewing my institution’s iLogia application.",
      consentError: "Please provide consent before submitting.",
      privacy: "Your institution’s information is kept confidential and used only to review this application.",
      received: "APPLICATION RECEIVED", successTitle: "Your application has been received!",
      successText: "The iLogia team will review your institution’s details and get in touch with you as soon as possible.",
      backToSite: "Back to iLogia", optional: "Optional",
      genericError: "We could not submit your application. Please try again.",
      invalidApplication: "Please review the required details and try again.",
      networkError: "Could not reach the service. Check your connection and try again.",
      rateError: "Too many attempts. Wait a little and try again.",
      configError: "Registration is not configured yet. Please try again later.",
      honeypotError: "We could not verify your application. Refresh and try again.",
      field: {
        institutionName: "Institution name", schoolType: "School type", educationalStage: "Educational stage",
        studentCount: "Approximate number of students", teacherCount: "Approximate number of teachers",
        specializations: "Educational specializations", subjects: "Subjects taught", targetStages: "Target educational stages",
        branchCount: "Number of branches", contactName: "Contact person", ownerName: "Owner or manager name",
        contactRole: "Job title", phone: "Phone number", whatsapp: "WhatsApp number",
        schoolEmail: "Official email address", email: "Email address", governorate: "Governorate", city: "City / area",
        address: "Full address", mapUrl: "Google Maps link", schoolWebsite: "School website",
        website: "Website", schoolIntroduction: "About the school",
        services: "iLogia services you’re interested in", additionalNotes: "Additional notes",
        facebookUrl: "Facebook page", additionalDetails: "Additional details"
      },
      values: {
        public: "Public", private: "Private", language: "Language", international: "International", azhar: "Al-Azhar", other: "Other",
        kindergarten: "Kindergarten", primary: "Primary", preparatory: "Preparatory", secondary: "Secondary", multiple: "Multiple stages",
        under100: "Under 100", students100: "100 – 300", students300: "301 – 700", students700: "701 – 1,500", students1500: "Over 1,500",
        under10: "Under 10", teachers10: "10 – 30", teachers30: "31 – 60", teachers60: "61 – 100", teachers100: "Over 100",
        digitalContent: "Digital learning content", institutionManagement: "Institution management",
        studentFollowUp: "Student progress tracking", teacherDevelopment: "Teacher development", digitalClassrooms: "Digital classrooms",
        ...Object.fromEntries([
          ["cairo", "Cairo"], ["giza", "Giza"], ["alexandria", "Alexandria"], ["qalyubia", "Qalyubia"],
          ["sharqia", "Sharqia"], ["dakahlia", "Dakahlia"], ["gharbia", "Gharbia"], ["monufia", "Monufia"],
          ["beheira", "Beheira"], ["kafr-elsheikh", "Kafr El Sheikh"], ["damietta", "Damietta"], ["port-said", "Port Said"],
          ["ismailia", "Ismailia"], ["suez", "Suez"], ["north-sinai", "North Sinai"], ["south-sinai", "South Sinai"],
          ["fayoum", "Fayoum"], ["beni-suef", "Beni Suef"], ["minya", "Minya"], ["assiut", "Assiut"],
          ["sohag", "Sohag"], ["qena", "Qena"], ["luxor", "Luxor"], ["aswan", "Aswan"],
          ["red-sea", "Red Sea"], ["new-valley", "New Valley"], ["matrouh", "Matrouh"]
        ])
      }
    }
  };

  const governors = ["cairo", "giza", "alexandria", "qalyubia", "sharqia", "dakahlia", "gharbia", "monufia", "beheira", "kafr-elsheikh", "damietta", "port-said", "ismailia", "suez", "north-sinai", "south-sinai", "fayoum", "beni-suef", "minya", "assiut", "sohag", "qena", "luxor", "aswan", "red-sea", "new-valley", "matrouh"];
  const serviceValues = ["digitalContent", "institutionManagement", "studentFollowUp", "teacherDevelopment", "digitalClassrooms"];
  const stageValues = ["kindergarten", "primary", "preparatory", "secondary"];
  const schoolTypes = ["public", "private", "language", "international", "azhar", "other"];
  const steps = (type) => type === "school" ? [
    { title: "institutionDetails", fields: [
      f("institutionName", "text", true), f("schoolType", "select", true, schoolTypes),
      f("educationalStage", "select", true, ["kindergarten", "primary", "preparatory", "secondary", "multiple"]),
      f("studentCount", "select", true, ["under100", "students100", "students300", "students700", "students1500"]),
      f("teacherCount", "select", true, ["under10", "teachers10", "teachers30", "teachers60", "teachers100"])
    ] },
    { title: "contact", fields: [f("contactName", "text", true), f("contactRole", "text"), f("phone", "tel", true), f("whatsapp", "tel"), f("schoolEmail", "email", true)] },
    { title: "location", fields: [f("governorate", "select", true, governors), f("city", "text", true), f("address", "textarea", true), f("mapUrl", "url")] },
    { title: "additional", fields: [f("schoolWebsite", "url"), f("schoolIntroduction", "textarea"), f("services", "checks", false, serviceValues), f("additionalNotes", "textarea")] }
  ] : [
    { title: "institutionDetails", fields: [
      f("institutionName", "text", true), f("specializations", "textarea", true), f("subjects", "textarea", true),
      f("targetStages", "checks", true, stageValues),
      f("studentCount", "select", true, ["under100", "students100", "students300", "students700", "students1500"]),
      f("teacherCount", "select", true, ["under10", "teachers10", "teachers30", "teachers60", "teachers100"]),
      f("branchCount", "number", true)
    ] },
    { title: "contact", fields: [f("ownerName", "text", true, null, "contactName"), f("phone", "tel", true), f("whatsapp", "tel"), f("email", "email", true)] },
    { title: "location", fields: [f("governorate", "select", true, governors), f("city", "text", true), f("address", "textarea", true), f("mapUrl", "url")] },
    { title: "additional", fields: [f("facebookUrl", "url"), f("website", "url"), f("services", "checks", false, serviceValues), f("additionalDetails", "textarea")] }
  ];
  function f(key, type, required = false, options = null, labelKey = key) { return { key, type, required, options, labelKey }; }

  const registration = document.getElementById("registration");
  const landing = document.getElementById("landing");
  const institutionSection = document.getElementById("institution-section");
  const languageButton = document.getElementById("language-toggle");
  let language = "ar";
  let currentType = "";
  let currentSteps = [];
  let currentStep = 0;
  let values = {};
  let applicationId = "";
  let consent = false;
  let submitting = false;

  const text = (key) => COPY[language][key];
  const translate = (key) => COPY[language].values[key] || key;
  const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const flattened = () => currentSteps.flatMap((step) => step.fields);

  function updateLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-copy]").forEach((element) => {
      const key = element.dataset.copy;
      if (COPY[language][key]) element.innerHTML = COPY[language][key];
    });
    document.querySelector(".header-actions").setAttribute("aria-label", language === "ar" ? "القائمة الرئيسية" : "Main navigation");
    languageButton.textContent = language === "ar" ? "English" : "العربية";
    if (currentType) {
      currentSteps.forEach((step) => step.fields.forEach((field) => { delete field.error; }));
      renderForm();
    }
  }

  function start(type) {
    currentType = type;
    currentSteps = steps(type);
    currentStep = 0;
    values = Object.fromEntries(flattened().map((field) => [field.key, field.type === "checks" ? [] : ""]));
    applicationId = "";
    consent = false;
    submitting = false;
    registration.hidden = false;
    landing.hidden = true;
    institutionSection.hidden = true;
    renderForm();
    registration.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function fieldMarkup(field) {
    const label = text("field")[field.labelKey];
    const currentValue = values[field.key] ?? (field.type === "checks" ? [] : "");
    const error = field.error ? `<span class="field-error" id="${field.key}-error" role="alert">${escapeHtml(field.error)}</span>` : "";
    const requiredMark = field.required ? '<span class="required-mark" aria-hidden="true"> *</span>' : "";
    const common = `id="${field.key}" name="${field.key}" aria-invalid="${field.error ? "true" : "false"}"${field.error ? ` aria-describedby="${field.key}-error"` : ""}`;
    let control = "";
    if (field.type === "select") {
      const options = field.options.map((key) => `<option value="${escapeHtml(key)}" ${currentValue === key ? "selected" : ""}>${escapeHtml(translate(key))}</option>`).join("");
      control = `<select ${common}><option value="">${escapeHtml(text("chooseOption"))}</option>${options}</select>`;
    } else if (field.type === "checks") {
      control = `<div class="check-options ${field.options.length === 5 ? "check-options-grid" : ""}" role="group" aria-labelledby="${field.key}-label"><span class="visually-hidden" id="${field.key}-label">${escapeHtml(label)}</span>${field.options.map((key) => `<label class="check-option ${(Array.isArray(currentValue) && currentValue.includes(key)) ? "is-checked" : ""}"><input type="checkbox" name="${field.key}" value="${escapeHtml(key)}" ${(Array.isArray(currentValue) && currentValue.includes(key)) ? "checked" : ""}><span>${escapeHtml(translate(key))}</span></label>`).join("")}</div>`;
    } else if (field.type === "textarea") {
      control = `<textarea ${common} rows="3" placeholder="${escapeHtml(text("writeHere"))}">${escapeHtml(currentValue)}</textarea>`;
    } else {
      const placeholder = field.key === "phone" ? (language === "ar" ? "مثال: 01012345678" : "e.g. +20 10 1234 5678") : "";
      const dir = ["tel", "email", "url", "number"].includes(field.type) ? 'dir="ltr"' : "";
      control = `<input ${common} type="${field.type}" ${dir} ${field.type === "number" ? 'min="1" max="500"' : ""} value="${escapeHtml(currentValue)}" placeholder="${placeholder}">`;
    }
    return `<div class="field ${field.type === "textarea" || field.type === "checks" ? "field-wide" : ""}"><label for="${field.key}">${escapeHtml(label)}${requiredMark}</label>${control}${error}</div>`;
  }

  function progressMarkup() {
    const isReview = currentStep === currentSteps.length;
    const labels = [...currentSteps.map((step) => text(step.title)), text("review")];
    const percent = ((currentStep + 1) / labels.length) * 100;
    return `<div class="progress-wrap" aria-label="${language === "ar" ? "الخطوة" : "Step"} ${currentStep + 1} ${text("of")} ${labels.length}"><div class="progress-line"><span style="width:${percent}%"></span></div><div class="progress-steps">${labels.map((label, index) => `<div class="progress-step ${index < currentStep ? "completed" : ""} ${index === currentStep ? "active" : ""}"><span class="step-number">${index < currentStep ? icon("check") : index + 1}</span><span>${escapeHtml(label)}</span></div>`).join("")}</div></div>`;
  }

  function reviewMarkup() {
    return currentSteps.map((step, index) => {
      const fields = step.fields.filter((field) => Array.isArray(values[field.key]) ? values[field.key].length : String(values[field.key] || "").trim());
      const items = fields.map((field) => {
        const value = Array.isArray(values[field.key]) ? values[field.key].map(translate).join(language === "ar" ? "، " : ", ") : (field.options ? translate(values[field.key]) : values[field.key]);
        return `<div class="review-item"><dt>${escapeHtml(text("field")[field.labelKey])}</dt><dd>${escapeHtml(value)}</dd></div>`;
      }).join("");
      return `<section class="review-section"><div class="review-heading"><h3>${escapeHtml(text(step.title))}</h3><button type="button" data-edit-step="${index}">${escapeHtml(text("edit"))}</button></div><dl>${items}</dl></section>`;
    }).join("");
  }

  function renderForm() {
    const isReview = currentStep === currentSteps.length;
    const typeTitle = currentType === "school" ? text("schoolTitle") : text("centerTitle");
    const stepContent = isReview
      ? `<div class="form-card-heading"><span class="step-kicker">${escapeHtml(text("beforeSubmit"))}</span><h2>${escapeHtml(text("reviewTitle"))}</h2><p>${escapeHtml(text("reviewHelp"))}</p></div><div class="review-sections">${reviewMarkup()}</div><label class="consent-option ${consent ? "" : ""}"><input type="checkbox" id="consent" ${consent ? "checked" : ""}><span>${escapeHtml(text("consent"))}</span></label><span class="field-error consent-message" id="consent-error" role="alert" hidden></span>`
      : `<div class="form-card-heading"><span class="step-kicker">${escapeHtml(text("step").toUpperCase())} ${currentStep + 1} ${text("of")} ${currentSteps.length + 1}</span><h2>${escapeHtml(text(currentSteps[currentStep].title))}</h2></div><div class="fields-grid">${currentSteps[currentStep].fields.map(fieldMarkup).join("")}</div>${currentStep === 3 ? `<p class="optional-note">${escapeHtml(text("optionalNote"))}</p>` : ""}`;
    registration.innerHTML = `<div class="form-top"><button type="button" class="text-back" id="back-to-selection">${icon("back")}${escapeHtml(text("backToSelection"))}</button><span class="form-secure">${icon("shield")}${escapeHtml(text("secureRegistration"))}</span></div><div class="form-heading"><span class="eyebrow section-eyebrow">${escapeHtml(text("newApplication"))}</span><h1>${escapeHtml(typeTitle)}</h1><p>${escapeHtml(text("formIntro"))}</p></div>${progressMarkup()}<form class="form-card" id="application-form" novalidate><div class="honeypot" aria-hidden="true"><label for="website-check">Leave this field empty</label><input id="website-check" name="website-check" tabindex="-1" autocomplete="off"></div>${stepContent}<div class="submission-error" id="submission-error" role="alert" hidden></div><div class="form-actions">${currentStep > 0 ? `<button class="button button-secondary" type="button" id="previous-step">${escapeHtml(text("previous"))}</button>` : ""}<button class="button button-primary action-next" type="submit" id="next-step" ${submitting ? "disabled" : ""}>${escapeHtml(isReview ? (submitting ? text("submitting") : text("submit")) : text("next"))}${!submitting ? icon("arrow") : ""}</button></div></form><p class="privacy-note">${icon("shield")}${escapeHtml(text("privacy"))}</p>`;
    bindFormEvents();
  }

  function validateStep() {
    const currentFields = currentSteps[currentStep].fields;
    for (const field of currentFields) {
      const element = registration.querySelector(`[name="${field.key}"]`);
      const value = values[field.key];
      const isEmpty = Array.isArray(value) ? value.length === 0 : !String(value ?? "").trim();
      if (field.required && isEmpty) field.error = text("required");
      else if (!isEmpty && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) field.error = text("invalidEmail");
      else if (!isEmpty && field.type === "tel" && String(value).replace(/\D/g, "").length < 7) field.error = text("invalidPhone");
      else if (!isEmpty && field.type === "url") {
        try { new URL(String(value)); delete field.error; }
        catch { field.error = text("invalidUrl"); }
      } else delete field.error;
      if (field.error && element) element.setAttribute("aria-invalid", "true");
    }
    const invalid = currentFields.some((field) => Boolean(field.error));
    if (invalid) renderForm();
    return !invalid;
  }

  function bindFormEvents() {
    document.getElementById("back-to-selection").addEventListener("click", () => {
      currentType = "";
      registration.hidden = true;
      landing.hidden = false;
      institutionSection.hidden = false;
      institutionSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("previous-step")?.addEventListener("click", () => { currentStep--; renderForm(); registration.scrollIntoView({ behavior: "smooth", block: "start" }); });
    registration.querySelectorAll("[data-edit-step]").forEach((button) => button.addEventListener("click", () => { currentStep = Number(button.dataset.editStep); renderForm(); registration.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    registration.querySelectorAll(".field input, .field select, .field textarea").forEach((control) => {
      control.addEventListener("input", updateValue);
      control.addEventListener("change", updateValue);
    });
    registration.querySelector("#consent")?.addEventListener("change", (event) => {
      consent = event.target.checked;
      const error = document.getElementById("consent-error");
      error.hidden = true;
    });
    document.getElementById("application-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const honeypot = document.getElementById("website-check").value;
      if (honeypot) { showError(text("honeypotError")); return; }
      if (currentStep < currentSteps.length) {
        if (!validateStep()) return;
        currentStep++;
        renderForm();
        registration.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        await submitApplication();
      }
    });
  }

  function updateValue(event) {
    const control = event.currentTarget;
    const key = control.name;
    const field = flattened().find((item) => item.key === key);
    if (field?.type === "checks") {
      const selected = [...registration.querySelectorAll(`input[name="${key}"]:checked`)].map((input) => input.value);
      values[key] = selected;
      control.closest(".check-option").classList.toggle("is-checked", control.checked);
    } else values[key] = control.value;
    if (field) delete field.error;
    const error = document.getElementById(`${key}-error`);
    if (error) error.hidden = true;
    control.setAttribute("aria-invalid", "false");
  }

  function showError(message) {
    const element = document.getElementById("submission-error");
    element.textContent = message;
    element.hidden = false;
  }

  async function submitApplication() {
    if (submitting) return;
    if (!consent) {
      const error = document.getElementById("consent-error");
      error.textContent = text("consentError");
      error.hidden = false;
      document.getElementById("consent").focus();
      return;
    }
    if (EDGE_FUNCTION_URL.includes("YOUR_PROJECT_REF") || SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")) {
      showError(text("configError"));
      return;
    }
    submitting = true;
    renderForm();
    try {
      if (!applicationId) applicationId = crypto.randomUUID();
      const data = Object.fromEntries(Object.entries(values).map(([key, value]) => {
        if (key === "studentCount") return [key, Number(({ under100: 50, students100: 200, students300: 500, students700: 1100, students1500: 2000 })[value] || value)];
        if (key === "teacherCount") return [key, Number(({ under10: 5, teachers10: 20, teachers30: 45, teachers60: 80, teachers100: 120 })[value] || value)];
        if (key === "branchCount") return [key, Number(value)];
        if (key === "schoolEmail") return ["email", value];
        if (key === "ownerName") return ["contactName", value];
        return [key, value];
      }));
      if (currentType === "school") {
        data.schoolType = values.schoolType;
        data.contactRole = values.contactRole;
        data.schoolIntroduction = values.schoolIntroduction;
        data.additionalNotes = values.additionalNotes;
      } else {
        data.specializations = values.specializations;
        data.subjects = values.subjects;
        data.targetStages = values.targetStages;
        data.facebookUrl = values.facebookUrl;
        data.additionalDetails = values.additionalDetails;
      }
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ institutionType: currentType, submissionId: applicationId, data, website: "" })
      });
      const responseData = await response.json().catch(() => ({}));
      if (!response.ok || responseData.ok !== true) {
        if (response.status === 429) throw new Error(text("rateError"));
        if (response.status === 503 && /not configured/i.test(responseData.error || "")) throw new Error(text("configError"));
        if (response.status === 400) throw new Error(text("invalidApplication"));
        throw new Error(text("genericError"));
      }
      renderSuccess();
    } catch (error) {
      renderForm();
      showError(error instanceof Error && (error.message === text("rateError") || error.message === text("configError")) ? error.message : (error instanceof TypeError ? text("networkError") : (error.message || text("genericError"))));
    } finally {
      submitting = false;
    }
  }

  function renderSuccess() {
    registration.innerHTML = `<section class="success-panel" aria-live="polite"><span class="success-icon">${icon("check")}</span><span class="eyebrow section-eyebrow">${escapeHtml(text("received"))}</span><h1>${escapeHtml(text("successTitle"))}</h1><p>${escapeHtml(text("successText"))}</p><a class="button button-primary" href="https://ilogia-eg.com">${escapeHtml(text("backToSite"))}${icon("arrow")}</a></section>`;
    registration.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-institution]").forEach((button) => button.addEventListener("click", () => start(button.dataset.institution)));
  languageButton.addEventListener("click", () => {
    language = language === "ar" ? "en" : "ar";
    updateLanguage();
  });
  updateLanguage();
})();
