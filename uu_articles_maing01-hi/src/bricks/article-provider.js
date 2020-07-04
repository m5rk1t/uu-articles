//@@viewOn:imports
import { createComponent, usePagingListData } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:imports

const ArticleProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    let listDataValues = usePagingListData({
      dtoIn: { pageInfo: { pageIndex: 0, pageSize: 50 } },
      onLoad: Calls.listArticles,
      onCreate: Calls.createArticle,
      onUpdate: handleUpdateArticle,
      onDelete: handleDeleteArticle
    });

    let {
      viewState,
      error,
      errorState,
      syncData,
      asyncData,
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDelete
    } = listDataValues;
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleDeleteArticle(article) {
      return await Calls.deleteArticle({ id: article.id });
    }

    async function handleUpdateArticle(id, values) {
      try {
        return await Calls.updateArticle({ id, ...values });
      } catch {
        return Promise.reject();
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return children({
      viewState,
      syncData,
      asyncData,
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDelete,
      error,
      errorState
    });
    //@@viewOff:render
  }
});

export default ArticleProvider;