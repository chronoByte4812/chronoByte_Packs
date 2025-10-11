import { commandBuild } from "./scripts/core/classes/commandBuilder.js";
import { Database } from "./scripts/core/classes/databaseBuilder.js";

/**
 * Adding a module to the global variables
 */
const module = {
    name: '',
    description: '',
    moduleId: '',
    toggleValues: [
        '§cOff',
        '§aOn'
    ]
};

/**
 * Add a new command to the world
 */
commandBuild.register(
    {
        name: '',
        description: '',
        for_staff: false,
        usage: [
            '',
        ],
        examples: [
            '',
        ]
    },
    (data, args) => { },
    (data, args) => { }
);

/**
 * Using the newly added {module}
 * All must have the 'module:' prefix if interacting with modules
 */
if (Database.get(`module:${module.moduleId}`) === 0)
    return // some message saying the module is offline...

/**
 * Setting and getting a {Database} key's value
 */
Database.set('something', 123);
Database.get('something');