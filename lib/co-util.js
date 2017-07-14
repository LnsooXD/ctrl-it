exports = module.exports = function (util) {
    util.filterCo = function* filterCo(f, k, v) {
        return !f || (yield f(k, v));
    }
}