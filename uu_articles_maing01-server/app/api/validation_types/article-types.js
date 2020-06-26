/* eslint-disable */

const createDtoInType = shape({
    title: string(200).isRequired(),
    topicIdList: array(id(),1,15).isRequired(),
    authorId: id().isRequired(),
    newspaperId: id().isRequired(),
    abstract: uu5String(5000),
    publicationDate: date("%d.%m.%Y"),
    source: uri().isRequired()
  })
