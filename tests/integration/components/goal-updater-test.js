import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | goal-updater', function(hooks) {
  const componentSelector = '.goal-updater'

  const selectors = {
    component: componentSelector,
    today: `${componentSelector} span`,
    inputDate: `${componentSelector} input[type="date"]`,
    labelAmount: `${componentSelector} label[for="amount"]`,
    labelBoolean: `${componentSelector} label[for="complete"]`,
    inputAmount: `${componentSelector} input[name="amount"]`,
    inputBoolean: `${componentSelector} input[name="complete"]`,
    inputSubmit: `${componentSelector} input[type="submit"]`
  };

  const getDomRefs = (assert) => ({
    today: assert.dom(selectors.today),
    inputDate: assert.dom(selectors.inputDate),
    labelAmount: assert.dom(selectors.labelAmount),
    labelBoolean: assert.dom(selectors.labelBoolean),
    inputAmount: assert.dom(selectors.inputAmount),
    inputBoolean: assert.dom(selectors.inputBoolean),
    inputSubmit: assert.dom(selectors.inputSubmit)
  });

  const today = (new Date()).toISOString().slice(0, 10);

  setupRenderingTest(hooks);

  test('it does not render with no goal', async function(assert) {
    await render(hbs`<GoalUpdater />`);
    assert.dom(selectors.component).doesNotExist();
  });

  test('it renders the date properly', async function(assert) {
    this.set('goal', {});
    await render(hbs`<GoalUpdater @goal={{this.goal}} />`);

    let dom = getDomRefs(assert);

    dom.today.hasText('Today, ');
    dom.inputDate.doesNotExist();

    await click(selectors.today);

    dom.today.doesNotExist();
    dom.inputDate.hasValue((new Date).toISOString().slice(0, 10), 'has today as default date');
  });

  test('it renders with a boolean goal', async function(assert) {
    this.set('goal', { type: 'boolean' });
    await render(hbs`<GoalUpdater @goal={{this.goal}} />`);

    let dom = getDomRefs(assert);

    dom.labelAmount.doesNotExist();
    dom.inputAmount.doesNotExist();

    dom.labelBoolean.hasText('I accomplished my goal today');
    dom.inputBoolean.hasAttribute('type', 'checkbox');
    dom.inputBoolean.doesNotHaveAttribute('checked');

    dom.inputSubmit.hasValue('save');
  });

  // TODO support integer/float
  test('it renders with an amount goal', async function(assert) {
    this.set('goal', { type: 'amount' });
    await render(hbs`<GoalUpdater @goal={{this.goal}} />`);

    let dom = getDomRefs(assert);

    dom.labelAmount.hasText('I accomplished this much');
    dom.inputAmount.hasAttribute('type', 'number');
    dom.inputAmount.hasAttribute('min', '0');

    dom.labelBoolean.doesNotExist();
    dom.inputBoolean.doesNotExist();

    dom.inputSubmit.hasValue('save');
  });

  test('it works to select dates', async function(assert) {
    assert.expect(3);

    this.set('goal', {});
    await render(hbs`<GoalUpdater
      @goal={{this.goal}}
      @submit={{this.submit}}
    />`);

    this.set('submit', (date) => {
      assert.equal(date, today, 'has todays date by default');
    });
    await click(selectors.inputSubmit);

    // Switch to date selector
    await click(selectors.today);

    this.set('submit', (date) => {
      assert.equal(date, today, 'has todays date from date picker');
    });
    await click(selectors.inputSubmit);

    await fillIn(selectors.inputDate, '2000-01-01');
    this.set('submit', (date) => {
      assert.equal(date, '2000-01-01', 'has todays date from date picker');
    });
    await click(selectors.inputSubmit);
  });

  test('it works to input boolean', async function(assert) {
    assert.expect(4);

    this.set('goal', { type: 'boolean' });
    await render(hbs`<GoalUpdater
      @goal={{this.goal}}
      @submit={{this.submit}}
    />`);

    this.set('submit', (date, value) => {
      assert.equal(date, today, 'has todays date by default');
      assert.equal(value, false, 'has false value by default');
    });
    await click(selectors.inputSubmit);

    await click(selectors.inputBoolean);

    this.set('submit', (date, value) => {
      assert.equal(date, today, 'has todays date by default');
      assert.equal(value, true, 'has true value after click');
    });
    await click(selectors.inputSubmit);
  });

  test('it works to input amount', async function(assert) {
    assert.expect(6);

    this.set('goal', { type: 'amount' });
    await render(hbs`<GoalUpdater
      @goal={{this.goal}}
      @submit={{this.submit}}
    />`);

    this.set('submit', (date, value) => {
      assert.equal(date, today, 'has todays date by default');
      assert.equal(value, 0, 'has 0 value by default');
    });
    await click(selectors.inputSubmit);

    await fillIn(selectors.inputAmount, 1100);

    this.set('submit', (date, value) => {
      assert.equal(date, today, 'has todays date by default');
      assert.equal(value, 1100, 'has value 1100 after fillIn');
    });
    await click(selectors.inputSubmit);

    // TODO support integer/float (seperate test)

    await fillIn(selectors.inputAmount, 1.23);
    await this.pauseTest();

    this.set('submit', (date, value) => {
      assert.equal(date, today, 'has todays date by default');
      assert.equal(value, 1.23, 'has value 1.23 after fillIn');
    });
    await click(selectors.inputSubmit);
  });

  // test('it works to select date and input together', async function(assert) {

  // });
});
