//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, usePagingListData } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import "uu5g04-forms";
//@@viewOff:imports

const NewspaperUpdateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "NewspaperUpdateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
    defaultNewspaperId: UU5.PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSave: () => { },
    onCancel: () => { },
    defaultNewspaperId: null
  },
  //@@viewOff:defaultProps

  render({ defaultNewspaperId, onSave, onCancel }) {
    //@@viewOn:hooks
    let newspaperData = useData({
        dtoIn: { id: newspaperId },
        onLoad: Calls.getNewspaper
      });
  
    let { viewState, errorState, error, asyncData } = newspaperData;
    //@@viewOff:hooks

    //@@viewOn:render
    function renderReady(newspaper) {
      return (
        <UU5.Forms.Form onSave={onSave} onCancel={onCancel}>
          <UU5.Forms.Text label="Name" name="name" value={newspaper.name}/>
          <UU5.Forms.Text label="Name of chief editor" name="nameOfChiefEditor" value={newspaper.nameOfChiefEditor}/>
          <UU5.Forms.DatePicker label="Founded" name="founded" value={newspaper.founded} format="dd.mm.Y" />
          <UU5.Forms.Text label="Website" name="website" value={newspaper.website} />

          <UU5.Forms.Controls />
        </UU5.Forms.Form>
      );
    }

    return renderReady(asyncData);

    //@@viewOff:render
  }
});

export default NewspaperUpdateForm;