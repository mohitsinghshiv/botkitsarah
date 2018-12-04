/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

module.exports = function(controller) {

    // controller.hears(['(.*)'], 'message_received', function(bot, message) {

    //     bot.startConversation(message, function(err, convo) {
    //         convo.say('In order to start BrandChat.me, please type your KEYWORD or CODE from the promo card or coupon.');           
    //     });

    // });

    controller.hears(['Chewy Caramel'], 'message_received', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
           // convo.say('Hi \n M&Ms Caramel here! \n Nice to meet you! \n :wave: \n You’re entered for a chance to win!\n https://s3.us-east-2.amazonaws.com/brandchat.ai/MMsFiles/Employee_IG_subt_MZPP0626000H.mp4 \n Follow Us on \n Facebook: https://www.facebook.com/mms/ \n Instagram: @mmschocolate \n Twitter: @mmschocolate \n We’ll let you know if you’ve won soon! \n');           
            convo.say('Hi');
            convo.say('👋');
            convo.say('Nice to meet you!');
            convo.say("I'm Caramel, your new love!");
            convo.say('💖');
            convo.say("I'm a Spokescandy at M&M'S Candies.");
            convo.say("You're entered for a chance to win 1 of 5 $100 Prizes💵");
            convo.say({
                attachment:{
                    'type':'video',
                    'payload':{            
                        'url':'https://s3.us-east-2.amazonaws.com/brandchat.ai/MMsFiles/Employee_IG_subt_MZPP0626000H.mp4'
                    }
                }
            });
        });

    });

    controller.hears(['color'], 'message_received', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.say('This is an example of using convo.ask with a single callback.');

            convo.ask('What is your favorite color Mohit From Local?', function(response, convo) {

                convo.say('Cool, I like ' + response.text + ' too!');
                convo.next();

            });
        });

    });


    controller.hears(['question'], 'message_received', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            // create a path for when a user says YES
            convo.addMessage({
                    text: 'How wonderful.',
            },'yes_thread');

            // create a path for when a user says NO
            // mark the conversation as unsuccessful at the end
            convo.addMessage({
                text: 'Cheese! It is not for everyone.',
                action: 'stop', // this marks the converation as unsuccessful
            },'no_thread');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
                text: 'Sorry I did not understand. Say `yes` or `no`',
                action: 'default',
            },'bad_response');

            // Create a yes/no question in the default thread...
            convo.ask('Do you like cheese?', [
                {
                    pattern:  bot.utterances.yes,
                    callback: function(response, convo) {
                        convo.gotoThread('yes_thread');
                    },
                },
                {
                    pattern:  bot.utterances.no,
                    callback: function(response, convo) {
                        convo.gotoThread('no_thread');
                    },
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        convo.gotoThread('bad_response');
                    },
                }
            ]);

            convo.activate();

            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // this still works to send individual replies...
                    bot.reply(message, 'Let us eat some!');

                    // and now deliver cheese via tcp/ip...
                }

            });
        });

    });

};
