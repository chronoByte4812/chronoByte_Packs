import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { commandBuild } from '../../core/classes/commandBuilder.js';
import { Database } from '../../core/classes/databaseBuilder.js';
import { config } from '../../core/config.js';
import { world } from '@minecraft/server';

/**
 * @typedef {Object} Module
 * @property {string} name - The title name that will be displayed when referencing it
 * @property {string} description - THe description of the module
 * @property {Array<String>} toggleValues - The state options of the module
 * @property {string} moduleId - The global is that is used by the Database
 */

/**
 * @type {Module[]} - A place to store all general modules
 */
export const generalModules = [
    {
        name: 'Test Toggle 1',
        description: 'A test description of a generic module toggle',
        moduleId: 'testToggle1',
        toggleValues: [
            '§cOff',
            '§aOn'
        ],
    },
    {
        name: 'Test Dropdown 1',
        description: 'A test description of a generic module dropdown',
        moduleId: 'TestDropdown1',
        toggleValues: [
            '§cOff',
            'V1',
            'V2'
        ],
    }
];

/**
 * Set module(s) to another value
 * @param {Player} sender
 * @param {Module} module
 * @param {Number} newValue
 */
function setModule(sender, module, newValue) {
    try {
        const oldValue = Database.get(`module:${module.moduleId}`);
        if (config.debugMode === true) {
            console.warn(`${module.name}, newValue: ${newValue}, oldValue: ${oldValue}`);
        };

        if (oldValue !== newValue) {
            world.sendMessage(`${sender.name} has set the module ${module.name} to ${module.toggleValues[newValue]}`);
            Database.set(`module:${module.moduleId}`, newValue);
        };
    } catch (error) {
        if (config.debugMode === true)
            console.error(`An error occurred while setting modules: ${error}\n${error.stack}`);
    };
};

export const gui = {
    staff: {
        /**
         * - The main staff UI
         * @param {import('@minecraft/server').Player} sender 
         */
        main: (sender) => {
            const guiMainStaff = new ActionFormData()
            let text = [];

            guiMainStaff.title('Main staff GUI');

            text.push('A');

            guiMainStaff.body(text.join('\n§r'));
            guiMainStaff.button('Modules');
            guiMainStaff.show(sender).then((result) => {
                if (result.canceled) return;

                if (result.selection === 0)
                    return gui.staff.modulesSelector(sender);
            });
        },

        /**
         * - The modules type selection UI
         * @param {import('@minecraft/server').Player} sender 
         */
        modulesSelector: (sender) => {
            const guiMainStaff = new ActionFormData()
            let text = [];

            guiMainStaff.title('Modules selectro GUI');

            text.push('A');

            guiMainStaff.body(text.join('\n§r'));
            guiMainStaff.button('General');
            guiMainStaff.show(sender).then((result) => {
                if (result.canceled) return;

                if (result.selection === 0)
                    return gui.staff.generalModules(sender);
            });
        },

        /**
         * - The general modules UI
         * @param {import('@minecraft/server').Player} sender
         */
        generalModules: (sender) => {
            const guiModules = new ModalFormData();

            guiModules.title('General Modules');

            for (const module of generalModules) {
                module.toggleValues.length === 2 ?
                    guiModules.toggle(module.name, { tooltip: module.description, defaultValue: Boolean(Database.get(`module:${module.moduleId}`)) }) :
                    guiModules.dropdown(module.name, module.toggleValues, { tooltip: module.description, defaultValueIndex: Database.get(`module:${module.moduleId}`) })
            };

            guiModules.show(sender).then((result) => {
                if (result.canceled === true) return gui.staff.main(sender);

                for (let i = 0; i < generalModules.length; i++) {
                    const currentModule = generalModules[i];

                    setModule(sender, currentModule, Number(result.formValues[i]));
                }; gui.staff.main(sender);
            });
        }
    },

    player: {
        /**
         * - The main player UI
         * @param {import('@minecraft/server').Player} sender 
         */
        main: (sender) => {
            const guiMainPlayer = new ActionFormData()
            let text = [];

            guiMainPlayer.title('Main player GUI');

            text.push('A');

            guiMainPlayer.body(text.join('\n§r'));
            guiMainPlayer.button('Test broken button');
            guiMainPlayer.show(sender).then((result) => {
                if (result.canceled) return;

                if (result.selection === 0)
                    return gui.player.main(sender);
            });
        },

        /**
         * - The player self modules UI
         * @param {import('@minecraft/server').Player} sender 
         */
        modules: (sender) => {
            const guiModules = new ModalFormData();

            guiModules.title('General Modules');

            for (const module of generalModules) {
                module.toggleValues.length === 2 ?
                    guiModules.toggle(module.name, { tooltip: module.description, defaultValue: Boolean(Database.get(`module:${module.moduleId}`)) }) :
                    guiModules.dropdown(module.name, module.toggleValues, { tooltip: module.description, defaultValueIndex: Boolean(Database.get(`module:${module.moduleId}`)) })
            };

            guiModules.show(sender).then((result) => {
                if (result.canceled === true) return gui.staff.main(sender);

                for (let i = 0; i < generalModules.length; i++) {
                    const currentModule = generalModules[i];

                    setModule(sender, currentModule, Number(result.formValues[i]));
                }; gui.player.main(sender);
            });
        }
    }
};

commandBuild.register(
    {
        name: 'gui',
        description: 'Graphical user interface',
        for_staff: false,
        usage: [
            'gui <players gui: any>',
            'ui <players gui: any>',
        ],
        aliases: [
            'ui'
        ],
        examples: [
            'gui ghjvde',
            'ui hewebb'
        ]
    },
    (data, args) => {
        const sender = data.sender;

        if (args[1]) sender.sendMessage('Hey you used a 2nd argument, cool!');

        sender.sendMessage('§aMove to show the UI!');
    },
    (data, args) => {
        const sender = data.sender;
        const isStaff = sender.hasTag(config.staffTag);

        // Potential command toggle feature later.

        // if (Database.get(`module:icm`)) return sender.sendMessage(`Commands are disabled currently!`);

        if (sender.hasTag('welcome'))
            return gui.welcome.main(sender);
        else if (isStaff && !args[0])
            return gui.staff.main(sender);
        else
            return gui.player.main(sender);
    }
);