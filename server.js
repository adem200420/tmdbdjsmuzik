var dbd = require('dbd.js')
var fs = require('fs')
var bot = new dbd.Bot({
	token:process.env.TOKEN,
	prefix:"$getServerVar[prefix]"
})
bot.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {	
	const command = require(`./komutlar/${file}`)
	bot.command({
		name: command.name,
		code: command.code
	})
}
bot.variables({
  prefix:"!"
})

  bot.command({
    name:"prefix",
    code:`
    $argsCheck[1;Prefix Değiştirmek İçin $getServerVar[prefix]prefix <yenideğer>]
    $setServerVar[prefix;$noMentionMessage]
    Artık Prefixim $noMentionMessage
    $onlyPerms[admin;Bunun İçin Yetkin Bulunmuyor]
    $onlyIf[$message!=;Bir Prefix Gir]`
  })//Prefix Sistemi

bot.command({
  name:"eval",
  code:`
  $onlyForIDs[662526937251577878;Geliştiricim Değilsin]
  $onlyIf[$message!=;Kod Denemek İçin Bişi Gir]
  $eval[$message]`
})//Kod Deneme

bot.command({
  name:"ping",
  code:`Pingim $pingms`
})

bot.readyCommand({
channel: "760265034500145203",
code: `
Aktifleştirildim.

Güncel İstatistiklerim ;

\`\`$serverCount\`\` Sunucu !
\`\`$allMembersCount\`\` Üye !`
})