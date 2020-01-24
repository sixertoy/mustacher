let // variables
  result;
let helper;
const defaults = {
  name: '$random',
};
// requires
const sinon = require('sinon');
const handlebars = require('handlebars');
const mustacher = require('../../mustacher.js');
const Random = require('../random.js');

describe('random', () => {
  beforeEach(() => {
    helper = new Random();
  });

  describe('register', () => {
    it('call handlebars registerHelper once', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(1);
      handlebars.registerHelper.restore();
    });
  });

  describe('render', () => {
    it('throw no arguments', () => {
      expect(() => {
        helper.render();
      }).toThrow('missing arguments');
    });

    it('throw wrong arguments', () => {
      expect(() => {
        helper.render(
          {
            prop: 'prop',
          },
          defaults
        );
      }).toThrow('missing arguments');
    });

    it('throw wrong arguments', () => {
      expect(() => {
        helper.render(
          123,
          {
            prop: 'prop',
          },
          defaults
        );
      }).toThrow('missing arguments');
    });

    it('throw wrong arguments', () => {
      expect(() => {
        helper.render(
          123,
          123,
          {
            prop: 'prop',
          },
          defaults
        );
      }).toThrow('missing arguments');
    });

    it('not throw no arguments', () => {
      expect(() => {
        helper.render(defaults);
      }).not.toThrow('missing arguments');
    });

    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.render(defaults);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });
  });

  describe('render with arguments', () => {
    it('returns a number between 0 and 1 by default', () => {
      result = helper.render(defaults);
      expect(result >= 0 && result <= 1).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 0 and 2', () => {
      result = helper.render(2, defaults);
      expect(result >= 0 && result <= 2).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 1 and 2', () => {
      result = helper.render(1, 2, defaults);
      expect(result >= 1 && result <= 2).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 100 and 200', () => {
      result = helper.render(100, 200, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 0 and 1 rounded', () => {
      result = helper.render(true, defaults);
      expect(result >= 0 && result <= 1).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).toStrictEqual(-1);
    });

    it('returns a number between 0 and 2 rounded', () => {
      result = helper.render(2, defaults);
      expect(result >= 0 && result <= 2).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 1 and 2 rounded', () => {
      result = helper.render(1, 2, defaults);
      expect(result >= 1 && result <= 2).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 100 and 200 rounded', () => {
      result = helper.render(100, 200, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 100 and 200 not rounded', () => {
      result = helper.render(100, 200, false, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns a number between 100 and 200 rounded', () => {
      result = helper.render(100, 200, true, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).toStrictEqual(-1);
    });

    it('returns a number between 100 and 200 rounded inversed', () => {
      result = helper.render(200, 100, true, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).toStrictEqual(-1);
    });

    it('returns a number between 100 and 200 rounded inversed', () => {
      result = helper.render(200, 100, false, defaults);
      expect(result >= 100 && result <= 200).toStrictEqual(true);
      expect(`${result}`.indexOf('.')).not.toStrictEqual(-1);
    });

    it('returns 123 same min/max not rounded', () => {
      result = helper.render(123, 123, false, defaults);
      expect(result).toStrictEqual(123);
      expect(`${result}`.indexOf('.')).toStrictEqual(-1);
    });

    it('returns 123 same min/max rounded', () => {
      result = helper.render(123, 123, true, defaults);
      expect(result).toStrictEqual(123);
      expect(`${result}`.indexOf('.')).toStrictEqual(-1);
    });
  });
});
