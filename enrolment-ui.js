
document.getElementById("check-btn").addEventListener("click", () => {
    const box = document.getElementById("enrol-result");
    const value = document.getElementById("birth-date").value;
    const [y, m, d] = value.split("-").map(Number);
    const birth = value ? new Date(y, m - 1, d) : new Date("invalid");
    const answer = ageGroupFor(birth, START_2027, AGE_GROUPS);

    box.textContent = "";
    const p = document.createElement("p");
    if (!answer.ok) {
        p.textContent = answer.reason;
        box.append(p);
        return;
    }
    p.textContent = `In 2027 your child goes into ${answer.group.name}. ` +
                    `The monthly fee is ${rand.format(answer.group.fee)}.`;
    box.append(p);

    const list = document.createElement("ul");
    for (const doc of DOCUMENTS) {
        const li = document.createElement("li");
        li.textContent = doc;
        list.append(li);
    }
    box.append("Bring these when you register:", list);

    const message = `Good day. I'd like to register my child for 2027. Birth date: ${value}. ` +
                    `Your website says ${answer.group.name}, ${rand.format(answer.group.fee)} a month. Is there a place?`;
    const link = document.createElement("a");
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.textContent = "Ask about a place on WhatsApp";
    link.className = "btn";
    box.append(link);
});