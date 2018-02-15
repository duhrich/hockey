# Devin Uhrich submission for ATB Hockey Squad Coding Exercise
Here are a few notes about my submission.
- Written in React (using create-react-app)
- I've published it at <http://app.electrollama.net/hockey>
- I used Jest/Enzyme for unit and UI testing
- Rather than import a graphing framework, the stats are just rendered with a div and styled appropriately
- The algorithm for balancing teams is certainly not optimal.  It randomly generates 100 sets of teams and evaluates their "balance factor".  The "balance factor" is essentially the average of the highest skill differential across all the skill types.  It picks the randomly generated set with the lowest balance factor and displays it.
- I did generate a larger json data set with 400 players and it worked well, although because of the clumsy algorithm, it can get slow with larger numbers of teams.
- 6 players per team are assumed, but it's easily changed in the TeamBuilder module
- Should drop from 2 to 1 columns for small (e.g. mobile) screens
- Logo was labeled as free for commercial use, so I believe I'm ok using it
- If you clone it, you should be able to install dependencies by running 'yarn'
- 'yarn test' will run the test suite (it's interactive, you may have to press 'a' to re-run the tests)
- 'yarn start' will run it on a test server
- 'yarn build' will create a production build (this is what is deployed on my server)