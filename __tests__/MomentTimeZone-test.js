import 'react-native';
import React from 'react';
import MomentTimeZone from '../app/utils/MomentTimeZone';
import moment from 'moment-timezone';

jest.mock('react-native-localize', () => {
  return {
    getLocales: jest.fn(),
    // you can add other functions mock here that you are using
  };
});

const NAME_TEST = 'MomentTimeZoneTest';

test(NAME_TEST + '.Phoenix/Arizona_H24', () => {
  let city = 'Phoenix';
  let country = 'America';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, true);
  let expected = moment.tz(`${country}/${city}`).format('HH:mm'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + '.Rome/Europe_H24', () => {
  let city = 'Rome';
  let country = 'Europe';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, true);
  let expected = moment.tz(`${country}/${city}`).format('HH:mm'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + '.Phoenix/Arizona_H24_capitalize', () => {
  let city = 'phoenix';
  let country = 'america';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, true);
  let expected = moment.tz(`${country}/${city}`).format('HH:mm'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + '.Rome/Europe_H24_capitalize', () => {
  let city = 'rome';
  let country = 'europe';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, true);
  let expected = moment.tz(`${country}/${city}`).format('HH:mm'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + '.Phoenix/Arizona_AMPM', () => {
  let city = 'Phoenix';
  let country = 'America';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, false);
  let expected = moment.tz(`${country}/${city}`).format('h:mm A'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + '.Rome/Europe_AMPM', () => {
  let city = 'Rome';
  let country = 'Europe';
  let result = MomentTimeZone.timeZoneWithCityAnCountry(city, country, false);
  let expected = moment.tz(`${country}/${city}`).format('h:mm A'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + 'OnlyCountryTurkey_H24', () => {
  let country = 'Turkey';
  let result = MomentTimeZone.timeZoneWithCountry(country, true);
  let expected = moment.tz(`${country}`).format('HH:mm'); //24h format
  expect(result).toBe(expected);
});

test(NAME_TEST + 'OnlyCountryTurkey_AMPM', () => {
  let country = 'Turkey';
  let result = MomentTimeZone.timeZoneWithCountry(country, false);
  let expected = moment.tz(`${country}`).format('h:mm A'); //12 format
  expect(result).toBe(expected);
});

//timeZoneWithFormat
test(NAME_TEST + 'WithStringFormatQueryRomeEur_H24', () => {
  let format = 'Europe/Rome';
  let result = MomentTimeZone.timeZoneWithFormat(format, true);
  let expected = moment.tz('Europe/Rome').format('HH:mm'); //24h forma
  expect(result).toBe(expected);
});

test(NAME_TEST + 'WithStringFormatQueryPhoenixAmerica_H24', () => {
  let format = 'America/Phoenix';
  let result = MomentTimeZone.timeZoneWithFormat(format, true);
  let expected = moment.tz('America/Phoenix').format('HH:mm'); //24h forma
  expect(result).toBe(expected);
});

test(NAME_TEST + 'invalidZoneFormat', () => {
  let format = 'Phoenix/America';
  try {
    MomentTimeZone.timeZoneWithFormat(format, true);
    expect(1).toBe(0);
  } catch (e) {
    expect(1).toBe(1);
  }
});
