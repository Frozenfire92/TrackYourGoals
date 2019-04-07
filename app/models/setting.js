import DS from 'ember-data';
const { Model, attr } = DS;

export default class SettingsModel extends Model {
  @attr('string', { defaultValue: 'interpolateGreens' }) visualizationColorScheme;
  @attr('string', { defaultValue: 'light' }) appColorScheme;
}
