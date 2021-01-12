var Utils = {};

Utils.compareEvents = (a, b) => {
    const dateEventA = new Date(
        parseInt(
          a.date[6] +
            a.date[7] +
            a.date[8] +
            a.date[9]
        ),
        parseInt(a.date[3] + a.date[4]) - 1,
        parseInt(a.date[0] + a.date[1])
      );
    const dateEventB = new Date(
        parseInt(
        b.date[6] +
            b.date[7] +
            b.date[8] +
            b.date[9]
        ),
        parseInt(b.date[3] + b.date[4]) - 1,
        parseInt(b.date[0] + b.date[1])
    );
    
    if (dateEventA > dateEventB) {
        return -1;
    }
    else if (dateEventA < dateEventB) {
        return 1;
    } 
    else {
        return 0
    };
}

module.exports = Utils;
