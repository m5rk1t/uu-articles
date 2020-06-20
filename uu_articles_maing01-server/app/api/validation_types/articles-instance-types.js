/* eslint-disable */

const initDtoInType = shape({
  authoritiesUri: uri().isRequired(),
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000),
  description: uu5String(4000)
});
