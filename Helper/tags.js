const moment = require('moment')



module.exports = {
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },

  formatDate: function (date, format) {
    return moment(date).utc().format(format)
  },

  editIcon: function (ContentUser, loggedUser, Contentid, floating = true) {
    if (ContentUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/edit/content/${Contentid}" class="btn-floating halfway-fab blue"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>`
      } else {
        return `<a href="/edit/content/${Contentid}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>`
      }
    } else {
      return ''
    }
  },
}