jest.dontMock("../FieldInput");
jest.dontMock("../icons/IconEdit");
jest.dontMock("../../Util/KeyboardUtil");

/* eslint-disable no-unused-vars */
var React = require("react");
var ReactDOM = require("react-dom");
/* eslint-enable no-unused-vars */

var TestUtils;
if (React.version.match(/15.[0-5]/)) {
  TestUtils = require("react-addons-test-utils");
} else {
  TestUtils = require("react-dom/test-utils");
}

var FieldInput = require("../FieldInput");

describe("FieldInput", function() {
  describe("#hasError", function() {
    it("should return true when error contains name", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          editing="username"
          validationError={{ username: "bar" }}
          handleEvent={function() {}}
        />
      ));

      expect(instance.hasError()).toEqual(true);
    });

    it("should return false when error doesn't contains name", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          editing="username"
          validationError={{ foo: "bar" }}
          handleEvent={function() {}}
        />
      ));

      expect(instance.hasError()).toEqual(false);
    });

    it("should return false when error is undefined", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          editing="username"
          handleEvent={function() {}}
        />
      ));

      expect(instance.hasError()).toEqual(false);
    });
  });

  describe("#isEditing", function() {
    it("should return true when editing is equal to name", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          editing="username"
          handleEvent={function() {}}
        />
      ));

      expect(instance.isEditing()).toEqual(true);
    });

    it("should return false when editing is false", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          handleEvent={function() {}}
        />
      ));

      expect(instance.isEditing()).toEqual(false);
    });

    it("should return false when writeType is not edit", function() {
      var instance = (instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          editing="username"
          handleEvent={function() {}}
        />
      ));

      expect(instance.isEditing()).toEqual(false);
    });
  });

  describe("#getInputElement", function() {
    it("should return a span if not editing", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          handleEvent={function() {}}
        />
      );

      expect(instance.getInputElement({}).type).toEqual("span");
    });

    it("should return an input if editing", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="edit"
          editing="username"
          handleEvent={function() {}}
        />
      );

      expect(instance.getInputElement({}).type).toEqual("input");
    });

    it("should return its custom render function", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
          renderer={function() {
            return "foo";
          }}
        />
      );

      expect(instance.getInputElement({})).toEqual("foo");
    });

    it("should return an input if writeType is input", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
        />
      );

      expect(instance.getInputElement({}).type).toEqual("input");
    });

    it("should have the right selectionStart if focused", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          focused={true}
          name="username"
          fieldType="text"
          startValue="Username"
          writeType="input"
          handleEvent={function() {}}
        />
      );

      jest.runAllTimers();

      let input = TestUtils.findRenderedDOMComponentWithTag(instance, "input");

      expect(input.selectionStart).toEqual(8);
      expect(input.selectionEnd).toEqual(8);
    });
  });

  describe("#getLabel", function() {
    it("should return a label if showLabel is true", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
          showLabel={true}
        />
      );

      expect(instance.getLabel().type).toEqual("label");
    });

    it("can handle a custom render function", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
          showLabel={<h1>hello</h1>}
        />
      );

      expect(instance.getLabel().type).toEqual("h1");
    });

    it("should return null if showLabel is false", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
          showLabel={false}
        />
      );

      expect(instance.getLabel()).toEqual(null);
    });
  });

  describe("#getErrorMsg", function() {
    it("should return a label if validationError is true", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          editing="username"
          handleEvent={function() {}}
          validationError={{ username: "errored" }}
        />
      );

      expect(instance.getErrorMsg().type).toEqual("p");
    });

    it("should return null if validationError is false", function() {
      var instance = TestUtils.renderIntoDocument(
        <FieldInput
          name="username"
          fieldType="text"
          writeType="input"
          handleEvent={function() {}}
        />
      );

      expect(instance.getErrorMsg()).toEqual(null);
    });
  });
});
