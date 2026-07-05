module.exports = {
  default: {
    timeout: 60000,
    require: ['features/step_definitions/**/*.js','features/support/**/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html']
  }
};