import { system, SystemAfterEvents, world } from '@minecraft/server';
import { commandBuild } from '../../core/classes/commandBuilder.js'
import { serverBuild } from '../../core/classes/serverBuilder.js';
import { config } from "../../core/config.js";

commandBuild.register(
    {
        name: 'broadcast',
        description: 'Broadcast a message to a specific group of players',
        for_staff: true,
        usage: [
            'broadcast <type> <message...>',
        ],
        aliases: [],
        examples: []
    },
    (data, args) => {
        const sender = data.sender;
        const type = args[0];
        const message = args.slice(1).join(' ');
        const validTypes = [
            'staff',
            'players',
            'dev',
        ];

        if (!type) {
            sender.sendMessage(`You must provide a type argument.`);

            return;
        };

        if (message.length < 1) {
            sender.sendMessage('You must provide message arguments.');

            return;
        };

        switch (type) {
            case validTypes[0]: // Send message to all staff members
                serverBuild.msgStaff(message);
                break;
            case validTypes[1]: // Send message to all players
                serverBuild.msg(message);

                break;
            case validTypes[2]: // Send message to all devs
                serverBuild.msgDevs(message);

                break;

            default:
                sender.sendMessage(`Invalid broadcast types, valid types include": ${validTypes.join(', ')}`)
                break;
        };
    }
);