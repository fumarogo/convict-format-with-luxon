import { DateTime } from 'luxon';
import { expect } from 'chai';
import convict from 'convict';
import convict_format_with_luxon from '../src/main';

describe('convict-format-with-luxon', function () {
    let conf: convict.Config<{
        foo: {
            date: string;
            duration: number;
            duration2: string;
            duration3: string;
            duration4: string;
            duration5: string;
        };
    }>;

    before('must add "duration" and "timestamp" format with convict-format-with-luxon', function () {
        convict.addFormats(convict_format_with_luxon);

        conf = convict({
            foo: {
                date: {
                    format: 'timestamp',
                    default: '2013-05-05'
                },
                duration: {
                    format: 'duration',
                    default: 604800000
                },
                duration2: {
                    format: 'duration',
                    default: '5 minutes'
                },
                duration3: {
                    format: 'duration',
                    default: '12345'
                },
                duration4: {
                    format: 'duration',
                    default: '12345'
                },
                duration5: {
                    format: 'duration',
                    default: '12345'
                }
            }
        });
    });

    describe('convict formats', function () {
        it('must validate default schema', function () {
            expect(function () {
                conf.validate();
            }).not.to.throw();
        });

        it('must not validate incorrect values', function () {
            conf.set('foo.duration4', '-7 days');
            expect(function () {
                conf.validate();
            }).to.throw(/must be a positive integer or human readable string/);

            conf.set('foo.duration5', 'zz-7zzdays');
            expect(function () {
                conf.validate();
            }).to.throw(/must be a positive integer or human readable string/);
        });
    });

    describe('predefined formats', function () {
        it('must handle timestamp', function () {
            const val = conf.get('foo.date');
            expect(val).to.equal(DateTime.fromISO('2013-05-05').valueOf());
        });

        it('must handle duration in milliseconds', function () {
            expect(conf.get('foo.duration')).to.equal(604800000);
        });

        it('must handle duration in a human readable string', function () {
            expect(conf.get('foo.duration2')).to.equal(60 * 5 * 1000);
        });

        it('must handle duration in milliseconds as a string', function () {
            expect(conf.get('foo.duration3')).to.equal(12345);
        });
    });
});
