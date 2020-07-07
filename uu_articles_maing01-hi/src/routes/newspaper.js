//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import ArticleList from "../bricks/article-list";
import ArticleProvider from "../bricks/article-provider";
import ArticleCreate from "../bricks/article-create";
import ArticlesInstanceContext from "../bricks/articles-instance-context";
import NewspaperDetail from "../bricks/newspaper-detail";
import NewspaperUpdate from "../bricks/newspaper-update";
//@@viewOff:imports

const Newspaper = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Newspaper",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    newspaperId: UU5.PropTypes.string
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    newspaperId: null
  },
  //@@viewOff:defaultProps


  render({ newspaperId }) {
    //@@viewOn:hooks
    const {
      syncData: { authorizedProfileList }
    } = useContext(ArticlesInstanceContext);
    const createArticleRef = useRef();
    const updateArticleRef = useRef();
    const deleteArticleRef = useRef();
    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content,
          colorSchema: "red"
        });
    }

    async function handleCreateArticle(article) {
      try {
        await createArticleRef.current(article);
      } catch {
        showError(`Creation of ${article.name} failed!`);
      }
    }

    async function handleUpdateArticle(article, values) {
      try {
        await updateArticleRef.current(article.id, values);
      } catch {
        showError(`Update of ${article.name} failed!`);
      }
    }

    async function handleUpdateNewspaper(newspaper, values) {
      try {
        await updateNewspaperRef.current(newspaper.id, values);
      } catch {
        showError(`Update of ${newspaper.name} failed!`);
      }
    }

    async function handleDeleteArticle(article) {
      try {
        await deleteArticleRef.current(article);
      } catch {
        showError(`Deletion of ${article.name} failed!`);
      }
    }

    function isCreateAuthorized() {
      return authorizedProfileList.some(
        profile => profile === Config.Profiles.AUTHORITIES || profile === Config.Profiles.EXECUTIVES
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderReady(articles) {
      return (
        <>
        <UU5.Bricks.Section header="Articles" level={2}>
          {isCreateAuthorized() && <ArticleCreate onCreate={handleCreateArticle} newspaperId={newspaperId} />}
          <ArticleList articles={articles} onDelete={handleDeleteArticle} />
          </UU5.Bricks.Section>
        </>
      );
    }

    function renderError(articles, errorState) {
      switch (errorState) {
        case "create":
        case "update":
        case "delete":
          return renderReady(articles);
        case "load":
        default:
          return <UU5.Bricks.Error content="Error happened!" />;
      }
    }

    return (
      <UU5.Bricks.Container>
        <NewspaperUpdate onUpdate={handleUpdateNewspaper} newspaperId={newspaperId} />
        <NewspaperDetail newspaperId={newspaperId} onUpdate={handleUpdateNewspaper}/>
        <ArticleProvider newspaperId={newspaperId}>
          {({ viewState, asyncData, handleCreate, handleUpdate, handleDelete, errorState }) => {
            createArticleRef.current = handleCreate;
            updateArticleRef.current = handleUpdate;
            deleteArticleRef.current = handleDelete;

            switch (viewState) {
              case "load":
                return renderLoad();
              case "error":
                return renderError(asyncData, errorState);
              default:
                return renderReady(asyncData);
            }
          }}
        </ArticleProvider>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  }
});

export default Newspaper;