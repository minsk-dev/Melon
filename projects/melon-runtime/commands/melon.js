#! /usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)

console.log("Executing MelonJS with args: " + args)

const dotnetArguments = ['run', '--configuration', 'Release', '--project']
const projectDirectory = __dirname.replace('commands', '/MelonJS/MelonJS.csproj')
const spawnOptions = { stdio: "inherit" }

const melon = spawn('dotnet', [...dotnetArguments, projectDirectory, ...args], spawnOptions)

melon.stdout.on('data', console.log)
melon.stderr.on('data', console.log)
melon.on('exit', console.log)