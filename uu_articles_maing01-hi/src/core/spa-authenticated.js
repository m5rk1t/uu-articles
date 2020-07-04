//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "./config/config.js";
import ArticleInstanceProvider from "../bricks/articles-instance-provider";
import ArticlesInstanceContext from "../bricks/articles-instance-context";
import SpaReady from "./spa-ready.js";
//@@viewOff:imports

const SpaAuthenticated = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Articles",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <ArticleInstanceProvider>
        <ArticlesInstanceContext.Consumer>
          {({ viewState, error }) => {
            switch (viewState) {
              case "load":
                return <UU5.Bricks.Loading />;
              case "error":
                return <UU5.Bricks.Error error={error} />;
              default:
                return <SpaReady />;
            }
          }}
        </ArticlesInstanceContext.Consumer>
      </ArticleInstanceProvider>
    );
    //@@viewOff:render
  }
});

export default SpaAuthenticated;