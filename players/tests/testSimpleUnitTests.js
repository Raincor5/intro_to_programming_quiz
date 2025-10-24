const assert = require('assert');
const { describe, test, beforeEach } = require('node:test');
const player = require('../player');

describe('player module', () => {
  beforeEach(() => {
    player.resetPlayers();
  });

  describe('addPlayer', () => {
    test('returns true for valid input', () => {
      assert.strictEqual(player.addPlayer('test', '??', 0, 't'), true);
    });

    test('returns false (avatar mismatch)', () => {
      assert.strictEqual(player.addPlayer('test', '', 0, 't'), false);
    });

    test('returns false (empty name)', () => {
      assert.strictEqual(player.addPlayer('', '??', 1, 'a'), false);
    });

    test('returns false (null name)', () => {
      assert.strictEqual(player.addPlayer(null, '??', 2, 'b'), false);
    });

    test('returns false (negative score)', () => {
      assert.strictEqual(player.addPlayer('test', '??', -1, 'c'), false);
    });
  });

  describe('with one valid player added', () => {
    beforeEach(() => {
      player.addPlayer('test', '??', 0, 't');
    });

    test('getPlayers length is 1', () => {
      assert.strictEqual(player.getPlayers().length, 1);
    });

    test('getPlayerById valid', () => {
      assert.strictEqual(player.getPlayerById(0).name, 'test');
    });

    test('getPlayerById invalid', () => {
      assert.strictEqual(player.getPlayerById(1), undefined);
    });

    test('getPlayerById invalid (undefined)', () => {
      assert.strictEqual(player.getPlayerById(undefined), undefined);
    });

    test('getPlayerById invalid (empty string)', () => {
      assert.strictEqual(player.getPlayerById(''), undefined);
    });

    test('getPlayerByBuzzer valid', () => {
      assert.strictEqual(player.getPlayerByBuzzerKey('t').name, 'test');
    });

    test('getPlayerByBuzzer invalid (wrong key)', () => {
      assert.strictEqual(player.getPlayerByBuzzerKey('a'), undefined);
    });

    test('getPlayerByBuzzer invalid (empty string)', () => {
      assert.strictEqual(player.getPlayerByBuzzerKey(''), undefined);
    });

    test('getPlayerByBuzzer invalid (undefined)', () => {
      assert.strictEqual(player.getPlayerByBuzzerKey(undefined), undefined);
    });

    test('getPlayerByBuzzer invalid (null)', () => {
      assert.strictEqual(player.getPlayerByBuzzerKey(null), undefined);
    });

    test('getPlayersNames valid', () => {
      assert.strictEqual(player.getPlayersNames().length, 1);
    });

    test('getPlayersNames content', () => {
      assert.strictEqual(player.getPlayersNames()[0], 'test');
    });
  });

  describe('duplicates check', () => {
      beforeEach(() => {
        player.resetPlayers();
      })
    test('getPlayers length is 1 after adding the same duplicate', () => {
        player.addPlayer('test', '??', 0, 't');
        player.addPlayer('test', '??', 0, 't');
        assert.strictEqual(player.getPlayers().length, 1);
    })

    test('getPlayers length is 1 if the name is duplicate', () => {
        player.addPlayer('test', '??', 0, 't');
        player.addPlayer('test', '??', 0, 'd');
        assert.strictEqual(player.getPlayers().length, 1);
    })

    test('getPlayers length is 1 if the buzzerKey is duplicate, but the names are not'), () => {
          player.addPlayer('test', '??', 0, 't');
          player.addPlayer('test2', '??', 0, 't');
          assert.strictEqual(player.getPlayers().length, 1);
    }
  })
});
