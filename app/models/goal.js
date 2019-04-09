import { computed } from '@ember/object';
import DS from 'ember-data';
const { Model, attr } = DS;

export default class GoalModel extends Model {
  @attr('string') name;
  @attr('string') type;
  @attr({ defaultValue() { return []; }}) records;

  @computed('records.@each.{date,value}')
  get streak() {
    // let sortedRecords = this.records;
    // console.log('streak calc', sortedRecords);
    return 0;
  }

  @computed('records.@each.value', 'type')
  get maxValue() {
    if (this.type === 'boolean') {
      return 1;
    }
    else {
      return Math.max(...this.records.mapBy('value'));
    }
  }

  @computed('records.@each.date')
  get yearRange() {
    let years = this.records
      .map(n => n.date.slice(0, 4))
      .uniq();
    if (years.length) {
      return {
        min: parseInt(years[0]),
        max: years.length === 1
          ? parseInt(years[0])
          : parseInt(years[years.length - 1])
      };
    }
    else {
      let thisYear = parseInt(new Date().toISOString().slice(0, 4));
      return {
        min: thisYear,
        max: thisYear
      }
    }
  }

  @computed('records.@each.value')
  get dataHash() {
    let data = {};
    this.records.forEach(record =>
      data[record.date] = record.value
    );
    return data;
  }
}
