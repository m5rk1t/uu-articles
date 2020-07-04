/* eslint-disable */

const createDtoInType = shape({
    name: string(255).isRequired(),
    founded: date("%d.%m.%Y"),
    nameOfChiefEditor: string(255), 
    language: string(25),
    website: uri().isRequired()
  });

  const getDtoInType = shape({
    id: id().isRequired()
  });

  const listDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });


  const updateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    founded: date("%d.%m.%Y"),
    nameOfChiefEditor: string(255), 
    language: string(25),
    website: uri()
  })
