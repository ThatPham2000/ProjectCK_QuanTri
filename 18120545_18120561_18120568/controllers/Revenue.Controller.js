const RevenueMModel = require('../models/RevenueModel');
module.exports.revenue = async(req, res) => {
    const list = await RevenueMModel.revenue();
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    let t4 = 0;
    let t5 = 0;
    let t6 = 0;
    let t7 = 0;
    let t8 = 0;
    let t9 = 0;
    let t10 = 0;
    let t11 = 0;
    let t12 = 0;

    for (let i = 0; i < list.length; i++) {
        const stringTime = list[i].date;
        const dateTime = new Date(stringTime);
        const month = dateTime.getMonth();

        const money = list[i].totalCost;
        const money1 = money.replace("đ", "");
        const money2 = money1.replace(".", "");
        const money4 = money2.replace(".", "");
        const money3 = parseInt(money4);
        console.log(money3);

        if (month === 0) {
            t1 += money3;
        } else if (month == 1) {
            t2 += money3;
        } else if (month == 2) {
            t3 += money3;
        } else if (month == 3) {
            t4 += money3;
        } else if (month == 4) {
            t5 += money3;
        } else if (month == 5) {
            t6 += money3;
        } else if (month == 6) {
            t7 += money3;
        } else if (month == 7) {
            t8 += money3;
        } else if (month == 8) {
            t9 += money3;
        } else if (month == 9) {
            t10 += money3;
        } else if (month == 10) {
            t11 += money3;
        } else if (month == 11) {
            t12 += money3;
        }
    }
    console.log(t1);
    console.log(t2)
    res.render('revenue', {
        title: 'Revenue',
        T1: t1,
        T2: t2,
        T3: t3,
        T4: t4,
        T5: t5,
        T6: t6,
        T7: t7,
        T8: t8,
        T9: t9,
        T10: t10,
        T11: t11,
        T12: t12,
    })
}