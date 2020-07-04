//@@viewOn:imports
import Calls from "calls";
import { createComponent, useData } from "uu5g04-hooks";
import Config from "./config/config";
import ArticlesInstanceContext from "./articles-instance-context";
//@@viewOff:imports

const ArticleInstanceProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleInstanceProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    const state = useData({ dtoIn: {}, onLoad: Calls.loadArticlesInstance });
    //@@viewOff:hooks

    //@@viewOn:render
    return <ArticlesInstanceContext.Provider value={state}>{children}</ArticlesInstanceContext.Provider>;
    //@@viewOff:render
  }
});

export default ArticleInstanceProvider;