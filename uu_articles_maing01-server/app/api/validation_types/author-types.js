/* eslint-disable */

const createDtoInType = shape({
    firstName: string(255).isRequired(),
    lastName: string(255),
    birthDate: date("%d.%m.%Y"),
    bio: uu5String(5000)
  });

  const listDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });

