import { commandBuild } from '../core/classes/commandBuilder.js'
import { config } from "../core/config.js";

commandBuild.register(
    {
        name: 'status',
        description: 'Manage status tags on a target or self',
        for_staff: true,
        usage: [
            'status',
            'status list @player'
          //...
        ],
        aliases: [],
        examples: [
            'status add @player <tag id'
            'status list @player'
        ]
    },
    (data, args) => {
        const sender = data.sender;
        const isStaff = sender.hasTag(config.staffTag);
        let text = [];

        if (args.length < 1) {
        
        };
   }; 

        sender.sendMessage(text.join('§r\n'))
    },
    (data, args) => { }
);
