<template>
  <div>
    <full-calendar
      :config="config"
      :events="events"
      @event-selected="eventSelected"
      @event-drop="eventDrop"
      @event-resize="eventResize"
      @event-created="eventCreated"
      @day-click="dayClick"
      ref="calendar" />

    <button @click="button">Refresh</button>
  </div>
</template>

<script>
import moment from 'moment';
import store from '../store';

// import apiEvents from '../api/test-events.js';
// import apiResources from '../api/test-resources.js';
import apiRights from '../api/test-rights.js';

export default {
  data() {
    return {
      events: function(s, e, tz, cb) {
        const start = moment(s).toISOString();
        const end = moment(e).toISOString();

        store.dispatch('loadAllEventsInPeriod', {
          start: start,
          end: end
        })
          .then(() => {
            cb(store.getters.getAllEvents);
          })
          .catch(err => console.error(err));
      },
      config: {
        schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
        locale: 'nl',
        buttonText: {
          today: 'vandaag',
          month: 'maand',
          week: 'week',
          day: 'dag',
          list: 'lijst'
        },
        defaultView: "agendaDay",
        nowIndicator: true,
        scrollTime: '17:00:00',
        firstDay: 1,
        titleFormat: 'D MMMM YYYY',
        eventOverlap: false,
        header: {
          left: "agendaDay,listWeek",
          center: "title",
          right: "today prev,next"
        },
        resources: function(cb) {
          store.dispatch('loadAllResources')
            .then(() => {
              cb(store.getters.getAllResources);
            })
            .catch(err => console.error(err));
        },
        apiRights
      }
    }
  },
  computed: {

  },
  methods: {
    // on event click
    eventSelected(event, jsEvent, view) {
      console.log("selected");
      console.log(event, jsEvent, view);
      console.log(jsEvent.currentTarget);
    },

    // on event move/drop
    eventDrop(e) {
      const event = {
        title: e.title,
        notes: e.notes,
        start: moment(e.start).toISOString(),
        end: moment(e.end).toISOString(),
        resource_id: parseInt(e.resourceId),
      };

      this.$store.dispatch('updateEvent', { 
        id: e.id, 
        event: event
      })
        .then(() => {

        })
        .catch(err => console.error(err));
    },

    // on event resize
    eventResize(e) {
      const event = {
        start: moment(e.start).toISOString(),
        end: moment(e.end).toISOString(),
      };

      this.$store.dispatch('updateEvent', {
        id: e.id,
        event: event
      })
        .then(() => {

        })
        .catch(err => console.error(err));
    },

    // on event created
    eventCreated(e) {
      console.log("created", e);

      const title = prompt('title');

      const event = {
        title: title,
        notes: '',
        start: moment(e.start).toISOString(),
        end: moment(e.end).toISOString(),
        resource_id: parseInt(e.resource.id),
      };

      console.log(event);

      this.$store.dispatch('addEvent', event)
        .then(() => {

        })
        .catch(err => console.error(err));
    },

    // on single click on day
    dayClick(date, jsEvent, view) {
      console.log("click");
      console.log(date, jsEvent, view);
    },

    button() {
      const currentView = this.$refs.calendar.fireMethod('getView');
      this.$refs.calendar.fireMethod('changeView', currentView.type, '2018-04-20');
    }
  },
  created() {

  }
}
</script>

<style lang="scss">

</style>