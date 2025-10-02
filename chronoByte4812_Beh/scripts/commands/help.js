import { commandBuild } from '../core/classes/commandBuilder.js'
import { config } from "../core/config.js";

commandBuild.register(
    {
        name: 'help',
        description: 'Provide help on a command or show all available commands registered',
        for_staff: false,
        usage: [
            'help',
            'help <command name>'
        ],
        aliases: [],
        examples: [
            'help',
            'help gui'
        ]
    },
    (data, args) => {
        const sender = data.sender;
        const isStaff = sender.hasTag(config.staffTag);
        const allCommands = commandBuild.getAllCommands(isStaff);
        let text = [];

        if (args.length < 1) {
            text.push(`${config.msgPrefix}Command prefix: §c${config.prefix}`);

            if (allCommands.length < 1)
                text.push(`§8[§cNo ${isStaff ? 'staff' : 'player'} commands registered§8]`);
            else
                text.push(`${config.msgPrefix}All commands available: §c${allCommands.map((cmd) => cmd.name).sort().join(', ')}`);
        }
        else {
            const cmdInQuestion = commandBuild.getCommand(args[0]);

            if (cmdInQuestion) {
                text.push(`${config.msgPrefix}Command name: §c${cmdInQuestion.name}`);
                text.push(`${config.msgPrefix}Command description: §c${cmdInQuestion.description}`);
                text.push(`${config.msgPrefix}Command usage: §c[ ${cmdInQuestion.usage.length < 1 ? 'none' : cmdInQuestion.usage.join(', ')} ]`);
                text.push(`${config.msgPrefix}Command aliases: §c[ ${cmdInQuestion.aliases.length < 1 ? 'none' : cmdInQuestion.aliases.join(', ')} ]`);
                text.push(`${config.msgPrefix}Command examples: §c[ ${cmdInQuestion.examples.length < 1 ? 'none' : cmdInQuestion.examples.join(', ')} ]`);
                text.push(`${config.msgPrefix}Command for staff?: §c${cmdInQuestion.for_staff}`);
            }
            else {
                text.push(`${config.msgPrefix}The command §c${args[0]}§d was not found`);
            };
        }; sender.sendMessage(text.join('§r\n'))
    },
    (data, args) => { }
);