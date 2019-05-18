import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import * as d3 from 'd3';

import { GoalType } from 'track-your-goals/utils/enums';
import { inLocalStorage } from 'track-your-goals/utils/decorators';
import { maxBoolean, maxFloat, maxInt } from 'track-your-goals/utils/reduce';

export type Args = {
  cellSize: number,
  data: any,
  type: GoalType,
  colorScheme: string,
  openGoalUpdater: (key: string) => void
}

export default class GoalCalendarComponent extends Component<Args> {
  constructor(owner: unknown, args: any){
    super(owner, args);
    this.year = this.years[this.years.length - 1];
  }

  //@ts-ignore
  @inLocalStorage orientation = 'vertical';
  orientations: string[] = ['vertical', 'horizontal'];

  format = d3.timeFormat('%Y-%m-%d');
  shownTooltip = null;
  titles: any;
  tooltip: any;
  days: any;
  svg: any;
  group: any;

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

  @tracked year: number;
  @computed('data')
  get years() {
    return Object.keys(this.args.data)
      .map(date => parseInt(date.slice(0, 4)))
      .uniq()
      .sort();
  }

  @action updateData() {
    this.shownTooltip = null;
    this.tooltip.style('opacity', 0);

    let { titles } = this;
    let { data } = this.args;

    titles.text((d: Date) => {
      let key = this.format(d);
      return data.hasOwnProperty(key)
        ? `${key}: ${data[key]}`
        : key;
    });

    this.updateColors();
  }

  @action toggleOrientation() {
    this.orientation = this.orientation === 'vertical'
      ? 'horizontal'
      : 'vertical';

    let { cellSize, days, horizontal, svg, width, height } = this;

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', this.orientation);

    let weeks = (d: Date) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize + cellSize;
    let week = (d: { getDay: () => number; }) => d.getDay() * cellSize + cellSize;

    days
      .attr('y', horizontal ? week : weeks)
      .attr('x', horizontal ? weeks : week);

    this.shownTooltip = null;
    this.tooltip.style('opacity', 0);
  }

  @action updateYear(e: { target: { value: string; }; }) {
    this.year = parseInt(e.target.value);
    let { days, year } = this;
    days.data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)));
    this.shownTooltip = null;
    this.tooltip.style('opacity', 0);
  }

  @action updateColors() {
    let {
      data,
      type,
      colorScheme = 'interpolateGreens'
    } = this.args;
    let { days } = this;

    let reducer;
    switch(type) {
      case GoalType.Boolean: reducer = maxBoolean; break;
      case GoalType.Float: reducer = maxFloat; break;
      default:
      case GoalType.Integer: reducer = maxInt; break;
    }

    let max = Object.keys(data)
      .map(n => data[n])
      .reduce(reducer, 0);

    days.attr('fill', (d: Date) => {
      let key = this.format(d);
      return data.hasOwnProperty(key)
        //@ts-ignore
        ? d3[colorScheme](data[key] / max)
        //@ts-ignore
        : d3[colorScheme](0)
    });
  }

  @action draw(element: any) {
    let {
      width,
      height,
      cellSize,
      year = (new Date()).getFullYear(),
      horizontal
    } = this;
    let {
      data,
      type,
      colorScheme = 'interpolateGreens'
    } = this.args;

    let reducer;
    switch(type) {
      case GoalType.Boolean: reducer = maxBoolean; break;
      case GoalType.Float: reducer = maxFloat; break;
      default:
      case GoalType.Integer: reducer = maxInt; break;
    }

    let max = Object.keys(data)
      .map(n => data[n])
      .reduce(reducer, 0);

    this.svg = d3.select(element)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', horizontal ? 'horizontal' : 'vertical', )

    this.group = this.svg
      .append('g');


    let weeks = (d: Date) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize + cellSize;
    let week = (d: { getDay: () => number; }) => d.getDay() * cellSize + cellSize;

    this.days = this.group.selectAll('.day')
      .data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
      .enter().append('rect')
      .attr('class', 'day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('y', horizontal ? week : weeks)
      .attr('x', horizontal ? weeks : week)
      .attr('fill', (d: Date) => {
        let key = this.format(d);
        return data.hasOwnProperty(key)
          //@ts-ignore
          ? d3[colorScheme](data[key] / max)
          //@ts-ignore
          : d3[colorScheme](0)
      });

    this.titles = this.days
      .append('title')
      .text((d: Date) => {
        let key = this.format(d);
        return data.hasOwnProperty(key)
          ? `${key}: ${data[key]}`
          : key;
      });

    this.tooltip = d3.select(element)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      // .on('click', (d) => {
      //   console.log('click tooltip', d, this.shownTooltip);
      // });

    this.days
      .on("click", (d: Date) => {
        let key = this.format(d);
        this.args.openGoalUpdater(key);
      });
  }
}
