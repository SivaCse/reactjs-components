jest.dontMock("../Form");
jest.dontMock("../FormControl");
jest.dontMock("../FieldInput");
jest.dontMock("../FieldPassword");
jest.dontMock("../icons/IconEdit");
jest.dontMock("../../constants/FieldTypes");
jest.dontMock("../../utils/Util");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var Form = require("../Form");
var FormControl = require("../FormControl");

function getInstance(definition, triggerSubmit, onSubmit) {
  return TestUtils.renderIntoDocument(
    <Form
      definition={definition}
      triggerSubmit={triggerSubmit}
      onSubmit={onSubmit} />
  );
}

function getDefinition() {
  return [
    {
      name: "username",
      value: "kennyt",
      validation: function (arg) {
        return arg.length < 15;
      },
      placeholder: "Write text here.",
      fieldType: "text",
      validationErrorText: "Must be less than 15 characters.",
      required: true,
      showLabel: true,
      showError: "This is an error.",
      writeType: "edit"
    }
  ];
}

function noop() {}

describe("Form", function () {

  describe("#triggerSubmit", function () {
    it("should call the triggerSubmit function on mount", function () {
      var triggerSubmit = jasmine.createSpy();
      var instance = getInstance(getDefinition(), triggerSubmit, noop);

      expect(triggerSubmit).toHaveBeenCalled();
      expect(triggerSubmit).toHaveBeenCalledWith(instance.handleSubmit);
    });

    it("should expose a function to submit form", function () {
      var triggerSubmit;
      var onSubmit = jasmine.createSpy();
      var instance = getInstance(getDefinition(), function (submit) {
        triggerSubmit = submit;
      }, onSubmit);

      instance.validateSubmit = function () {return true; };
      triggerSubmit();

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe("#validateValue", function () {
    beforeEach(function () {
      this.instance = getInstance(getDefinition(), noop, noop);
      this.validationFn = function (arg) {
        return arg.length < 5;
      };

      // This regex makes sure that the string has the words "cat" and "dog"
      this.validationRegex = /(?:.*(?:\b(?:cat|dog)\b)){2}/;
      this.fieldDefinition = [{
        name: "username",
        validation: this.validationFn
      }];
    });

    it("should validate with a function", function () {
      var value = "less";
      var result = this.instance.validateValue(
        "username", value, this.fieldDefinition
      );

      expect(result).toEqual(true);
    });

    it("should return false if function validation fails", function () {
      var value = "a string that is too big";
      var result = this.instance.validateValue(
        "username", value, this.fieldDefinition
      );

      expect(result).toEqual(false);
    });

    it("should validation with a regex pattern", function () {
      this.fieldDefinition[0].validation = this.validationRegex;
      var value = "cat and dog";
      var result = this.instance.validateValue(
        "username", value, this.fieldDefinition
      );

      expect(result).toEqual(true);
    });

    it("should validation with a regex pattern", function () {
      this.fieldDefinition[0].validation = this.validationRegex;
      var value = "cat and lizard";
      var result = this.instance.validateValue(
        "username", value, this.fieldDefinition
      );

      expect(result).toEqual(false);
    });
  });

  describe("#getFormControls", function () {
    beforeEach(function () {
      this.instance = getInstance(getDefinition(), noop, noop);
    });

    it("should return a FormControl for each item in definition", function () {
      var definition = [{}, {}, {}];
      var result = this.instance.getFormControls(definition);

      expect(result.length).toEqual(definition.length);
      result.forEach(function (formControl) {
        expect(formControl.type).toEqual(FormControl);
      });
    });

    it("can handle arrays as an item", function () {
      var definition = [{}, [{}, {}], {}];
      var result = this.instance.getFormControls(definition);

      expect(result.length).toEqual(definition.length);
      result.forEach(function (formControl) {
        expect(formControl.type).toEqual(FormControl);
      });
    });
  });
});
