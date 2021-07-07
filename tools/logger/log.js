#!/usr/bin/env node
const fs = require('fs')

fs.appendFileSync('/mnt/data/recordings/test.log', JSON.stringify([
  Date.now(),
  ...process.argv.slice(2)
]) + '\n')