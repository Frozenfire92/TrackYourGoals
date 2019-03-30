import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import * as d3 from 'd3';

export default class GoalCalendarComponent extends Component {
  constructor() {
    super(...arguments);
    this.year = this.years[this.years.length - 1];
  }

  @tracked orientation = 'vertical';
  orientations = ['vertical', 'horizontal'];

  format = d3.timeFormat('%Y-%m-%d');

  get cellSize() { return this.args.cellSize || 10; }
  get horizontal() { return this.orientation === 'horizontal'; }
  get height() {
    return this.horizontal
      ? this.cellSize * 9
      : this.cellSize * 56
  }
  get width() {
    return this.horizontal
      ? this.cellSize * 56
      : this.cellSize * 9;
  }

  @tracked year;
  @computed('data')
  get years() {
    return Object.keys(this.args.data)
      .map(date => parseInt(date.slice(0, 4)))
      .uniq()
      .sort();
  }

  monthPath(t0) {
    let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
    let d0 = t0.getDay();
    let w0 = d3.timeWeek.count(d3.timeYear(t0), t0);
    let d1 = t1.getDay();
    let w1 = d3.timeWeek.count(d3.timeYear(t1), t1);

    return 'M' + (w0 + 1) * this.cellSize + ',' + d0 * this.cellSize
      + 'H' + w0 * this.cellSize + 'V' + 7 * this.cellSize
      + 'H' + w1 * this.cellSize + 'V' + (d1 + 1) * this.cellSize
      + 'H' + (w1 + 1) * this.cellSize + 'V' + 0
      + 'H' + (w0 + 1) * this.cellSize + 'Z';
  }

  @action updateData() {
    let { titles, days } = this;
    let { data } = this.args;
    console.log('updateData', { titles, data, days });

    let keys = Object.keys(data);
    let max = keys.reduce((prev, curr) => {
      return parseInt(data[curr]) > prev
        ? parseInt(data[curr])
        : prev;
    }, 0);

    titles.text(d => {
      let key = this.format(d);
      return data.hasOwnProperty(key)
        ? `${key}: ${data[key]}`
        : key;
    });

    days.attr('fill', d => {
      let key = this.format(d);
      return data.hasOwnProperty(key)
        ? d3.interpolateBlues(data[key] / max)
        : d3.interpolateBlues(0)
    });
  }

  @action updateOrientation() {
    let { cellSize, days, horizontal, svg, width, height } = this;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    let weeks = d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize + cellSize;
    let week = d => d.getDay() * cellSize + cellSize;

    days
      .attr('y', horizontal ? week : weeks)
      .attr('x', horizontal ? weeks : week)

  }

  @action updateYear() {
    let { days, year } = this;
    days.data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
  }

  @action draw(element) {
    console.log('draw');
    let { width, height, cellSize, year, horizontal } = this;
    let { data } = this.args;

    let keys = Object.keys(data);
    let max = keys.reduce((prev, curr) => {
      return parseInt(data[curr]) > prev
        ? parseInt(data[curr])
        : prev;
    }, 0);
    console.log('max', max);

    this.svg = d3.select(element)
      .append('svg')

    this.group = this.svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g');


    let weeks = d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize + cellSize;
    let week = d => d.getDay() * cellSize + cellSize;

    this.days = this.group.selectAll('.day')
      .data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
      .enter().append('rect')
      .attr('class', 'day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('y', horizontal ? week : weeks)
      .attr('x', horizontal ? weeks : week)
      .attr('fill', d => {
        let key = this.format(d);
        return data.hasOwnProperty(key)
          ? d3.interpolateBlues(data[key] / max)
          : d3.interpolateBlues(0)
      });

    this.titles = this.days
      .append('title')
      .text(d => {
        let key = this.format(d);
        return data.hasOwnProperty(key)
          ? `${key}: ${data[key]}`
          : key;
      });
  }

  @action setYear(e){
    console.log('setYear', e.target.value);
    this.year = parseInt(e.target.value);
    this.updateYear();
  }

  @action setOrientation(e) {
    console.log('setOrientation', e.target.value);
    this.orientation = e.target.value;
    this.updateOrientation();
  }
}
