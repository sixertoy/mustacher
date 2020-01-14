const onHashChange = () => {};

const onDocumentReady = () => {
  // listen for hash changes
  $(window).on('hashchange', onHashChange);
};

(function initialize() {
  $(document).ready(onDocumentReady);
})();
