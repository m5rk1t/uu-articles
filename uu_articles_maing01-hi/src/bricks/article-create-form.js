//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, usePagingListData } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import "uu5g04-forms";
//@@viewOff:imports

const ArticleCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ArticleCreateForm",
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
    let topicListData = usePagingListData({
      dtoIn: { pageInfo: { pageIndex: 0, pageSize: 200 } },
      onLoad: Calls.listTopics
    });

    let newspaperListData = usePagingListData({
      dtoIn: { pageInfo: { pageIndex: 0, pageSize: 200 } },
      onLoad: Calls.listNewspapers
    });

    let authorListData = usePagingListData({
      dtoIn: { pageInfo: { pageIndex: 0, pageSize: 200 } },
      onLoad: Calls.listAuthors
    });

    let {
      viewState: viewStateTopic,
      error: errorTopic,
      errorState: errorStateTopic,
      asyncData: dataTopic
    } = topicListData;

    let {
      viewState: viewStateNewspaper,
      error: errorNewspaper,
      errorState: errorStateNewspaper,
      asyncData: dataNewspaper
    } = newspaperListData;

    let {
      viewState: viewStateAuthor,
      error: errorAuthor,
      errorState: errorStateAuthor,
      asyncData: dataAuthor
    } = authorListData;
    //@@viewOff:hooks

    //@@viewOn:render
    function renderReady(topicList, newspaperList, authorList) {
      return (
        <UU5.Forms.Form onSave={onSave} onCancel={onCancel}>
          <UU5.Forms.Text label="Title" name="title" required />
          <UU5.Forms.Select label="Topic List" name="topicIdList" required multiple>
            {topicList && topicList.length && topicList.map(item => {
              return <UU5.Forms.Select.Option key={item.id} value={item.id}>{item.name}</UU5.Forms.Select.Option>
            })}
          </UU5.Forms.Select>
          <UU5.Forms.Select label="Author List" name="authorId" required >
            {authorList && authorList.length && authorList.map(item => {
              return <UU5.Forms.Select.Option key={item.id} value={item.id}>{`${item.firstName} ${item.lastName}`}</UU5.Forms.Select.Option>
            })}
          </UU5.Forms.Select>
          {/*default newspaper id when article is created in newspaper*/}
          <UU5.Forms.Select label="Newspaper List" name="newspaperId" required value={defaultNewspaperId}>
          {newspaperList && newspaperList.length && newspaperList.map(item => {
              return <UU5.Forms.Select.Option key={item.id} value={item.id}>{item.name}</UU5.Forms.Select.Option>
            })}
          </UU5.Forms.Select>
          <UU5.Forms.TextArea label="Abstract" name="abstract" inputAttrs={{ maxLength: 5000 }} autoResize />
          <UU5.Forms.DatePicker label="Publication date" name="publicationDate" valueType="string" format="dd.mm.Y" size="m" />
          <UU5.Forms.Text label="Source" name="source" value="http://www.example.com/article" required />

          <UU5.Forms.Controls />
        </UU5.Forms.Form>
      );
    }

    if (viewStateTopic === "load" || viewStateNewspaper === "load" || viewStateAuthor === "load") {
      return <UU5.Bricks.Loading />;
    } else if (viewStateTopic === "load" || viewStateNewspaper === "load" || viewStateAuthor === "load") {
      if (errorTopic) {
        return <UU5.Common.Error error={errorTopic} content="Error happened during loading topics!" />
      }
      if (errorNewspaper) {
        return <UU5.Common.Error error={errorNewspaper} content="Error happened during loading newspapers!" />
      }
      if (errorAuthor) {
        return <UU5.Common.Error error={errorAuthor} content="Error happened during loading authors!" />
      }
    } else {
      return renderReady(dataTopic, dataNewspaper, dataAuthor)
    }

    //@@viewOff:render
  }
});

export default ArticleCreateForm;