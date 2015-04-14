'use strict';

module.exports = {

  generateSpentTimeText: function(createdAt) {

    var now = new Date();
    var diff = now - createdAt;
    var days = Math.round(diff / 86400000); // days
    var hrs = Math.round((diff % 86400000) / 3600000); // hours
    var mins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes

    var spentTimeText;

    var addTimeUnit = function(time, unit){
      if (time > 1){
        return time + ' ' +unit + 's ago';
      }
      return time + ' ' +unit + ' ago';
    }

    if (days > 0){
      spentTimeText = addTimeUnit(days, 'day');
    }else if (hrs > 0){
      spentTimeText = addTimeUnit(hrs, 'hour');
    }else{
      spentTimeText = addTimeUnit(mins, 'minute');
    }

    return spentTimeText;
  }

};
