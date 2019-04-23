import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Service | goals', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(() => {
    localStorage.clear();
  });

  const newGoal = {
    id: 'test',
    name: 'wow',
    records: [],
    type: 'amount-integer'
  };

  module('get demo', function() {
    test('works', function(assert) {
      let service = this.owner.lookup('service:goals');
      let demo = service.demo;
      assert.equal(demo.id, 'demo');
      assert.equal(demo.name, 'demo');
      assert.equal(demo.type, 'amount-integer');
      assert.equal(demo.records.length, 365);
      assert.ok(demo.records.every((record) =>
        record.date && typeof record.value === 'number'
      ));
      assert.deepEqual(JSON.stringify(localStorage), '{}');
    });
  });

  module('@action create', function() {
    test('nothing created when missing name or type', function(assert){
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      service.create('test');
      assert.equal(service.goals.length, 0);
      service.create(null, 'test');
      assert.equal(service.goals.length, 0);
    });

    test('by name and type', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      let goal = service.create('test', 'amount-integer');
      assert.equal(service.goals.length, 1);
      assert.deepEqual(service.goals[0], goal);
      assert.ok(service.goals[0].id.length);
      assert.equal(service.goals[0].name, 'test');
      assert.equal(service.goals[0].type, 'amount-integer');
      assert.equal(service.goals[0].records.length, 0);
    });

    test('with records', function(assert) {
      let records = [
        { date: '2019-04-22', value: 1 },
        { date: '2019-04-21', value: 2 },
        { date: '2019-04-20', value: 3 },
      ];
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      service.create('test', 'amount-integer', records);
      assert.equal(service.goals.length, 1);
      assert.equal(service.goals[0].name, 'test');
      assert.equal(service.goals[0].type, 'amount-integer');
      assert.deepEqual(service.goals[0].records, records);
      assert.equal(service.goals[0].records.length, 3);
    });

    test('with id', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      service.create('test', 'amount-integer', [], 'test-id-123');
      assert.equal(service.goals.length, 1);
      assert.equal(service.goals[0].id, 'test-id-123');
      assert.equal(service.goals[0].name, 'test');
      assert.equal(service.goals[0].type, 'amount-integer');
      assert.equal(service.goals[0].records.length, 0);
    });

    test('persists to localStorage', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      let goal = service.create('test', 'amount-integer');
      assert.equal(service.goals.length, 1);
      let lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals.value[0], goal);
    });
  });

  module ('@action save', function() {
    test('new goal', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      service.save(newGoal);
      assert.equal(service.goals.length, 1);
      assert.deepEqual(service.goals[0], newGoal);
    });

    test('existing goal', function(assert){
      let service = this.owner.lookup('service:goals');
      service.create('one', 'amount-boolean', [], '123');
      service.create('two', 'amount-boolean', '456');
      assert.equal(service.goals.length, 2);
      service.save({
        id: '456',
        name: 'twooooo',
        type: 'amount-integer',
        records: [{ date: 'fake', value: true }]
      });
      assert.equal(service.goals[0].id, '456');
      assert.equal(service.goals[0].name, 'twooooo');
      assert.equal(service.goals[0].type, 'amount-integer');
      assert.deepEqual(service.goals[0].records, [{ date: 'fake', value: true }]);
    });

    test('persists to local storage', function(assert){
      let service = this.owner.lookup('service:goals');
      assert.equal(service.goals.length, 0);
      service.save(newGoal);
      assert.equal(service.goals.length, 1);
      assert.deepEqual(service.goals[0], newGoal)
      let lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals, {
        "value": [
          {
            "id": "test",
            "name": "wow",
            "records": [],
            "type": "amount-integer"
          }
        ]
      });
    });
  });

  module ('@action delete', function() {
    test('it works with a goal not in storage', function(assert) {
      let service = this.owner.lookup('service:goals');
      service.save(newGoal);
      assert.equal(service.goals.length, 1);
      service.delete({ id: '123' });
      assert.equal(service.goals.length, 1);
    });

    test('it works with a goal in storage', function(assert){
      let service = this.owner.lookup('service:goals');
      service.save(newGoal);
      assert.equal(service.goals.length, 1);
      service.delete({ id: newGoal.id });
      assert.equal(service.goals.length, 0);
    });

    test('persists to local storage', function(assert){
      let service = this.owner.lookup('service:goals');
      service.save(newGoal);
      service.save(Object.assign({}, newGoal, { id: 'test2' }));
      assert.equal(service.goals.length, 2);

      let lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals, {
        "value": [
          {
            "id": "test2",
            "name": "wow",
            "records": [],
            "type": "amount-integer"
          },
          {
            "id": "test",
            "name": "wow",
            "records": [],
            "type": "amount-integer"
          }
        ]
      });

      service.delete({ id: 'test2' });
      assert.equal(service.goals.length, 1);
      assert.deepEqual(service.goals[0], newGoal)
      lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals, {
        "value": [
          {
            "id": "test",
            "name": "wow",
            "records": [],
            "type": "amount-integer"
          }
        ]
      });
    });
  });

  module ('@action saveRecord', function() {
    test('nonexistant goal', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.notOk(service.saveRecord(null, '', 1));
    });

    test('new record', function(assert){
      let service = this.owner.lookup('service:goals');
      service.saveRecord(JSON.parse(JSON.stringify(newGoal)), '2019-04-22', 1);
      assert.equal(service.goals.length, 1);
      assert.equal(service.goals[0].records.length, 1);
      assert.equal(service.goals[0].records[0].date, '2019-04-22');
      assert.equal(service.goals[0].records[0].value, 1);
    });

    test('existing record', function(assert){
      let service = this.owner.lookup('service:goals');
      service.saveRecord(Object.assign({}, newGoal, { records: [{date: '2019-04-22', value: 1}] }), '2019-04-22', 22);
      assert.equal(service.goals.length, 1);
      assert.equal(service.goals[0].records.length, 1);
      assert.equal(service.goals[0].records[0].date, '2019-04-22');
      assert.equal(service.goals[0].records[0].value, 22);
    });

    test('persists to local storage', function(assert){
      let service = this.owner.lookup('service:goals');
      service.saveRecord(JSON.parse(JSON.stringify(newGoal)), '2019-04-22', 1);
      let lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals, {
        "value": [
          {
            "id": "test",
            "name": "wow",
            "records": [
              {
                "date": "2019-04-22",
                "value": 1
              }
            ],
            "type": "amount-integer"
          }
        ]
      });

      service.saveRecord(service.goals[0], '2019-04-22', 22);
      lsGoals = JSON.parse(localStorage.getItem('GoalsService-goals'));
      assert.deepEqual(lsGoals, {
        "value": [
          {
            "id": "test",
            "name": "wow",
            "records": [
              {
                "date": "2019-04-22",
                "value": 22
              }
            ],
            "type": "amount-integer"
          }
        ]
      });
    });
  });

  module ('@action computeStreak', function() {
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    const yesteryesterday = moment().subtract(2, 'days').format('YYYY-MM-DD');

    test('missing records', function(assert) {
      let service = this.owner.lookup('service:goals');
      assert.equal(service.computeStreak(), 0);
      assert.equal(service.computeStreak({ records: [] }), 0);
    });

    test('no streak 2 days ago', function(assert){
      let service = this.owner.lookup('service:goals');

      let records = [
        { date: yesteryesterday, value: 1 },
        { date: moment(yesteryesterday).subtract(1, 'days').format('YYYY-MM-DD'), value: 1 }
      ];

      assert.equal(service.computeStreak({ records }), 0);
    });

    test('streak 1 day ago', function(assert){
      let service = this.owner.lookup('service:goals');

      let records = [
        { date: yesterday, value: 1 },
        { date: yesteryesterday, value: 2 }
      ];

      assert.equal(service.computeStreak({ records }), 2);
    });

    test('streak including today', function(assert){
      let service = this.owner.lookup('service:goals');

      let records = [
        { date: today, value: 1 },
        { date: yesterday, value: 1 },
        { date: yesteryesterday, value: 2 }
      ];

      assert.equal(service.computeStreak({ records }), 3);
    });

    test('future is ignored', function(assert){
      let service = this.owner.lookup('service:goals');

      let records = [
        { date: tomorrow, value: 1 },
        { date: today, value: 1 },
        { date: yesterday, value: 1 },
        { date: yesteryesterday, value: 2 }
      ];

      assert.equal(service.computeStreak({ records }), 3);
    });
  });
});
