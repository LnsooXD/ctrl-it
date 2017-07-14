exports = module.exports = function (util) {
    util.filterAsync = async function filterAsync(f, k, v) {
        return !f || (await f(k, v));
    }
}