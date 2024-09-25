/* global console */
/* eslint-disable no-console */

import os from 'os'
import chalk from 'chalk'

export const log = (value, color) => {
	console.log(chalk.hex(color)(value))
}

export const group = (title, func) => {
	console.log(chalk.blue(title))
	console.group()
	func()
	console.groupEnd()
	console.log(os.EOL)
}
