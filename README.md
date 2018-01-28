# Vue localStorageDate(lsd)
Vue-lsd is vue plugin to make saving vue instance data to localStorage.

`localStorageData()` works exatcly same like vue normal `data()` except everything is saved between page reloads like magic!

##DEMO
[TRY IT OUT](https://codepen.io/Napzu/full/ddbZyv/)

## Install
Usage npm:
```
npm install vue-lsd
```
## Usage

```javascript
import vueLocalStorageData from 'vue-lsd'
Vue.use(vueLocalStorageData)

export default {
  id: '#app',
  localStorageData() { /* Works exactly same as normal data() */
    return {
      hello: 'Hello',
      deepProp: {
        level1: {
          level2: {
            world: 'world!',
          }
        }
      }
    }
  },
  methods: {
      helloWorld(){
          console.log(this.hello+' '+this.deepProp.level1.level2.world)
      }
  },
  created() { this.helloWorld() }
}
```

Plugin has some options
```javascript
Vue.use(vueLocalStorageData,{
  prefix: 'yourOwnLocalStorageKeyPrefix',
  throttle: 500 /* throttle how often values are saved to localStorage */
})
```
Plugin makes vue watchers to every root key and only saves when change actually happens.

Vue instance data is saved with setItem key:
`vueLocalStorageData_` + vue instance UID + `_dataRootKey`
but you can override it like this:
```javascript
export default {
  localStorageData() {
    return {
      lsd_id: 'myOwnStr', /* <-- replaces UID in local storage setItem key */
      lsd_throttle: 200,  /* Custom save throttle for this instance */
      myProp1: 'test'
    }
  }
}
```

Option override keys `lsd_id` and `lsd_throttle` won't appear in vue instance.

