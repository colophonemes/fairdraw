# Fairdraw

Node.js command-line tool for determining a fair ordering of participants. Use as an overengineered way to drawing lots/short straws.

Uses the [NIST Randomness beacon](https://beacon.nist.gov/home) (refreshed every minute) for maximum fairness to ensure nobody gets mad about someone gaming the system.

## Installation and Usage

```sh
git clone https://github.com/colophonemes/fairdraw && cd fairdraw
node index
```

Then, at the prompt, enter a comma separated list of names:

```
? Enter the names of all participants, separated by commas Sam, Tara, Will
```

Be amazed at your results!

```
Tara is 1st
Will is 2nd
Sam is 3rd
```

## License

ISC / WTFPL