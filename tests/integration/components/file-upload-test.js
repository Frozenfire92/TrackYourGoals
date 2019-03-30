import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file-upload', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with no parameters', async function(assert) {

    /*
      <FileUpload
        @change={{this.importData}}
        accept=".json"
      />
    */

    await render(hbs`<FileUpload />`);
    let inputDom = assert.dom('input');
    inputDom.hasAttribute('type', 'file');
    inputDom.doesNotHaveAttribute('accept');
  });

  test('it renders with accept', async function(assert) {
    await render(hbs`
      <FileUpload
        accept=".json"
      />
    `);

    let inputDom = assert.dom('input');
    inputDom.hasAttribute('type', 'file');
    inputDom.hasAttribute('accept', '.json');
  });

  test('it handles upload', async function(assert) {
    assert.expect(1);

    this.set('onchange', (_name, result) => {
      assert.equal(result, 'My text based file');
    });

    await render(hbs`
      <FileUpload
        @change={{this.onchange}}
      />
    `);

    await triggerEvent('input', 'change', [ new Blob(['My text based file']) ]);
  });
});
