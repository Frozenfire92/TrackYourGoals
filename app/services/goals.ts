import Service from '@ember/service';
import { action, set } from '@ember/object';

import * as d3 from 'd3';
import uuid from 'uuid/v1';
import moment from 'moment';

import { inLocalStorage } from 'track-your-goals/utils/decorators';
import { GoalType } from 'track-your-goals/utils/enums';

export default class GoalsService extends Service {
  // @ts-ignore
  @inLocalStorage goals: Array<Goal> = [];

  get demo(): Goal {
    return {
      id: 'demo',
      name: 'demo',
      type: GoalType.Integer,
      // TODO make the current year dynamically
      records: d3.timeDays(new Date(2019, 0, 1), new Date(2020, 0, 1))
        .map((n: Date) => ({
          date: n.toISOString().slice(0, 10),
          value: parseInt((Math.random() * 100).toString())
        }))
    };
  }

  @action create(name: string, type: GoalType, records: Array<GoalRecord> = [], id?: string) : Goal {
    console.log('create', name, type);
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

  @action save(goal: Goal): void {
    this.goals = [
      goal,
      ...this.goals.rejectBy('id', goal.id)
    ];
  }

  @action delete({ id }: Goal): void {
    this.goals = [
      ...this.goals.rejectBy('id', id)
    ];
  }

  @action saveRecord(goal: Goal, date: string, value: GoalRecordValue): boolean {
    console.log('saveRecord', value);
    if (goal) {
      let existingRecord = goal.records.findBy('date', date);

      let cleanValue = value;
      switch (goal.type) {
        case GoalType.Integer: cleanValue = parseInt(value.toString()) || 0; break;
        case GoalType.Float: cleanValue = parseFloat(value.toString()) || 0; break;
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

  @action computeStreak(goal: Goal): number {
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
