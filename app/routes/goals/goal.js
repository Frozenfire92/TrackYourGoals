import Route from '@ember/routing/route';
import * as d3 from 'd3';

export default class GoalsGoalRoute extends Route {
  model({ id }) {
    if (id === 'demo') {
      let record = this.store.peekRecord('goal', id);
      if (!record) {
        record = this.store.createRecord('goal', {
          id,
          name: 'demo',
          type: 'amount-float',
          records: d3.timeDays(new Date(2019, 0, 1), new Date(2020, 0, 1))
            .map(n => ({
              date: n.toISOString().slice(0, 10),
              value: Math.random()
            }))
        });
        return record;
      }
      return record;
    }

    return this.store.findRecord('goal', id);
  }
}
