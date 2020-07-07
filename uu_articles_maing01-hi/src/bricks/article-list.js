//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import ArticleTile from "./article-tile";
import Uu5Tiles from "uu5tilesg02";
//@@viewOff:imports

const FILTERS = [
  {
    key: "publicationDate",
    label: { en: "Publication Date" },
    filterFn: (item, value) => {}
  },
  {
    key: "topicId",
    label: {en: "Topic" },
    filterFn: (item, value) => {}
  }
];
const ArticleList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    articles: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    articles: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ articles, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    function renderItem(item) {
      return <ArticleTile articleTile={item.data} colorSchema="green" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />;
    }
    if (articles.length === 0) {
      return <UU5.Common.Error content="No articles!" />;
    }

    return (
      <>
       <Uu5Tiles.Controller data={articles} filters={FILTERS}>
                <Uu5Tiles.FilterBar />
      <UU5.Bricks.Section style={{ padding: "16px" }}>
        <Uu5Tiles.Grid
          data={articles}
          tileHeight="auto"
          tileMinWidth={200}
          tileMaxWidth={400}
          tileSpacing={8}
          rowSpacing={8}
        >
          {renderItem}
        </Uu5Tiles.Grid>
      </UU5.Bricks.Section>
      </Uu5Tiles.Controller>
      </>
    );
    //@@viewOff:render
  }
});

export default ArticleList;