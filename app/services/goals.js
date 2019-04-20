import Service from '@ember/service';
import { action, set } from '@ember/object';

import * as d3 from 'd3';
import uuid from 'uuid/v1';
import moment from 'moment';

import { inLocalStorage } from 'track-your-goals/utils/decorators';

export default class GoalsService extends Service {
  @inLocalStorage goals = [];

  demo() {
    return {
      id: 'demo',
      name: 'demo',
      type: 'amount-integer',
      records: d3.timeDays(new Date(2019, 0, 1), new Date(2020, 0, 1))
        .map(n => ({
          date: n.toISOString().slice(0, 10),
          value: parseInt(Math.random() * 100)
        }))
    };
  }

  @action create(name, type) {
    if (name && type) {
      let id = uuid();
      while (this.goals.find((n) => n.id === id)) {
        id = uuid();
      }

      let goal = { id, name, type, records: [] };

      this.goals = [
        ...this.goals,
        goal
      ];

      return goal;
    }
  }

  @action save(goal) {
    this.goals = [
      ...this.goals.rejectBy('id', goal.id),
      goal
    ];
  }

  @action delete(goal) {
    this.goals = [
      ...this.goals.rejectBy('id', goal.id)
    ];
  }

  @action saveRecord(goal, date, value) {
    let existingRecord = goal.records.findBy('date', date);

    if (existingRecord) {
      set(existingRecord, 'value', value);
    }
    else {
      goal.records.push({ date, value });
    }

    // goal.records = goal.records.sortBy('date');
    set(goal, 'records', goal.records.sortBy('date'));

    if (goal.id !== 'demo') {
      this.save(goal);
    }
  }

  @action computeStreak(goal) {
    let today = moment();
    let shortToday = today.format('YYYY-MM-DD');

    let records = goal.records
      .map(n => ({ ...n }))
      .filter(n => n.date <= shortToday)
      .filterBy('value')
      .reverse();

    let isStreak = true;
    let streak = 0;
    while (isStreak) {
      let nextDate = moment(records[streak].date);
      let diff = today.diff(nextDate, 'days');
      if (diff === 0 || diff === 1) {
        today = nextDate
        streak++;
      }
      else isStreak = false;
    }

    return streak;
  }
}
