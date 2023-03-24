import moment from 'moment'
import Vue from 'vue'
moment.locale('zh-cn')

const dateTimeFormat = function (value: string) {
  if (!value) {
    return ''
  }
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

const phoneFormat = function (value: string) {
  // var reg = /^(\d{3})\d{4}(\d{4})$/
  // return value.replace(reg, '$1****$2')
  return value.substring(0, 3) + '****' + value.substr(value.length - 4)
}

export default {
  dateTimeFormat,
  phoneFormat
}
