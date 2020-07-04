/* eslint-disable */

const createDtoInType = shape({
    name: string(255).isRequired(),
    icon: string(100)
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


  const deleteDtoInType = shape({
    id: id().isRequired()
  });  