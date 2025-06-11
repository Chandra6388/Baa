
module.exports = function (app) {
    app.use(require("./authRoutes"));
    app.use(require("./categoryRoutes"));
    app.use(require("./productRoutes"));
    app.use(require("./userRoutes"));
    app.use(require("./addressRoutes"));


};