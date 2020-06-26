/* eslint-disable */

const createDtoInType = shape({
    name: string(255).isRequired(),
    icon: binary()
  });

  const getDtoInType = shape({
    id: id().isRequired()
  });

  const deleteDtoInType = shape({
    id: id().isRequired()
  });  