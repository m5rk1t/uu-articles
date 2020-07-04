//@@viewOn:imports
import Plus4U5 from "uu_plus4u5g01";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import ArticlesInstanceContext from "../bricks/articles-instance-context";
//@@viewOff:imports

const Top = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Top",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    const { syncData: articlesInstance } = useContext(ArticlesInstanceContext);
    //@@viewOff:hooks

    //@@viewOn:render
    const title = `${articlesInstance.name} [${articlesInstance.state}]`;

    return <Plus4U5.App.TopBt>{title}</Plus4U5.App.TopBt>;
    //@@viewOff:render
  }
});

export default Top;