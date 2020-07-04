//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import ArticleTile from "./article-tile";
//@@viewOff:imports

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
    if (articles.length === 0) {
      return <UU5.Common.Error content="No articles!" />;
    }

    return (
      <div>
        {articles.map(article => (
          <ArticleTile
            key={article.id}
            articleTile={article}
            colorSchema="green"
            onDetail={onDetail}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  }
});

export default ArticleList;