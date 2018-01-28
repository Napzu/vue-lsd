(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vueLocalStorageData = factory());
}(this, (function () { 'use strict';
    return {
        install(Vue, o) {
            var timeouts = {}, opts = { prefix: 'vueLocalStorageData_', throttle: 500 }
            if (o !== null && typeof o === 'object') Object.keys(o).forEach(function (k) { opts[k] = o[k] })
            Vue.mixin({
                data() {
                    var vm = this, data = {}, lsd = this.$options.localStorageData
                    if ( typeof lsd === 'function'  ) lsd = lsd(); else return data
                    if ( typeof lsd === 'undefined' ) return data
                    Object.keys(lsd).forEach(function (k) {
                        if ((' lsd_id lsd_throttle ').indexOf(' ' + k + ' ') > -1) return
                        var lk = opts.prefix + (lsd.lsd_id || vm._uid) + '_' + k, lv = localStorage.getItem(lk)
                        if (lv === null) localStorage.setItem(lk, JSON.stringify(data[k] = lsd[k]))
                        else data[k] = JSON.parse(lv)
                        vm.$nextTick(function () {
                            this.$watch(k, function (n) {
                                if ( timeouts[lk] ) return
                                timeouts[lk] = setTimeout(function () {
                                    timeouts[lk] = false
                                    localStorage.setItem(lk, JSON.stringify(vm[k]))
                                }, lsd.lsd_throttle || opts.throttle)
                            }, { deep: true })
                        });
                    })
                    return data
                }
            })
        }
    }
})));