require("../entity.js");
require("../businesrules.js");
const { XrmMockGenerator } = require("xrm-mock");

describe("Test salutation of contact", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createString(Crm.Contact.Entity.fields.salutation);
    XrmMockGenerator.Attribute.createOptionSet(Crm.Contact.Entity.fields.gender, [
      { text: "Male", value: Crm.Contact.Entity.options.gender.m },
      { text: "Female", value: Crm.Contact.Entity.options.gender.m },
      { text: "Divers", value: Crm.Contact.Entity.options.gender.m },
    ]);
    XrmMockGenerator.Attribute.createOptionSet(Crm.Contact.Entity.fields.language, [
      { text: "DE", value: Crm.Contact.Entity.options.language.de },
      { text: "EN", value: Crm.Contact.Entity.options.language.en },
      { text: "ES", value: Crm.Contact.Entity.options.language.es },
      { text: "FR", value: Crm.Contact.Entity.options.language.fr },
    ]);
  });
  it("Should be 'Herr' when gender is male and language is de", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(Crm.Contact.Entity.fields.gender).setValue(Crm.Contact.Entity.options.gender.m);
    _fc.getAttribute(Crm.Contact.Entity.fields.language).setValue(Crm.Contact.Entity.options.language.de);
    Crm.Contact.Businessrules.formContext = _fc;
    Crm.Contact.Businessrules._handleSalutation();
    const actual = _fc.getAttribute(Crm.Contact.Entity.fields.salutation).getValue();
    expect(actual).toBe("Herr");
  });
  it("Should be 'Frau' when gender is female and language is de", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(Crm.Contact.Entity.fields.gender).setValue(Crm.Contact.Entity.options.gender.f);
    _fc.getAttribute(Crm.Contact.Entity.fields.language).setValue(Crm.Contact.Entity.options.language.de);
    Crm.Contact.Businessrules.formContext = _fc;
    Crm.Contact.Businessrules._handleSalutation();
    const actual = _fc.getAttribute(Crm.Contact.Entity.fields.salutation).getValue();
    expect(actual).toBe("Frau");
  });
  it("Should be 'Madam' when gender is female and language is en", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(Crm.Contact.Entity.fields.gender).setValue(Crm.Contact.Entity.options.gender.f);
    _fc.getAttribute(Crm.Contact.Entity.fields.language).setValue(Crm.Contact.Entity.options.language.en);
    Crm.Contact.Businessrules.formContext = _fc;
    Crm.Contact.Businessrules._handleSalutation();
    const actual = _fc.getAttribute(Crm.Contact.Entity.fields.salutation).getValue();
    expect(actual).toBe("Misses");
  });
});

describe("Test fetching adress from parentcustomerid", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createLookup(Crm.Contact.Entity.fields.parentcustomerid, {
      entityType: "account",
      id: "{3560e694-3693-11ec-8d3d-0242ac130003}",
      name: "acme Studios",
      adress: "Best Place Ever"
    });
  });
  it("Should have the best adress", async () => {
    const mock = jest.spyOn(Xrm.WebApi, 'retrieveRecord');
    mock.mockImplementation(() => {
      const result = {
        adress: "Best Place Ever"
      }
      return result;
    });
    const _fc = XrmMockGenerator.getFormContext();
    Crm.Contact.Businessrules.formContext = _fc;
    const r = await Crm.Contact.Businessrules._handleAdressUpdate();
    expect(r.adress).toBe("Best Place Ever");
  });
});