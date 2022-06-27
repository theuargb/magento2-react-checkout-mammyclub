import _get from 'lodash.get';

export default function fetchCmsPageModifier(result) {
  const content = _get(result, 'data.cmsPage');
  return content;
}
