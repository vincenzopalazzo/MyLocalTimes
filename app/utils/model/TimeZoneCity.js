import Util from '../Util';

const LOG_TAG = new Date().toISOString() + ' ' + 'TimeZoneCity.js ';

class TimeZoneCity {
  constructor(timeZoneCity) {
    if (timeZoneCity instanceof Object) {
      this.nameCity = timeZoneCity.city;
      this.countryName = timeZoneCity.country;
      this.time = timeZoneCity.time;
      this.id = timeZoneCity.id;
      if (!this.id) {
        this.id = Math.random() * 100000 | 0;
      }
    }
  }

  getTime = () => this.time;

  setTime = time => (this.time = time);

  static fromJsonToClass(jsonValue) {
    if (!jsonValue) {
      throw new Error(
        `ERROR inside method fromJsonToClass: JSON value equal to ${jsonValue}`,
      );
    }
    console.debug(
      LOG_TAG,
      `JSON before create class in method fromJsonToClass ${jsonValue}`,
    );
    return new TimeZoneCity({
      id: jsonValue.id,
      city: jsonValue.nameCity,
      country: jsonValue.countryName,
      time: jsonValue.time,
    });
  }

  toString() {
    console.debug(
      LOG_TAG,
      `toString in TimeZoneCity with nameCity: ${
        this.nameCity
      } and countryName ${this.countryName}`,
    );
    if (!this.nameCity) {
      return Util.doCapitalizeString(this.countryName);
    }
    this.nameCity = Util.doCapitalizeString(this.nameCity);
    this.countryName = Util.doCapitalizeString(this.countryName);
    return `${this.countryName}/${this.nameCity}`;
  }
}

export default TimeZoneCity;
