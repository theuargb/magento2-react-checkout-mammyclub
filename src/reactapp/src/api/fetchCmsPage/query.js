export default function getQuery() {
  return `
      query fetchCmsPage($identifier: String!) {
        cmsPage(identifier: $identifier) {
            content
        }
      }
    `;
}
