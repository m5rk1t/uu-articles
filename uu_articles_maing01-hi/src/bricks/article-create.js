//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
import ArticleCreateForm from "./article-create-form";
//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM"
};

const ArticleCreate = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: UU5.PropTypes.func,
    newspaperId: UU5.PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
    newspaperId: null
  },
  //@@viewOff:defaultProps

  render({ onCreate, newspaperId }) {
    //@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleAddClick() {
      setMode(Mode.FORM);
    }

    function handleSave(opt) {
      onCreate(opt.values);
      setMode(Mode.BUTTON);
    }

    function handleCancel(Article) {
      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return <UU5.Bricks.Button onClick={handleAddClick} colorSchema="primary" content="Add Article" />;
    }

    function renderForm() {
      return <ArticleCreateForm onSave={handleSave} onCancel={handleCancel} defaultNewspaperId={newspaperId} />;
    }

    switch (mode) {
      case Mode.BUTTON:
        return renderButton();
      default:
        return renderForm();
    }
    //@@viewOff:render
  }
});

export default ArticleCreate;