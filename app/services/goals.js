import Service from '@ember/service';
import { action, set } from '@ember/object';

import * as d3 from 'd3';
import uuid from 'uuid/v1';
import moment from 'moment';

import { inLocalStorage } from 'track-your-goals/utils/decorators';

export default class GoalsService extends Service {
  @inLocalStorage goals = [];

  get demo() {
    return {
      id: 'demo',
      name: 'demo',
      type: 'amount-integer',
      // TODO make the current year dynamically
      records: d3.timeDays(new Date(2019, 0, 1), new Date(2020, 0, 1))
        .map(n => ({
          date: n.toISOString().slice(0, 10),
          value: parseInt(Math.random() * 100)
        }))
    };
  }

  @action create(name, type, records = [], id) {
    console.log('create', name, type);
    if (name && type) {
      if (!id) {
        id = uuid();
        while (this.goals.find((n) => n.id === id)) {
          id = uuid();
        }
      }

      let goal = { id, name, type, records };

      this.goals = [
        goal,
        ...this.goals
      ];

      return goal;
    }
  }

  @action save(goal) {
    this.goals = [
      goal,
      ...this.goals.rejectBy('id', goal.id)
    ];
  }

  @action delete({ id }) {
    this.goals = [
      ...this.goals.rejectBy('id', id)
    ];
  }

  @action saveRecord(goal, date, value) {
    if (goal) {
      let existingRecord = goal.records.findBy('date', date);

      let cleanValue = value;
      switch (goal.type) {
        case 'amount-integer': cleanValue = parseInt(value) || 0; break;
        case 'amount-float': cleanValue = parseFloat(value) || 0; break;
      }


      if (existingRecord) {
        if (!cleanValue) {
          set(goal, 'records', goal.records.without(existingRecord).sortBy('date'));
        }
        else {
          set(existingRecord, 'value', cleanValue);
        }
      }
      else {
        if (cleanValue) {
          goal.records.push({ date, value: cleanValue });
          set(goal, 'records', goal.records.sortBy('date'));
        }
      }

      if (goal.id !== 'demo') {
        this.save(goal);
      }

      return true;
    }
    else {
      return false;
    }
  }

  @action computeStreak(goal) {
    let streak = 0;
    if (goal && goal.records) {
      let today = moment();
      let shortToday = today.format('YYYY-MM-DD');

      let records = goal.records
        .map(n => ({ ...n }))
        .filter(n => n.date <= shortToday)
        .filterBy('value')
        .sortBy('date')
        .reverse();


      if (records.length) {
         let isStreak = true;
        while (isStreak) {
          let nextDate = moment(records[streak].date);
          let diff = today.diff(nextDate, 'days');
          if (diff === 0 || diff === 1) {
            today = nextDate;
            streak++;
            if (streak > records.length - 1) {
              isStreak = false;
            }
          }
          else isStreak = false;
        }
      }
    }
    return streak;
  }
}
