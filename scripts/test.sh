npm run clean &&
npm run build &&
mocha --require ts-node/register "src/tests" --config .mocharc.js --require source-map-support/register