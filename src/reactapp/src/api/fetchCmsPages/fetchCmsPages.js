import getQuery from './query';
import modifier from './modifier';
import sendRequest from '../sendRequest';

export default async function fetchCmsPages(dispatch, cmsPagesIds) {
  const variables = { ...cmsPagesIds };

  const query = getQuery(variables);

  return modifier(await sendRequest(dispatch, { query, variables }));
}
