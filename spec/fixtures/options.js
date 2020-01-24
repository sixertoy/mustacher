module.exports = {
  data: {
    root: {
      cwd: process.cwd(),
      delimiter: {
        ldim: '{{',
        rdim: '}}',
      },
      partials: {
        ext: '.hbs',
        src: './tests/',
      },
    },
  },
  fn() {
    return true;
  },
  hash: {},
  inverse() {
    return false;
  },
  name: 'helper_name',
};
