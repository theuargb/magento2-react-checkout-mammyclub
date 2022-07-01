export default function getQuery() {
  return `
      query fetchCmsPages($firstIdentifier: String!, $secondIdentifier: String, $thirdIdentifier: String) {
        firstPage: cmsPage(identifier: $firstIdentifier) {
          content
        }
        secondPage: cmsPage(identifier: $secondIdentifier) {
          content
        }
        thirdPage: cmsPage(identifier: $thirdIdentifier) {
          content
        }
      }
    `;
}
