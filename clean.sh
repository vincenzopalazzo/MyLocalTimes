#!/bin/bash

watchman watch-del-all
rm -rf node_modules
npm install
npx react-native start --reset-cache
rm -rf /tmp/metro-*
