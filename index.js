(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    ( global.vueLocalStorageData = factory() );
}(this, (function () { 'use strict';
    var LSD = {
        install: function(Vue, o) {
            var timeouts = {}, opts = { prefix: 'vueLocalStorageData_', throttle: 500 }, isNode = new Function("try{return this===global}catch(e){return false}")()
            if (o !== null && typeof o === 'object') Object.keys(o).forEach(function (k) { opts[k] = o[k] })
            Vue.mixin({
                data: function() {
                    var vm = this, data = {}, lsd = this.$options.localStorageData;
                    if ( typeof lsd === 'undefined' ) return data
                    if ( typeof lsd === 'function' ) lsd = lsd();
                    if ( isNode ) return lsd
                    if ( lsd !== null && typeof lsd == 'object' ) {
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
                    } else return lsd
                    return data
                }
            })
        }
    }
    return LSD
})));