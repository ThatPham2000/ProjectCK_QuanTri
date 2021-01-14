const RevenueMModel = require('../models/RevenueModel');
module.exports.revenue = async(req, res) => {
    const T = await RevenueMModel.revenue();

    res.render('revenue', {
        title: 'Revenue',
        T1: T.t1,
        T2: T.t2,
        T3: T.t3,
        T4: T.t4,
        T5: T.t5,
        T6: T.t6,
        T7: T.t7,
        T8: T.t8,
        T9: T.t9,
        T10: T.t10,
        T11: T.t11,
        T12: T.t12
    })
}