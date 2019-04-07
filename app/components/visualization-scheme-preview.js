import Component from '@glimmer/component';
import { action } from '@ember/object';

import * as d3 from 'd3';
import _ from 'underscore';

const width = 100;
const height = 5;
const slices = 25;
const sliceSize = width / slices;

export default class VisualizationSchemePreviewComponent extends Component {
  @action draw(element) {
    const { scheme } = this.args;
    if (scheme) {
      if (this.svg && this.slices) {
        this.update();
      }
      else {
        this.svg = d3.select(element)
          .append('svg')
          .attr('viewBox', `0 0 ${width} ${height}`);

        this.slices = this.svg.selectAll('rect')
          .data(_.range(0, width, sliceSize))
          .enter()
          .append('rect')
          .attr('width', sliceSize)
          .attr('height', height)
          .attr('x', d => d)
          .attr('y', () => 0)
          .attr('fill', d => d3[scheme](d / width))
          .attr('stroke', 'none');
      }
    }
  }

  @action update() {
    const { scheme } = this.args;
    const { slices } = this;
    if (scheme) {
      slices.attr('fill', d => d3[scheme](d / width))
    }
  }
}
