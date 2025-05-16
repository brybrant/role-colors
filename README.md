# Role Colors

Custom Command code for [YAGPDB.xyz](https://yagpdb.xyz/) to facilitate self-assignable color roles in [Discord](https://discord.com/).

[Preview the colors](https://brybrant.github.io/role-colors/)

## Setup

### Create 50 roles in your Discord server:

<details>
  <summary>Roles</summary>

  |Role #|Role Name|Role Color|
  |  ---:|---------|----------|
  |1|Bright Red|`#ff281d`|
  |2|Bright Orange|`#ff9d1d`|
  |3|Bright Yellow|`#ffe620`|
  |4|Bright Green|`#7aff26`|
  |5|Bright Teal|`#24ffd2`|
  |6|Bright Cyan|`#21e6ff`|
  |7|Bright Blue|`#1fa6ff`|
  |8|Bright Violet|`#5d2dff`|
  |9|Bright Magenta|`#d22cff`|
  |10|Bright Pink|`#ff28a1`|
  |11|Deep Red|`#a40000`|
  |12|Deep Orange|`#a16000`|
  |13|Deep Yellow|`#9f8f00`|
  |14|Deep Green|`#469f00`|
  |15|Deep Teal|`#009f82`|
  |16|Deep Cyan|`#008fa0`|
  |17|Deep Blue|`#0066a3`|
  |18|Deep Violet|`#3800a8`|
  |19|Deep Magenta|`#8400a4`|
  |20|Deep Pink|`#a30064`|
  |21|Muted Red|`#a15b51`|
  |22|Muted Orange|`#a0764d`|
  |23|Muted Yellow|`#9f954f`|
  |24|Muted Green|`#6c9f58`|
  |25|Muted Teal|`#539f8a`|
  |26|Muted Cyan|`#50949f`|
  |27|Muted Blue|`#517ca0`|
  |28|Muted Violet|`#6163a1`|
  |29|Muted Magenta|`#9061a0`|
  |30|Muted Pink|`#a05b79`|
  |31|Pastel Red|`#ffb1a4`|
  |32|Pastel Orange|`#ffce9e`|
  |33|Pastel Yellow|`#fff3a2`|
  |34|Pastel Green|`#c5ffae`|
  |35|Pastel Teal|`#a7ffe4`|
  |36|Pastel Cyan|`#a2f2ff`|
  |37|Pastel Blue|`#a4d5ff`|
  |38|Pastel Violet|`#b7bcff`|
  |39|Pastel Magenta|`#edbaff`|
  |40|Pastel Pink|`#ffb1d1`|
  |41| White|`#ffffff`|
  |42| Gray 8|`#e3e3e3`|
  |43| Gray 7|`#c6c6c6`|
  |44| Gray 6|`#aaaaaa`|
  |45| Gray 5|`#8e8e8e`|
  |46| Gray 4|`#717171`|
  |47| Gray 3|`#555555`|
  |48| Gray 2|`#393939`|
  |49| Gray 1|`#1c1c1c`|
  |50| Black|`#010101`|
  </details>

### Create two Custom Commands in the YAGPDB.xyz control panel for your Discord server with the following settings:

#### Custom Command 1: Post/update the color menu message


  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Trigger</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Command</td>
        <td><code>colors</code></td>
        <td><a href="./yagpdb-custom-commands/color-menu.yag">color-menu.yag</a></td>
      </tr>
    </tbody>
  </table>

- **Make sure to replace `<color channel id>` with the ID of the channel that the color menu message will be posted to.**

- **You must afford the bot permission to post messages to the designated channel or else the command will fail.**

#### Custom Command 2: Set color role on interacting user


  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Trigger</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Message Component</td>
        <td><code>^color-menu-\d$</code></td>
        <td><a href="./yagpdb-custom-commands/interaction.yag">interaction.yag</a></td>
      </tr>
    </tbody>
  </table>

## gg sans

This project uses Discord's proprietary font ["gg sans"](https://support.discord.com/hc/en-us/articles/9507780972951-gg-sans-Font-Update-FAQ) which is Copyright &copy; Discord Inc.