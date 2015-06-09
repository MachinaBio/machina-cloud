if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){

    describe('Server initialization', function() {
      it('should have a Meteor version defined', function(){
        chai.assert(Meteor.release);
      });

      it('should have a collection of devices', function () {
        chai.assert(AquinoDevices);
      });

      it('should have a collection of subscribers', function () {
        chai.assert(Subscribers);
      });

    });

    describe('The collection of devices', function () {

      it('should be able to add a new device reporting in', function () {
        var SERIAL = 'test_serial';
        var VERSIONS = {};
        var JOBS = {};
        var DEVICES = {};

        console.error(AquinoDevices.find().fetch());
        var results = Meteor.call(
          'deviceReport',
          SERIAL,
          VERSIONS,
          JOBS,
          DEVICES
        );
        var device = AquinoDevices.findOne(SERIAL);
        console.error(results);

        chai.assert(device);

        //AquinoDevices.remove(SERIAL);
      });

      it('should be able to update status', function () {
        var SERIAL = 'test_serial';
        var STATUS = 'Test Status';

        //AquinoDevices.insert({_id: SERIAL});

        //var device = Meteor.call('deviceStatus', SERIAL, STATUS);

        //console.error(device);
      });
    });
  });
}
