import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { commandBuild } from '../../core/classes/commandBuilder.js';
import { Database } from '../../core/classes/databaseBuilder.js';
import { config } from '../../core/config.js';
import { world } from '@minecraft/server';
import { serverBuild } from '../../core/classes/serverBuilder.js';

/**
 * @typedef {Object} Module
 * @property {string} name - The title name that will be displayed when referencing it
 * @property {string} description - The description of the module
 * @property {string[]} toggleValues - The state options of the module
 * @property {string} moduleId - The global ID that is used by the Database
 */

/**
 * @type {Module[]} - A place to store all general modules
 * @example
 * {
        name: '',
        description: '',
        moduleId: '',
        toggleValues: [
            '§cOff',
            '§aOn'
        ]
    },
 */
export const generalModules = [
    {
        name: 'Player commands',
        description: 'Allow players to use commands in the world',
        moduleId: 'icmtoggle',
        toggleValues: [
            '§cOff',
            '§aOn'
        ]
    },
    {
        name: 'Test Dropdown 1',
        description: 'A test description of a generic module dropdown',
        moduleId: 'testdropdown1',
        toggleValues: [
            '§cOff',
            'V1',
            'V2'
        ]
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

/**
 * Set player's status to another value
 * @param {Player} player
 * @param {Player} target
 * @param {String} tag
 * @param {Boolean} newValue
 */
function setPlayerStatus(sender, target, tag, newValue) {
    try {
        const oldValue = target.hasTag(tag);

        if (config.debugMode === true) {
            console.warn(`Tag: ${tag}, newValue: ${newValue}, oldValue: ${oldValue}`);
        };

        if (oldValue !== newValue) {
            world.sendMessage(`${sender.name} has set ${target.nameTag}'s ${tag} to ${newValue}`);
            newValue === true ? target.addTag(tag) : target.removeTag(tag);
        };
    } catch (error) {
        if (config.debugMode === true)
            console.error(`An error occurred while setting player status: ${error}\n${error.stack}`);
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
            guiMainStaff.button('Status Manager');
            guiMainStaff.show(sender).then((result) => {
                if (result.canceled) return;

                if (result.selection === 0)
                    return gui.staff.modulesSelector(sender);
                else if (result.selection === 1)
                    return gui.staff.statusManagerSelector(sender);
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
         * - The player selection UI for status manager
         * @param {import('@minecraft/server').Player} sender
         */
        statusManagerSelector: (sender) => {
            const statusManagerSelector = new ModalFormData();
            const allPlayers = world.getPlayers();

            statusManagerSelector.title('Status Manager');
            statusManagerSelector.dropdown('Select a target:', [...allPlayers.map((plr) => plr.name)], { defaultValueIndex: 0, tooltip: '' })
            statusManagerSelector.show(sender).then((result) => {
                if (result.canceled) return;

                const target = allPlayers[Number(result.formValues[0])];

                gui.staff.statusManager(sender, target);
            });
        },

        /**
         * - The status manager UI
         * @param {import('@minecraft/server').Player} sender
         * @param {import('@minecraft/server').Player} target
         */
        statusManager: (sender, target) => { // Make toggles dynamically generated with Array<Object> similar to generalModules later.
            const statusManager = new ModalFormData();
            const targetIsStaff = target.hasTag(config.staffTag);
            const targetIsDev = target.hasTag(config.devTag);

            statusManager.title('Status Manager Selector');
            statusManager.toggle('Staff status', { defaultValue: targetIsStaff, tooltip: 'Is the target a staff member?' });
            statusManager.toggle('Dev status', { defaultValue: targetIsDev, tooltip: 'Is the target a dev?' });
            statusManager.show(sender).then((result) => {
                if (result.canceled) return;

                setPlayerStatus(sender, target, 'staffstatus', Boolean(result.formValues[0]));
                setPlayerStatus(sender, target, 'devstatus', Boolean(result.formValues[1]));
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

                    setModule(sender, currentModule, result.formValues[i]);
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
                    guiModules.dropdown(module.name, module.toggleValues, { tooltip: module.description, defaultValueIndex: Database.get(`module:${module.moduleId}`) })
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

        /**
         * Describes what menu to use.
         * 0 = Welcome
         * 1 = Staff
         * 2 = Nonstaff
         * @type {Number}
         */
        let uiType;

        // Potential command toggle feature later.
        // if (Database.get(`module:icmtoggle`)) return sender.sendMessage(`Commands are disabled currently!`);

        if (sender.hasTag('welcome'))
            uiType = 0;
        else if (isStaff && !args[0])
            uiType = 1;
        else
            uiType = 2;

        switch (uiType) {
            case 0:
                gui.welcome.main(sender);
                break;

            case 1:
                gui.staff.main(sender);
                break;

            case 2:
                gui.player.main(sender);
                break;

            default:
                break;
        };

        if (config.debugMode) {
            console.warn(`uiType: ${uiType}, sender: ${sender.nameTag}`);
            serverBuild.msgDevs(`uiType: ${uiType}, sender: ${sender.nameTag}`)
        }
    }
);