#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program.description('Compares two configuration files and shows a difference.').version('0.8.0');

program.parse();