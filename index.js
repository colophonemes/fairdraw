const Promise = require('bluebird')
const needle = Promise.promisifyAll(require('needle'))
const BigNumber = require('bignumber.js')
const inquirer = require('inquirer')
const NIST_BEACON_URL = 'https://beacon.nist.gov/rest/record/last'
const ordinal = require('ordinal').english

const questions = [
  {
    type: 'input',
    name: 'names',
    message: 'Enter the names of all participants, separated by commas',
    filter: answer => answer.split(',').map(name => name.trim())
  }
]

inquirer.prompt(questions)
  .then(answers => {
    const participants = answers.names
    if(participants.length > 10) {
      throw new Error('Cannot handle more than 10 people!')
    }


    return needle.getAsync(NIST_BEACON_URL)
      .then(res => {
        const rand = new BigNumber(res.body.record.outputValue, 16).toString(10).split('')
        const positions = participants.map((participant, index) => (
          {
            name: participant,
            position: rand.indexOf(index.toString(10))
          }
        ))
        positions.sort((a,b) => a.position > b.position)
        console.log(positions.map((position, index) => `${position.name} is ${ordinal(index + 1)}`).join('\n'))
      })
      .catch(err => {
        console.error(err)
      })
  })

