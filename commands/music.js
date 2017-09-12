const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const request = require('request')
const fs = require('fs')
const getYoutubeID = require('get-youtube-id')
const fetchVideoInfo = require('youtube-info')

var guilds = {}

exports.run = async(client, message, args, level) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let yt_key = client.config.youtube;
    let newArg = args.slice(1)

    switch (args[0].toLowerCase()) {
        case "play":
            if (!message.member.voiceChannel) {
                message.channel.sendEmbed(new Discord.RichEmbed()
                    .addField('Error!', `You must be in a voice channel!`)
                    .setColor(0xff5454)
                );
                return;
            }
            if (newArg.length < 1) {
                message.channel.sendEmbed(new Discord.RichEmbed()
                    .addField('Error!', `Give me a youtube link or search term!`)
                    .setColor(0xff5454)
                );
                return;
            }
            if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
                getID(newArg.join(' '), function (id) {
                    add_queue(id, message);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        message.channel.sendEmbed(new Discord.RichEmbed()
                            .setAuthor(`Song Added: ${videoInfo.title}!`, client.user.avatarURL)
                            .addField('Uploaded By:', `${videoInfo.owner}`, true)
                            .addField('Requested By:', `${message.author.tag}`, true)
                            .addField('Duration:', `${videoInfo.duration}s`, true)
                            .setThumbnail(videoInfo.thumbnailUrl)
                            .setColor(0x5697ff)
                        );
                        guilds[message.guild.id].queueNames.push(videoInfo.title)
                    })
                })
            } else {
                guilds[message.guild.id].queueNames.isPlaying = true;
                getID(newArg.join(' '), function (id) {
                    guilds[message.guild.id].queue.push(id)
                    playMusic(id, message);
                    fetchVideoInfo(id, function (err, videoInfo) {
                        if (err) throw new Error(err);
                        message.channel.sendEmbed(new Discord.RichEmbed()
                            .setAuthor(`Song Added! Now playing ${videoInfo.title}!`, client.user.avatarURL)
                            .addField('Uploaded By:', `${videoInfo.owner}`, true)
                            .addField('Requested By:', `${message.author.tag}`, true)
                            .addField('Duration:', `${videoInfo.duration}s`, true)
                            .setThumbnail(videoInfo.thumbnailUrl)
                            .setColor(0x5697ff)
                        );
                        guilds[message.guild.id].queueNames.push(videoInfo.title)
                    })
                })
            }
            break;
        case 'skip':
            if (!guilds[message.guild.id].isPlaying) return message.channel.send('Nothing\'s playing, ya derp')
            if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
                guilds[message.guild.id].skippers.push(message.author.id)
                guilds[message.guild.id].skipRequest++
                    if (guilds[message.guild.id].skipRequest >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
                        skip_song(message)
                        message.channel.send('The song has been skipped!')
                    } else {
                        message.channel.send(`You need ${Math.ceil(((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipRequest)} more votes!`)
                    }
            } else {
                message.channel.send('You\'ve already voted to skip!')
            }
            break;
        case 'queue':
            if (!guilds[message.guild.id].isPlaying) return message.channel.send('Nothing\'s playing, ya derp')
            var stuff = '```\n(Currently Broken)\n'
            for (i in guilds[message.guild.id].queueNames) {
                var temp = (i + 1) + ': ' + guilds[message.guild.id].queueNames[i] + (i === 0 ? " (Current Song)" : '') + "\n"
                if ((stuff + temp).length <= 2000 - 3) {
                    stuff += temp
                } else {
                    stuff += '```'
                    message.channel.send(stuff)
                    stuff = '```'
                }
            }
            stuff += '```'
            message.channel.send(stuff)
            break;
        case 'end':
            if (!guilds[message.guild.id].isPlaying) return message.channel.send('Nothing\'s playing, ya derp')
            guilds[message.guild.id].queue = []
            guilds[message.guild.id].queueName = []
            guilds[message.guild.id].isPlaying = false;
            guilds[message.guild.id].dispatcher.end()
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `That's not a valid command! Do ${settings.prefix}music [play/queue/skip/end] <link/search_term>`)
                .setColor(0xff5454)
            );
    }

    function skip_song(message) {
        guilds[message.guild.id].dispatcher.end()
    }

    function playMusic(id, message) {
        guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



        guilds[message.guild.id].voiceChannel.join().then(function (connection) {
            stream = ytdl('https://www.youtube.com/watch?v=' + id, {
                filter: 'audioonly'
            })
            guilds[message.guild.id].skipRequest = 0;
            guilds[message.guild.id].skippers = [];

            guilds[message.guild.id].dispatcher = connection.playStream(stream)
            guilds[message.guild.id].dispatcher.on('end', function () {
                guilds[message.guild.id].skipRequest = 0;
                guilds[message.guild.id].skippers = [];
                guilds[message.guild.id].queue.shift();
                guilds[message.guild.id].queueNames.shift()
                if (guilds[message.guild.id].queue.length === 0) {
                    guilds[message.guild.id].queue = []
                    guilds[message.guild.id].queueName = []
                    guilds[message.guild.id].isPlaying = false;
                    guilds[message.guild.id].dispatcher.end()
                    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

                } else {
                    setTimeout(function () {
                        playMusic(guilds[message.guild.id].queue[0], message)
                        fetchVideoInfo(guilds[message.guild.id].queue[0], function (err, videoInfo) {
                            if (err) throw new Error(err);
                            message.channel.sendEmbed(new Discord.RichEmbed()
                                .setAuthor(`Now playing: ${videoInfo.title}!`, client.user.avatarURL)
                                .addField('Uploaded By:', `${videoInfo.owner}`, true)
                                .addField('Duration:', `${videoInfo.duration}s`, true)
                                .setThumbnail(videoInfo.thumbnailUrl)
                                .setColor(0x5697ff)
                            );
                            guilds[message.guild.id].queueNames.push(videoInfo.title)
                        })
                    }, 1000)
                }
            })
        })
    }

    function isYoutube(str) {
        return str.toLowerCase().indexOf('youtube.com') > -1
    }

    function search_video(query, callback) {
        request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_key, function (error, response, body) {
            var json = JSON.parse(body);
            if (!json.items[0]) return;
            callback(json.items[0].id.videoId);
        });
    }

    function add_queue(strID, message) {
        if (isYoutube(strID)) {
            guilds[message.guild.id].queue.push(getID(strID))
        } else {
            guilds[message.guild.id].queue.push(strID)
        }
    }

    function getID(str, cb) {
        if (isYoutube(str)) {
            cb(getYoutubeID(str))
        } else {
            search_video(str, function (id) {
                cb(id)
            })
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "music",
    category: "Music",
    description: "I play music for you! Note: I have subcommands! Do i.help music to see them!",
    furtherDescription: "I play whatever music you would like me to play in a voice channel!\n```Subcommands:\ni.music play [url/search_term]\ni.music skip\ni.music queue\ni.music stop```",
    usage: "music [play/queue/skip/end]"
};