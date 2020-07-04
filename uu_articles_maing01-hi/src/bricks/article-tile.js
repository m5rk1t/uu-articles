//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const ArticleTile = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    articleTile: UU5.PropTypes.shape({
      title: UU5.PropTypes.string.isRequired,
      publicationDate: UU5.PropTypes.string,
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    articleTile: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ articleTile, colorSchema, onDelete }) {
    //@@viewOn:private
    function handleDelete() {
        onDelete(articleTile)
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {articleTile.title}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    if (!articleTile) {
        return null;
    }

    return (
      <UU5.Bricks.Card header={renderHeader()} colorSchema={colorSchema}>
        <UU5.Bricks.DateTime value={articleTile.publicationDate} format="dd.mm.Y" />
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  }
});

export default ArticleTile;