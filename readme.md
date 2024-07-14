    **Get Started**
**Setup**:
1. Clone or download the project
2. Extract and open in the VS-Code/Intelij
3. npm i to install the dependencies
4. npx playwright install to install the browsers
5. npm run test to execute the tests
6. To run a particular test change
  paths: [
            "src/test/features/featurename.feature"
         ] 
7. Use tags to run a specific or collection of specs
npm run test --TAGS="@test or @add"

**Features**: 
1. Cucumber html report integrated
2. Parallel execution also added
3. Rerun only failed features
4. Page Object model added only for login page
5. Also workflow file added for githubaction.# playwright-typescript
