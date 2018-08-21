// flow
const { EventEmitter } = require('events');

class Recorder extends EventEmitter {
    constructor(media, opts) {
        super();
        const self = this;
        if (!opts) opts = {};
        this._opts = opts;
        this._media = media;
        this._recorder = new MediaRecorder(media, opts);
        this._recorder.ondataavailable = e => {
            this._onData(e.data);
        };
    }
    start() {
        this._recorder.start(this._opts.interval);
    }
    stop() {
        this._recorder.stop();
    }
    _onData(chunk) {
        this.emit(this.constructor.DATA, chunk);
    }
    release() {
        this.removeAllListeners();
        this._media = null;
        this._recorder = null;
    }
}
Recorder.DATA = 'data';
module.exports = Recorder;
