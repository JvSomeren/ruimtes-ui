<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Event</p>
      </header>

      <section class="modal-card-body">
        <b-field grouped>
          <b-field label="Titel" expanded>
            <b-input
              type="text"
              v-model="event.title"
              placeholder="Titel"
              required>
            </b-input>
          </b-field>

          <b-field label="Ruimte">
            <b-select
              v-model="event.resourceId"
              placeholder="Ruimte"
              icon="home-map-marker">
              <option
                v-for="resource in resources"
                :key="resource.id"
                :value="resource.id">{{ resource.title }}</option>
            </b-select>
          </b-field>
        </b-field>

        <b-field label="Opmerkingen">
          <b-input
            type="textarea"
            v-model="event.notes"
            placeholder="Opmerkingen">
          </b-input>
        </b-field>

        <b-field label="Begin">
          <b-field>
            <b-datepicker
              v-model="date.start"
              :date-formatter="dateFormatter"
              placeholder="Begindatum"
              icon="calendar-today"></b-datepicker>

            <b-timepicker
              v-model="time.start"
              :increment-minutes="30"
              placeholder="Begintijd"
              icon="clock"></b-timepicker>
          </b-field>
        </b-field>

        <b-field label="Einde">
          <b-field>
            <b-datepicker
              v-model="date.end"
              :date-formatter="dateFormatter"
              placeholder="Einddatum"
              icon="calendar"></b-datepicker>

            <b-timepicker
              v-model="time.end"
              :increment-minutes="30"
              placeholder="Eindtijd"
              icon="clock"></b-timepicker>
          </b-field>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Sluiten</button>

        <button class="button is-primary" @click="confirm" v-if="event.id">Bevestig</button>
        <button class="button is-primary" type="button" @click="add" v-else>Toevoegen</button>

        <button class="button is-danger right-button" @click="remove" v-if="event.id">Verwijderen</button>
      </footer>
    </div>
  </form>
</template>

<script>
import moment from 'moment';

moment.locale('nl');

export default {
  data() {
    return {
      event: {
        id: null,
        title: '',
        notes: '',
        start: null,
        end: null,
        resourceId: ''
      },
      date: {
        start: new Date(),
        end: new Date()
      },
      time: {
        start: new Date(),
        end: new Date()
      },  
    }
  },
  props: ['eventProp'],
  computed: {
    resources() {
      return this.$store.getters.getAllResources;
    },
  },
  methods: {
    /**
     * dateFormatter
     * 
     * date{Date}; will be formatted
     */
    dateFormatter(date) {
      return moment(date).format('D/MM/YYYY');
    },

    /**
     * combineDateTime
     * 
     * Takes 2 separate Date objects and combine them into one,
     * taking the date from one and the time from another.
     * 
     * m{String}; the key to the object property which will be combined
     */
    combineDateTime(m) {
      const date = moment(this.date[m]).format('YYYY-MM-D');
      const time = moment(this.time[m]).format('HH:mm');

      return moment(date + ' ' + time).toISOString(true);
    },

    /**
     * setDateTimes
     * 
     * obj{Object}; 
     * s{Moment Object}; start of the event
     * e{Moment Object}; end of the event
     */
    setDateTimes(obj, s, e) {
      obj.start = s;
      obj.end = e;
    },

    /**
     * add
     * 
     * Trigger the addEvent action in the store and add
     * the given event to the calendar.
     * 
     * e{Event}; default Event object passed on click
     */
    add(e) {
      e.preventDefault();

      const event = {
        title: this.event.title,
        notes: this.event.notes,
        start: this.combineDateTime('start'),
        end: this.combineDateTime('end'),
        resource_id: parseInt(this.event.resourceId),
      };

      this.$store.dispatch('addEvent', event)
        .then(() => {
          this.setDateTimes(this.event, event.start, event.end);
          this.$emit('addEvent', this.event);
          this.$parent.close();
        })
        .catch(err => console.error(err));
    },

    /**
     * confirm
     * 
     * Trigger the updateEvent action in the store and update
     * the given event in the calendar.
     * 
     * e{Event}; default Event object passed on click
     */
    confirm(e) {
      e.preventDefault();

      const event = {
        title: this.event.title,
        notes: this.event.notes,
        start: this.combineDateTime('start'),
        end: this.combineDateTime('end'),
        resource_id: parseInt(this.event.resourceId),
      };

      this.$store.dispatch('updateEvent', { 
        id: this.event.id, 
        event: event
      })
        .then(() => {
          // To update the calendar the original event must be given
          // as a parameter. So we update the original event with the
          // correct times.
          this.setDateTimes(this.event, event.start, event.end);
          this.$emit('updateEvent', this.event);

          this.$parent.close();
        })
        .catch(err => console.error(err));
    },

    /**
     * remove
     * 
     * Trigger the deleteEvent action in the store and remove
     * the event from the calendar.
     * 
     * e{Event}; default Event object passed on click
     */
    remove(e) {
      e.preventDefault();

      this.$store.dispatch('deleteEvent', this.event.id)
        .then(() => {
          this.$emit('removeEvent', this.event.id);
          this.$parent.close();
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    this.event = this.eventProp;

    // initializing the date- and timepickers to the correct format
    this.date.start = this.time.start = moment(this.eventProp.start).toDate();
    this.date.end = this.time.end = moment(this.eventProp.end).toDate();
  }
}
</script>

<style lang="scss">
.right-button {
  margin-left: auto;
}

.modal .animation-content .modal-card {
  overflow: visible !important;
}

.modal-card-body {
  overflow: visible !important;
}
</style>