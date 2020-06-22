/* eslint-disable */

const createDtoInType = shape({
    name: string(255).isRequired(),
    founded: date("%d.%m.%Y"),
    nameOfChiefEditor: string(255), 
    language: string(25),
    website: uri().isRequired()
  });

  const updateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    founded: date("%d.%m.%Y"),
    nameOfChiefEditor: string(255), 
    language: string(25),
    website: uri()
  })
