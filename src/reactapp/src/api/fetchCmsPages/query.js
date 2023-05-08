/* eslint-disable */
export default function getQuery(pagesCollection) {
  let params = '';
  let query = '';
  for (const id in pagesCollection) {
    params = params.concat(`$${id} : String`, ', ').slice(0, -1);
  }

  for (const id in pagesCollection) {
    query = query.concat(
      `
      ${id}: cmsPage(identifier: $${id}){
        content
      }`,
      ','
    );
  }

  return `
      query fetchCmsPages(${params}) {
        ${query}
      }
    `;
}
