const contactModel = require("../entity");
const businessrules = require("../businesrules");
const { XrmMockGenerator } = require("xrm-mock");
const { } = require()

describe("Test salutation of contact", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createString(contactModel.fields.salutation);
    XrmMockGenerator.Attribute.createOptionSet(contactModel.fields.gender, [
      { text: "Male", value: contactModel.options.gender.m },
      { text: "Female", value: contactModel.options.gender.m },
      { text: "Divers", value: contactModel.options.gender.m },
    ]);
    XrmMockGenerator.Attribute.createOptionSet(contactModel.fields.language, [
      { text: "DE", value: contactModel.options.language.de },
      { text: "EN", value: contactModel.options.language.en },
      { text: "ES", value: contactModel.options.language.es },
      { text: "FR", value: contactModel.options.language.fr },
    ]);
  });
  it("Should be 'Herr' when gender is male and language is de", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(contactModel.fields.gender).setValue(contactModel.options.gender.m);
    _fc.getAttribute(contactModel.fields.language).setValue(contactModel.options.language.de);
    businessrules.formContext = _fc;
    businessrules._handleSalutation();
    const actual = _fc.getAttribute(contactModel.fields.salutation).getValue();
    expect(actual).toBe("Herr");
  });
  it("Should be 'Frau' when gender is female and language is de", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(contactModel.fields.gender).setValue(contactModel.options.gender.f);
    _fc.getAttribute(contactModel.fields.language).setValue(contactModel.options.language.de);
    businessrules.formContext = _fc;
    businessrules._handleSalutation();
    const actual = _fc.getAttribute(contactModel.fields.salutation).getValue();
    expect(actual).toBe("Frau");
  });
  it("Should be 'Madam' when gender is female and language is en", () => {
    const _fc = XrmMockGenerator.getFormContext();
    _fc.getAttribute(contactModel.fields.gender).setValue(contactModel.options.gender.f);
    _fc.getAttribute(contactModel.fields.language).setValue(contactModel.options.language.en);
    businessrules.formContext = _fc;
    businessrules._handleSalutation();
    const actual = _fc.getAttribute(contactModel.fields.salutation).getValue();
    expect(actual).toBe("Misses");
  });
});

describe("Test fetching adress from parentcustomerid", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createLookup(contactModel.fields.parentcustomerid, {
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
    businessrules.formContext = _fc;
    const r = await businessrules._handleAdressUpdate();
    expect(r.adress).toBe("Best Place Ever");
  });
});