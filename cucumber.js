module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/features/"   
        ],
        dryRun: false,
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts" 
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2,
        retry: 1
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/pages/*.ts",
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts" 
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}