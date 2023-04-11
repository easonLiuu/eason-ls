#!/usr/bin/env node

const parse = require('./parseArgs')
const { isAll, isList, args } = parse()

console.log(process.argv, args, isAll, isList)