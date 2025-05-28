
module.exports = function (app) {
    // Auth Route
    app.use(require("./authRoutes"));
    app.use(require("./categoryRoutes"));
    app.use(require("./productRoutes"));
};