const { test } = require("node:test");
const assert = require("node:assert");
const { START_2027, AGE_GROUPS, ageInMonths, ageGroupFor } = require("./enrolment.js");

const born = (y, m, d) => new Date(y, m - 1, d);

test("ageInMonths: the drill children", () => {
    assert.strictEqual(ageInMonths(born(2023, 1, 1), START_2027), 48);
    assert.strictEqual(ageInMonths(born(2023, 6, 15), START_2027), 42);
    assert.strictEqual(ageInMonths(born(2026, 12, 2), START_2027), 0);
});

test("Thabo goes into Grade 000 at R650", () => {
    const r = ageGroupFor(born(2023, 6, 15), START_2027, AGE_GROUPS);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.group.name, "Grade 000");
    assert.strictEqual(r.group.fee, 650);
});

test("edge: exactly 60 months is Grade R, not Grade 00", () => {
    const r = ageGroupFor(born(2022, 1, 1), START_2027, AGE_GROUPS);
    assert.strictEqual(r.months, 60);
    assert.strictEqual(r.group.name, "Grade R");
});

test("edge: one day younger is still Grade 00", () => {
    const r = ageGroupFor(born(2022, 1, 2), START_2027, AGE_GROUPS);
    assert.strictEqual(r.months, 59);
    assert.strictEqual(r.group.name, "Grade 00");
});

test("too young: born December 2026", () => {
    const r = ageGroupFor(born(2026, 12, 2), START_2027, AGE_GROUPS);
    assert.strictEqual(r.ok, false);
    assert.match(r.reason, /too young/);
});

test("too old: 72 months is ready for big school", () => {
    const r = ageGroupFor(born(2021, 1, 1), START_2027, AGE_GROUPS);
    assert.strictEqual(r.months, 72);
    assert.strictEqual(r.ok, false);
    assert.match(r.reason, /big school/);
});

test("rubbish and future dates are refused politely", () => {
    assert.strictEqual(ageGroupFor(new Date("not a date"), START_2027, AGE_GROUPS).ok, false);
    assert.strictEqual(ageGroupFor(born(2027, 3, 1), START_2027, AGE_GROUPS).ok, false);
});