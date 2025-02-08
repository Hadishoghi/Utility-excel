
function convertDate() {
    const gregorianDate = document.getElementById('gregorianDate').value;
    const daysToAdd = parseInt(document.getElementById('daysToAdd').value) || 0;

    if (!/^\d{8}$/.test(gregorianDate)) {
        alert('لطفاً تاریخ را به صورت YYYYMMDD وارد کنید.');
        return;
    }

    const year = parseInt(gregorianDate.slice(0, 4));
    const month = parseInt(gregorianDate.slice(4, 6)) - 1;
    const day = parseInt(gregorianDate.slice(6, 8));

    const initialDate = new Date(year, month, day);
    const newDate = new Date(initialDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const jalaali = window.jalaali || {
        toJalaali: (gy, gm, gd) => {
            const d = new Date(gy, gm - 1, gd);
            return {
                jy: d.getFullYear() - 621,
                jm: (d.getMonth() + 1),
                jd: d.getDate(),
            };
        },
    };

    const shamsi = jalaali.toJalaali(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
    const shamsiDate = `${shamsi.jy}/${shamsi.jm}/${shamsi.jd}`;

    document.getElementById('shamsiDate').textContent = shamsiDate;
}
