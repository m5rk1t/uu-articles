//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
//@@viewOff:imports

const ArticleCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {}
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
      <UU5.Forms.Form onSave={onSave} onCancel={onCancel}>
        <UU5.Forms.Text label="Title" name="title" required />
        <UU5.Forms.Select label="Topic List" name="topicIdList" required multiple>
            <UU5.Forms.Select.Option value="1">topic name 1</UU5.Forms.Select.Option>
            <UU5.Forms.Select.Option value="2">topic name 2</UU5.Forms.Select.Option>
            </UU5.Forms.Select>
        <UU5.Forms.Select label="Author List" name="authorId" required >
            <UU5.Forms.Select.Option value="1">author name 1</UU5.Forms.Select.Option>
            <UU5.Forms.Select.Option value="2">author name 2</UU5.Forms.Select.Option>         
        </UU5.Forms.Select>
        {/*default newspaper id when article is created in newspaper*/}
        <UU5.Forms.Select label="Newspaper List" name="newspaperId" required >
            <UU5.Forms.Select.Option value="this newspaper id">newspaper name 1</UU5.Forms.Select.Option>         
        </UU5.Forms.Select> 
        <UU5.Forms.TextArea label="Abstract" name="abstract" inputAttrs={{ maxLength: 5000 }} autoResize />
        <UU5.Forms.DatePicker label="Publication date" name="publicationDate" valueType="string" format="dd.mm.Y" size="m"/>
        <UU5.Forms.Text label="Source" name="source" value="http://www.example.com/article" required />

        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  }
});

export default ArticleCreateForm;