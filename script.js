const UNIFORM = {
    1: { day: "Monday",    colour: "red",   css: "--mon" },
    2: { day: "Tuesday",   colour: "green",  css: "--tue" },
    3: { day: "Wednesday", colour: "orange", css: "--wed", darkText: true },
    4: { day: "Thursday",  colour: "blue",    css: "--thu", },
    5: { day: "Friday",    colour: "yellow", css: "--fri", darkText: true  },
};

const FEES = [
    { group: "3 - 12 months",     amount: 450 },
    { group: "1 - 2 years",       amount: 400 },
    { group: "2 - 3 years",       amount: 350 },
    { group: "4 - 5 years",       amount: 270 },
    { group: "Grade R (6 years)", amount: 500 },
];

const WHATSAPP_NUMBER = "27732239762";
const WHATSAPP_MESSAGE = "Hello Bright Steps, I would like to enquire about enrolling my child.";

function showTodaysColour(today) {
    const box = document.getElementById("today-colour");
    const entry = UNIFORM[today.getDay()];

    if (!entry) {
        box.textContent = `It's the weekend. See you on Monday in your ${UNIFORM[1].colour} T-shirt!`;
        box.style.background = "var(--ink)";
        box.style.color = "#fff";
        return;
    }

    box.textContent = `Today is ${entry.day}: ${entry.colour} T-shirt day!`;
    box.style.background = `var(${entry.css})`;
    box.style.color = entry.darkText ? "var(--ink)" : "#fff";
}

const rand = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
});

function buildFeesTable() {
    const table = document.getElementById("fees-table");

    const headRow = table.createTHead().insertRow();
    for (const title of ["Age group", "Monthly fee"]) {
        const th = document.createElement("th");
        th.textContent = title;
        headRow.appendChild(th);
    }

    const body = table.createTBody();
    for (const fee of FEES) {
        const row = body.insertRow();
        row.insertCell().textContent = fee.group;
        row.insertCell().textContent = rand.format(fee.amount);
    }
}

function setUpWhatsApp() {
    const link = document.getElementById("whatsapp-btn");
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    link.target = "_blank";
    link.rel = "noopener";
}

showTodaysColour(new Date());
buildFeesTable();
setUpWhatsApp();
document.getElementById("year-now").textContent = new Date().getFullYear();