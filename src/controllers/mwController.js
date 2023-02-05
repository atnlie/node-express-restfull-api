const md1 = (req, res, next) => {
    console.log('This is mdl #1');
    next();
};

const md2 = (req, res, next) => {
    console.log('This is mdl #2');
    next();
};


module.exports = {md1, md2};