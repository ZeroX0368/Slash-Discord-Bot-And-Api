const { EmbedBuilder } = require("discord.js");

const EMBED_COLORS = {
  BOT_EMBED: '#5865F2'
};

module.exports = (member) => {
  let color = member.displayHexColor;
  if (color === "#000000") color = EMBED_COLORS.BOT_EMBED;

  let rolesString = member.roles.cache.map((r) => r.name).join(", ");
  if (rolesString.length > 1024) rolesString = rolesString.substring(0, 1020) + "...";

  const embed = new EmbedBuilder()
    .setAuthor({
      name: `User information for ${member.displayName}`,
      iconURL: member.user.displayAvatarURL(),
    })
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(color)
    .addFields(
      {
        name: "Username",
        value: member.user.username,
        inline: true,
      },
      {
        name: "ID",
        value: member.id,
        inline: true,
      },
      {
        name: "Guild Joined",
        value: member.joinedAt.toUTCString(),
      },
      {
        name: "Discord Registered",
        value: member.user.createdAt.toUTCString(),
      },
      {
        name: `Roles [${member.roles.cache.size}]`,
        value: rolesString,
      },
      {
        name: "Avatar-URL",
        value: member.user.displayAvatarURL({ extension: "png" }),
      }
    )
    .setFooter({ text: `Requested by ${member.user.tag}` })
    .setTimestamp(Date.now());

  return { embeds: [embed] };
};
