if (typeof Crm == "undefined") Crm = { _namespace: true };
if (typeof Crm.Contact == "undefined") Crm.Contact = { _namespace: true };

Crm.Contact.Businessrules = {
  formContext: null,
  contact: Crm.Contact.Entity,
  onload(executionContext) {
    this.formContext = executionContext.getFormContext();
    _handleSalutation();
  },
  _handleSalutation() {
    const gender = this.formContext.getAttribute(this.contact.fields.gender).getValue();
    switch (gender) {
      case this.contact.options.gender.m:
        this._handleMaleSalutation()
        break;

      case this.contact.options.gender.f:
        this._handleFemaleSalutation()
        break;
    
      default:
        this.formContext.getAttribute(this.contact.fields.salutation).setValue(null);
        break;
    }

  },
  _handleMaleSalutation() {
    const salutationAttribute = this.formContext.getAttribute(this.contact.fields.salutation);
    const lang = this.formContext.getAttribute(this.contact.fields.language).getValue();
    switch (lang) {
      case this.contact.options.language.de:
        salutationAttribute.setValue("Herr");
        break;

      case this.contact.options.language.en:
        salutationAttribute.setValue("Sir");
        break;

      case this.contact.options.language.es:
        salutationAttribute.setValue("Senior");
        break;

      case this.contact.options.language.de:
        salutationAttribute.setValue("Monsieur");
        break;

      default:
        salutationAttribute.setValue(null);
        break;
    }
  },
  _handleFemaleSalutation() {
    const salutationAttribute = this.formContext.getAttribute(this.contact.fields.salutation);
    const lang = this.formContext.getAttribute(this.contact.fields.language).getValue();
    switch (lang) {
      case this.contact.options.language.de:
        salutationAttribute.setValue("Frau");
        break;

      case this.contact.options.language.en:
        salutationAttribute.setValue("Madam");
        break;

      case this.contact.options.language.es:
        salutationAttribute.setValue("Seniorita");
        break;

      case this.contact.options.language.de:
        salutationAttribute.setValue("Madame");
        break;

      default:
        salutationAttribute.setValue(null);
        break;
    }
  },
  async _handleAdressUpdate() {
    const [entityType, id] = this.formContext.getAttribute(this.contact.fields.parentcustomerid).getValue();
    return await Xrm.WebApi.retrieveRecord(
      entityType,
      id,
      '$select=adress'
    );
  }
};