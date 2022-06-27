import getQuery from './query';
import modifier from './modifier';
import sendRequest from '../sendRequest';

export default async function fetchCmsPage(identifier) {
  const variables = {
    identifier,
  };
  const query = getQuery(identifier);

  return modifier(await sendRequest(null, { query, variables }));
}
