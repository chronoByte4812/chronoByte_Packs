import { commandBuild } from '../../core/classes/commandBuilder.js';

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
const generalModules = [
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
        const oldValue = Number(Database.get(module.moduleId));
        if (config.debugMode === true) {
            console.warn(`newValue: ${newValue}, oldValue: ${oldValue}`);
        };

        if (oldValue !== newValue) {
            world.sendMessage(`${sender.name} has set the module ${module.name} to ${module.toggleValues[newValue]}`);
            Database.set(module.moduleId, newValue ?? 0);
        };
    } catch (error) {
        console.error(
            `An error occured while setting modules: ${error}\n${error.stack}`
        );
    };
};

export const gui = {
    staff: {
        modules: (sender) => {
            const v = new ModalFormData();

            v.title('World Modules');

            for (const module of generalModules) {

                module.toggleValues.length === 2 ?
                    v.toggle(module.name, { tooltip: module.description, defaultValue: Boolean(Database.get(module.moduleId)) }) :
                    v.dropdown(module.name, module.toggleValues, { tooltip: module.description, defaultValueIndex: Database.get(module.moduleId) })
            };

            v.show(sender).then((result) => {
                if (result.canceled === true) return gui.staff.main(sender);

                for (let i = 0; i < generalModules.length; i++) {
                    const currentModule = generalModules[i];

                    if (Database.get(currentModule.moduleId) !== result.formValues[i])
                        setModule(sender, currentModule, Number(result.formValues[i]));
                }; gui.staff.main(sender);
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
            'gui',
        ],
        examples: [
            'gui',
        ]
    },
    (data, args) => { console.warn('[0]') },
    (data, args) => { console.warn('[1]') }
);