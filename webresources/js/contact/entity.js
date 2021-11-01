if (typeof Crm == "undefined") Crm = { _namespace: true };
if (typeof Crm.Contact == "undefined") Crm.Contact = { _namespace: true };

Crm.Contact.Entity = {
  fields: {
    name: "name",
    phone: "phone",
    account: "account",
    gender: "gender",
    language: "language",
    salutation: "salutaion",
    adress: "adress",
    parentcustomerid: "parentcustomerid"
  },
  options: {
    gender: {
      m: 1,
      f: 2,
      d: 0,
    },
    language: {
      de: 0,
      en: 1,
      fr: 2,
      es: 3,
    },
  },
};