const CheckoutModel = require('./checkout.model');
module.exports.revenue = async() => {
    const list = await CheckoutModel.find();
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
        // const money1 = money.replace("đ", "");
        // const money2 = money1.replace(".", "");
        // const money4 = money2.replace(".", "");
        const money3 = parsePrice(money);

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
    const T = {
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4,
        t5: t5,
        t6: t6,
        t7: t7,
        t8: t8,
        t9: t9,
        t10: t10,
        t11: t11,
        t12: t12
    }
    return T;
}

module.exports.total = async() => {
    const list = await CheckoutModel.find();
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += parsePrice(list[i].totalCost);
    }
    return sum + " đ";
}

function parsePrice(strPrice) {
    return parseInt(strPrice.replace(/[\.dđ]/g, ""));
};

function parseIntToPrice(Int) {

    var price = Int.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })

    return price + 'đ';
}