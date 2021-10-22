const contactModel = require("./entity");

if (typeof Crm == "undefined") Crm = { _namespace: true };
if (typeof Crm.Contact == "undefined") Crm.Contact = { _namespace: true };

Crm.Contact.Businessrules = {
  formContext: null,
  onload(executionContext) {
    this.formContext = executionContext.getFormContext();
    _handleSalutation();
  },
  _handleSalutation() {
    const gender = this.formContext.getAttribute(contactModel.fields.gender).getValue();
    switch (gender) {
      case contactModel.options.gender.m:
        this._handleMaleSalutation()
        break;

      case contactModel.options.gender.f:
        this._handleFemaleSalutation()
        break;
    
      default:
        this.formContext.getAttribute(contactModel.fields.salutation).setValue(null);
        break;
    }

  },
  _handleMaleSalutation() {
    const salutationAttribute = this.formContext.getAttribute(contactModel.fields.salutation);
    const lang = this.formContext.getAttribute(contactModel.fields.language).getValue();
    switch (lang) {
      case contactModel.options.language.de:
        salutationAttribute.setValue("Herr");
        break;

      case contactModel.options.language.en:
        salutationAttribute.setValue("Sir");
        break;

      case contactModel.options.language.es:
        salutationAttribute.setValue("Senior");
        break;

      case contactModel.options.language.de:
        salutationAttribute.setValue("Monsieur");
        break;

      default:
        salutationAttribute.setValue(null);
        break;
    }
  },
  _handleFemaleSalutation() {
    const salutationAttribute = this.formContext.getAttribute(contactModel.fields.salutation);
    const lang = this.formContext.getAttribute(contactModel.fields.language).getValue();
    switch (lang) {
      case contactModel.options.language.de:
        salutationAttribute.setValue("Frau");
        break;

      case contactModel.options.language.en:
        salutationAttribute.setValue("Madam");
        break;

      case contactModel.options.language.es:
        salutationAttribute.setValue("Seniorita");
        break;

      case contactModel.options.language.de:
        salutationAttribute.setValue("Madame");
        break;

      default:
        salutationAttribute.setValue(null);
        break;
    }
  }
};

module.exports = Crm.Contact.Businessrules;
