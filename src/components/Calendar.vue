<template>
  <section>
    <div 
      class="calendar-header"
      v-if="header">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="field has-addons">

              <p class="control">
                <a class="button" @click="agendaDayView">
                  Dag
                </a>
              </p>

              <p class="control">
                <a class="button" @click="listView">
                  Lijst
                </a>
              </p>

            </div>
          </div>

          <div class="column center-align">
            <b-field>
              <b-datepicker
                :readonly="readonly"
                :date-formatter="dateFormatter"
                :first-day-of-week="firstDayOfWeek"
                :day-names="dayNames"
                :month-names="monthNames"
                v-model="calendarDate"
                icon="calendar-today"></b-datepicker>
            </b-field>
          </div>

          <div class="column right-align">

            <div class="field is-grouped">
              <p class="control" @click="today">
                <a class="button">
                  Vandaag
                </a>
              </p>

              <div class="field has-addons">

                <p class="control">
                  <a class="button" @click="prev">
                    <span class="icon"><i class="mdi mdi-chevron-left"></i></span>
                  </a>
                </p>

                <p class="control">
                  <a class="button" @click="next">
                    <span class="icon"><i class="mdi mdi-chevron-right"></i></span>
                  </a>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <full-calendar
      :config="config"
      :events="events"
      @event-selected="eventSelected"
      @event-drop="eventDrop"
      @event-resize="eventResize"
      @event-created="eventCreated"
      @day-click="dayClick"
      ref="calendar" />
  </section>
</template>

<script>
import moment from 'moment';
import store from '../store';

import EventModal from '../components/EventModal';

moment.locale('nl');

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
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        locale: 'nl',
        // buttonText can be removed
        buttonText: {
          today: 'vandaag',
          month: 'maand',
          week: 'week',
          day: 'dag',
          list: 'lijst'
        },
        defaultView: "agendaDay",
        nowIndicator: true,
        minTime: '11:00:00',
        firstDay: 1,
        slotLabelFormat: 'HH:mm',
        eventOverlap: false,
        header: false,
        contentHeight: "auto",
        resources: function(cb) {
          store.dispatch('loadAllResources')
            .then(() => {
              cb(store.getters.getAllResources);
            })
            .catch(err => console.error(err));
        }
      },
      calendarDate: new Date()
    }
  },
  props: {
    header: {
      default: true,
      type: Boolean
    },
    readonly: {
      default: true,
      type: Boolean
    },
    firstDayOfWeek: {
      default: 1,
      type: Number
    },
    dayNames: {
      default: () => ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
      type: Array
    },
    monthNames: {
      default: () => ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
      type: Array
    }
  },
  computed: {

  },
  methods: {
    /**
     * eventSelected
     * 
     * Gets called when a event is clicked on in the calendar.
     * Opens a modal with the context of the event.
     * 
     * event{FC Event};
     * jsEvent{Event};
     * view{FC View};
     * 
     * @TODO updateEvent and removeEvent can be removed and replaced.
     */
    eventSelected(event, jsEvent, view) {
      this.$modal.open({
        parent: this,
        component: EventModal,
        hasModalCard: true,
        props: { eventProp: event },
        events: {
          fireMethod: this.fireMethod,
          updateEvent: this.updateEvent,
          removeEvent: this.removeEvent
        },
      });
    },

    /**
     * eventDrop
     * 
     * Gets called when a event is moved/dropped on the calendar.
     * Triggers the updateEvent action in the store.
     * 
     * e{FC Event};
     */
    eventDrop(e) {
      const start = moment(e.start).format('YYYY-MM-D HH:mm');
      const end = moment(e.end).format('YYYY-MM-D HH:mm');

      const event = {
        id: e.id,
        title: e.title,
        notes: e.notes,
        start: moment(start).toISOString(true),
        end: moment(end).toISOString(true),
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

    /**
     * eventResize
     * 
     * Gets called when a event is resized on the calendar.
     * Triggers the updateEvent action in the store.
     * 
     * e{FC Event};
     */
    eventResize(e) {
      const start = moment(e.start).format('YYYY-MM-D HH:mm');
      const end = moment(e.end).format('YYYY-MM-D HH:mm');

      const event = {
        id: e.id,
        start: moment(start).toISOString(true),
        end: moment(end).toISOString(true),
      };

      this.$store.dispatch('updateEvent', {
        id: e.id,
        event: event
      })
        .then(() => {

        })
        .catch(err => console.error(err));
    },

    /**
     * eventCreated
     * 
     * Gets called when a event is created on the calendar.
     * Opens a modal with context values of the event.
     * 
     * e{FC Event};
     * 
     * @TODO addEvent event can be removed and replaced.
     */
    eventCreated(e) {
      e.start = moment(e.start).toISOString(true);
      e.end = moment(e.end).toISOString(true);
      e.resourceId = e.resource.id;

      this.$modal.open({
        parent: this,
        component: EventModal,
        hasModalCard: true,
        props: { eventProp: e },
        events: {
          fireMethod: this.fireMethod,
          addEvent: this.addEvent
        },
      });
    },

    /**
     * dayClick
     * 
     * Gets called when a day is clicked on the calendar.
     * Currently has no use.
     * 
     * date{Date};
     * jsEvent{Event};
     * view{FC View};
     */
    dayClick(date, jsEvent, view) {
      return;

      console.log("click");
      console.log(date, jsEvent, view);
    },

    /**
     * agendaDayView
     * 
     * Set calendar view to agenda day.
     * 
     * @TODO update to use the local fireMethod function.
     */
    agendaDayView() {
      this.$refs.calendar.fireMethod('changeView', 'agendaDay');
    },

    /**
     * listView
     * 
     * Set calendar view to list.
     * 
     * @TODO update to use the local fireMethod function.
     */
    listView() {
      this.$refs.calendar.fireMethod('changeView', 'list');
    },

    /**
     * dateFormatter
     * 
     * date{Date}; will be formatted
     */
    dateFormatter(date) {
      return moment(date).format('dd D MMMM YYYY');
    },

    /**
     * today
     * 
     * Set the calendar to the date of today;
     */
    today() {
      const today = moment().format('YYYY-MM-D');

      this.goToDate(today);
    },

    /**
     * prev
     * 
     * Go to the previous day.
     */
    prev() {
      this.calendarDate = new Date(moment(this.calendarDate).subtract(1, 'day'));
    },

    /**
     * next
     * 
     * Go to the next day.
     */
    next() {
      this.calendarDate = new Date(moment(this.calendarDate).add(1, 'day'));
    },

    /**
     * goToDate
     * 
     * date{Date};
     */
    goToDate(date) {
      const currentView = this.$refs.calendar.fireMethod('getView');

      this.calendarDate = new Date(date);
      this.$refs.calendar.fireMethod(
        'changeView',
        currentView.type,
        moment(date).format('YYYY-MM-D'));
    },

    /**
     * fireMethod
     * 
     * method{String}; name of the, to be called, method
     * data{*}; argument(s) passed to the method
     */
    fireMethod(method, data) {
      this.$refs.calendar.fireMethod(method, data);
    },

    /**
     * addEvent
     * 
     * To be removed in the future.
     * Replace with fireMethod in EventModal.
     */
    addEvent(event) {
      this.$refs.calendar.fireMethod('renderEvent', event);
    },

    /**
     * updateEvent
     * 
     * To be removed in the future.
     * Replace with fireMethod in EventModal.
     */
    updateEvent(event) {
      this.$refs.calendar.fireMethod('updateEvent', event);
    },

    /**
     * removeEvent
     * 
     * To be removed in the future.
     * Replace with fireMethod in EventModal.
     */
    removeEvent(id) {
      this.$refs.calendar.fireMethod('removeEvents', id);
    }
  },
  watch: {
    /**
     * calendarDate
     * 
     * Update the calendar view everytime the calendarDate
     * value changes.
     * 
     * date{Date};
     * oldDate{Date};
     */
    calendarDate: function(date, oldDate) {
      const currentView = this.$refs.calendar.fireMethod('getView');

      this.$refs.calendar.fireMethod(
        'changeView',
        currentView.type,
        moment(date).format('YYYY-MM-D'));
    },
  },
  created() {

  }
}
</script>

<style lang="scss">
.left-align {
  text-align: left;
}

.center-align {
  text-align: center;
}

.right-align {

  > div {
    justify-content: flex-end !important;
  }
}

.calendar-header {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  z-index: 30;
  background-color: #fff;
  padding: 8px 0;
}

#calendar {
  position: absolute;
  top: 104px;
  left: 0;
  right: 0;

  .fc-head {
    position: fixed;
    top:104px;
    left: 0;
    right: 0;
    z-index: 30;
    background-color: #fff;
  }

  .fc-body {
    position: absolute;
    top: 26px;
  }
}
</style>