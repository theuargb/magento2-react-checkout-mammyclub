import getQuery from './query';
import modifier from './modifier';
import sendRequest from '../sendRequest';

export default async function fetchCmsPages(dispatch, cmsPagesIds) {
  const variables = {
    firstIdentifier: cmsPagesIds[0],
    secondIdentifier: cmsPagesIds[1],
    thirdIdentifier: cmsPagesIds[2],
  };

  const query = getQuery(variables);

  return modifier(await sendRequest(dispatch, { query, variables }));
}
