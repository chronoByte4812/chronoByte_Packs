/**
 * A class to manage server commands
 * 
 * Created on Saturday, 21 June 2025, 5:04 PM
 * Edited on Thursday, 2 October, 8:17 PM
 */
class commandBuilder {
    constructor() {
        /**
         * @type {command[]}
         * @typedef {Object} command - The commands info
         * @property {string} name - Name of the command
         * @property {string} description - Description of the command
         * @property {string} usage - Usage template of the command
         * @property {Array<string>} aliases - Like 2nd names of the command
         * @property {Array<string>} examples - Examples on how to use the command
         * @property {boolean} for_staff - Indicates weather the command is designed for staff only
         * @property {(data: import('@minecraft/server').ChatSendBeforeEvent, args: string[]) => void} callback - Function to be executed upon being called
         * @property {(data: import('@minecraft/server').ChatSendBeforeEvent, args: string[]) => void} callbackWM - Function to be executed after player movement
         */
        this.commands = [];
    };

    /**
     * register a new command to be registered
     * @param {Object} info - The commands info
     * @param {string} [info.name] - Name of the command
     * @param {string} [info.description] - Description of the command
     * @param {Array<string>} [info.usage] - Usage template of the command
     * @param {Array<string>} [info.aliases] - Like 2nd names of the command
     * @param {Array<string>} [info.examples] - Examples on how to use the command
     * @param {boolean} [info.for_staff=false] - Indicates if the command is designed for staff only
     * @param {(data: import('@minecraft/server').ChatSendBeforeEvent, args: string[]) => void} callback - The code that will be run immediately
     * @param {(data: import('@minecraft/server').ChatSendBeforeEvent, args: string[]) => void} callbackWM - The code that will be run after player movement
     */
    register(info, callback, callbackWM) {
        this.commands.push(
            {
                name: info.name.split(' ')[0],
                description: info.description || '',
                usage: info.usage || [],
                aliases: info.aliases || [],
                examples: info.examples || [],
                for_staff: info.for_staff || false,
                callback: callback || (() => console.warn(`Command ${info.name} is missing it's callback function!`)),
                callbackWM: callbackWM || (() => { })
            }
        );
    };

    /**
     * Get a list of commands registered
     * @param {Boolean} getStaff - Indicates weather to get all staff commands
     */
    getAllCommands(getStaff) {
        if (getStaff === true) {
            return this.commands.filter((cmd) => cmd.for_staff === true);
        } else if (getStaff === false) {
            return this.commands.filter((cmd) => cmd.for_staff === false);
        } else {
            return this.commands;
        };
    };


    /**
     * Get a specific command object
     * @param {String} cmdName - Name of the command
     */
    getCommand(cmdName) {
        if (!cmdName) return console.warn('getCommand() parameter cmdName was not parsed');

        const cmds = this.commands.find((cmd) => (cmd.name === cmdName || cmd.aliases.some((aliase) => cmdName === aliase)));

        return cmds;
    };
};

/**
 * @example
 * commandBuild.register(
    {
        name: 'test',
        description: 'Example command',
        for_staff: false,
        usage: [
            'test',
        ],
        examples: [
            'test',
        ]
    },
    (data, args) => { },
    (data, args) => { }
);
 */
export const commandBuild = new commandBuilder();