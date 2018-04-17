/**
 * This file can be imported to act as a source for events
 */

import moment from 'moment';

let events = [
  {
    title: "WUS",
    resourceId: "1",
    start: moment([2018,3,14,20]),
    end: moment([2018,3,14,22])
  },
  {
    title: "EL CID",
    resourceId: "2",
    start: "2018-04-14 20:00", //moment([2018,3,14,20]),
    end: "2018-04-14 22:30" //moment([2018,3,14,22])
  },
  {
    title: "NC-In",
    resourceId: "1",
    start: "1523815200"
  }
]

export default events;