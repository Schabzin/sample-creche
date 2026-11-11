const START_2027 = new Date(2027, 0, 1);

const AGE_GROUPS = [
    { name: "Babies",     fromMonths: 3,  toMonths: 17, fee: 750 },
    { name: "Toddlers",   fromMonths: 18, toMonths: 35, fee: 700 },
    { name: "Grade 000",  fromMonths: 36, toMonths: 47, fee: 650 },
    { name: "Grade 00",   fromMonths: 48, toMonths: 59, fee: 650 },
    { name: "Grade R",    fromMonths: 60, toMonths: 71, fee: 600 },
];

function ageInMonths(birth, onDate) {
    let months = (onDate.getFullYear() - birth.getFullYear()) * 12;
    months += onDate.getMonth() - birth.getMonth();
    if (onDate.getDate() < birth.getDate()) {
        months -= 1;
    }
    return months;
}

function ageGroupFor(birth, onDate, groups) {
    if (!(birth instanceof Date) || isNaN(birth)) {
        return { ok: false, reason: "Please enter a valid birth date." };
    }
    if (birth > onDate) {
        return { ok: false, reason: "That birth date is after 1 January 2027." };
    }
    const months = ageInMonths(birth, onDate);
    const group = groups.find(g => months >= g.fromMonths && months <= g.toMonths);
    if (group) {
        return { ok: true, months, group };
    }
    if (months < groups[0].fromMonths) {
        return { ok: false, months, reason: "Your child is too young for 2027. Babies start from 3 months." };
    }
    return { ok: false, months, reason: "Your child is old enough for big school in 2027." };
}

if (typeof module !== "undefined") {
    module.exports = { START_2027, AGE_GROUPS, ageInMonths, ageGroupFor };
}