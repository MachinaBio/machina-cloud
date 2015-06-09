Template.device_controls.helpers({

  serial_number: function () {
    return this._id;
  },

  last_temperature_setpoint: function () {
    var temperature = this.controls.Temperature.Setpoints.length ?
      this.controls.Temperature.Setpoints[this.controls.Temperature.Setpoints.length - 1].value :
      'None'
    ;

    var index = this.controls.Temperature.Setpoints.length - 1;

    var unit = temperature !== 'None' ?
      '°' + this.controls.Temperature.Setpoints[index].unit.toUpperCase() :
      ''
    ;

    return temperature + unit;

  },

  last_temperature_set_time: function () {
    var date = this.controls.Temperature.Setpoints.length ?
      this.controls.Temperature.Setpoints[this.controls.Temperature.Setpoints.length - 1].date :
      'None'
    ;

    date = date !== 'None' ? new Date(date).toLocaleString() : 'None';
    return date;
  },

  last_temperature_reading: function () {
    return this.controls.Temperature.Readings.length ?
      this.controls.Temperature.Readings[this.controls.Temperature.Setpoints.length - 1].value :
      'None'
    ;
  },

  last_temperature_read_time: function () {
    var date = this.controls.Temperature.Readings.length ?
      this.controls.Temperature.Readings[this.controls.Temperature.Setpoints.length - 1].date :
      'None'
    ;

    date = date !== 'None' ? new Date(date).toLocaleString() : 'None';
    return date;
  }

});

Template.device_controls.events({

  'submit .temperature-control': function (event, element) {
    event.preventDefault();

    var $input = $(event.target).children('.set-new-setpoint');
    var setpoint = $input.val();
    var unit = 'f'; //TODO: Add support for different units

    var record = {
      date: Date.now(),
      value: setpoint,
      unit: unit
    };

    AquinoDevices.update({_id: this._id}, {
      $push: {
        "controls.Temperature.Setpoints": record
      }
    });
  }
})
