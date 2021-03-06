import {Transform} from 'stream';
import {EOL as newline} from 'os';
import formatter from './../utils/formatter';

/**
 * Log service results to the console
 */
class ConsoleLogger extends Transform {
  constructor(options) {
    super(options);
    this.data = {
      projects: 0,
      occurrences: 0
    };
  }

  _transform(results, encoding, done) {
    this.data.projects++;
    this.data.occurrences += results.count;

    console.log(formatter(results));
    this.push(results);

    done();
  }

  _flush(done) {
    const message = `${this.data.occurrences} occurrences found in ${this.data.projects} projects`;

    process.stdout.write(newline + message + newline);
    this.push(message);

    done();
  }
}

export default ConsoleLogger;
