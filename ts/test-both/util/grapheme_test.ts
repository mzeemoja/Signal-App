// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assert } from 'chai';

import { count } from '../../util/grapheme';

describe('grapheme utilities', () => {
  describe('count', () => {
    it('returns the number of extended graphemes in a string (not necessarily the length)', () => {
      // These tests modified [from iOS][0].
      // [0]: https://github.com/signalapp/Signal-iOS/blob/800930110b0386a4c351716c001940a3e8fac942/Signal/test/util/DisplayableTextFilterTest.swift#L40-L71

      // Plain text
      assert.strictEqual(count(''), 0);
      assert.strictEqual(count('boring text'), 11);
      assert.strictEqual(count('BokmΓ₯l'), 6);

      // Emojis
      assert.strictEqual(count('π©π©π©'), 3);
      assert.strictEqual(count('π©ββ€οΈβπ©'), 1);
      assert.strictEqual(count('πΉπΉπΌπΉπΉπΌπΉπΉ'), 5);
      assert.strictEqual(count('πΉπΉ'), 1);
      assert.strictEqual(count('πΉπΉ '), 2);
      assert.strictEqual(count('ππ½ππΎππΏ'), 3);
      assert.strictEqual(count('π'), 1);
      assert.strictEqual(count('π©π½'), 1);
      assert.strictEqual(count('πΎπππππππ'), 8);
      assert.strictEqual(count('π΅πππ'), 4);
      assert.strictEqual(count('β€οΈππππππππππππππ'), 15);
      assert.strictEqual(count('βπΏπͺπΏππΏππΏππΏππΏ'), 6);
      assert.strictEqual(count('πΎπππππππ§'), 8);
      assert.strictEqual(count('0οΈβ£1οΈβ£2οΈβ£3οΈβ£4οΈβ£5οΈβ£6οΈβ£7οΈβ£8οΈβ£9οΈβ£π'), 11);
      assert.strictEqual(count('πΊπΈπ·πΊπ¦π«π¦π²'), 4);
      assert.strictEqual(count('πΊπΈπ·πΊπΈ π¦π«π¦π²πΈ'), 7);
      assert.strictEqual(count('πΊπΈπ·πΊπΈπ¦π«π¦π²'), 5);
      assert.strictEqual(count('πΊπΈπ·πΊπΈπ¦'), 3);
      assert.strictEqual(count('οΌοΌοΌ'), 3);

      // Normal diacritic usage
      assert.strictEqual(count('PΕΓ­liΕ‘ ΕΎluΕ₯ouΔkΓ½ kΕ―Ε ΓΊpΔl ΔΓ‘belskΓ© Γ³dy.'), 39);

      // Excessive diacritics
      assert.strictEqual(count('ZΝΝ«ΝΝͺΜΝ«Μ½ΝΜ΄ΜΜ€ΜΝΝΜ―ΜΜ ΝAΝ«ΝΜ΄Ν’Μ΅ΜΜ°ΝLΝ¨Ν§Ν©ΝΜ GΜΝΜΜΝΝΜ΄Μ»ΝΝΝΜΉOΝΜΜΝΜ¨Μ΅ΜΉΜ»ΜΜ³'), 5);
      assert.strictEqual(count('H?Μ§ΝΝ ΜΈAΝ’ΝVΜΜIΜ΄ΜΈNΝΜΝG?ΝΜ΅ΝΝ’ Μ§Μ§ΝTΜΝΜΆΝ‘RΜ¨ΜΈΝΜ΅Μ’OΜ‘Μ·UΝ‘?BΝ’ΜΆΜΝLΝ’ΜΈΝΜΈΝEΝΜΈ ΜΝΜΈΝRΝEΝ ΝΝAΝΜΈDΜΝΜ§ΝIΝΜ΅?ΝΝNΜ‘Μ·Μ’Ν GΝΝ Μ΄ ΝΝTΝΜ’Ν‘ΝEΝΝXΜ?Μ’ΝTΝ Μ’?ΜΝΝΜ’Ν’'), 28);
      assert.strictEqual(count('LΜ·ΝΜ³ΝΜ²GΜ§Μ΅ΝΝΜ?Μ―Μ€Μ©ΜΝΜ¬ΜΝΜΉΜΜΉΝΝΜ?Μ¦Μ°Μ£OΝΜΆΜ΄Ν‘Μ?Μ»Μ?Μ!Μ΄Μ·ΜΝΝ'), 4);
    });
  });
});
