/* global process */

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { check } from './commands/check.js'
import { sync } from './commands/sync.js'

yargs(hideBin(process.argv))
	.command(
		'check',
		'Check translations',
		(yargs2) =>
			yargs2
				.option('failOnEmpty', {
					type: 'boolean',
					default: false,
					description: 'Fail on empty translation'
				})
				.option('failOnMissing', {
					type: 'boolean',
					default: true,
					description: 'Fail on missing translation'
				})
				.option('failOnRedundant', {
					type: 'boolean',
					default: false,
					description: 'Fail on redundant translation'
				}),
		check
	)
	.command('sync', 'Sync translations', () => {}, sync)
	.demandCommand(1)
	.parse()
