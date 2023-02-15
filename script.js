// ? payload sample

const payload = {
  email: 'fake.email@live.com',
  name: 'FakeName',
  subject: "Here's your Daily Digest for Jan 8, 2023",
  title: 'Daily Digest',
  type: 'DailyDigest',
  activities: [
    {
      mentions: [
        {
          _id: '',
          serverId: '',
          body: '',
          replier: { id: 1 },
          replyBody: '',
          user: {
            id: '1',
            user_image: '',
            avatar: '',
            name: '',
            nicename: '',
            first: ''
          }
        }
      ],
      replies: [
        {
          _id: '',
          serverId: '',
          body: '',
          replier: { id: 1 },
          replyBody: '',
          user: {
            id: '',
            user_image: '',
            avatar: '',
            name: '',
            nicename: '',
            first: ''
          }
        }
      ],
      serverId: 'yourId',
      name: 'Your Official',
      cname: 'youPage.official.com',
      image: '',
      totalCount: { mentions: 0, replies: 0, comments: 13 },
      groupedComments: [
        {
          data: [
            {
              _id: '',
              body: '',
              user: {
                id: '',
                nicename: '',
                avatar: '',
                first: '',
                name: '',
                user_image: ''
              }
            }
          ],
          topic: { _id: '6361320418f6654dd167d421', topic: 'Chit Chat' }
        },
      ]
    }
  ]
}

const fs = require("fs");

// ? ======================== HTML HEAD ========================
const htmlHead = `
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Digest</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
  <table id="parent" style="margin: 0 auto; background: #F7F7F6; font-family: 'Roboto', sans-serif;" cellpadding="0" cellspacing="0"
    width="600">
  `;

// ? =================== Reusable Templates ======================
function mainHeader(payload) {
  return `
    <tr>
      <th style="padding: 32px 0" align="center">
        <img style="object-fit: cover; border-radius: 50%; width: 45px; height: 45px; vertical-align: middle;" src="${payload.image || 'yourLogo'}"
          alt="" width="45" height="auto">
        <h3 style="margin: 0 0 0 16px; display: inline-block; color: #22314C;">
          ${payload.name || 'YourPage'}
        </h3>
      </th>
    </tr>

    <tr>
      <td width="100%" height="1" colspan="2">
        <div style="border-bottom: solid 1px #C4C4C4"></div>
      </td>
    </tr>
  `
}


function secondaryHeader(payload) {
  return `
    <tr>
      <th colspan="2">
        <h2 style="margin: 0; padding: 40px 0 16px 0; font-size: 22px; color: #33343C;">
          Hey, ${payload.name}!
        </h2>
      </th>
    </tr>
    <tr>
      <th colspan="2">
        <h1 style="margin: 0; font-size: 28px; padding-bottom: 32px; color: #33343C;">
          ${payload.subject}
        </h1>
      </th>
    </tr>
  `
}

const divider = `
    <tr>
      <th colspan="2" style="padding: 0 20px 20px 20px; background-color: #FFFFFF;">
        <div style="border-bottom: 1px solid rgba(191, 191, 191, 0.5);"></div>
      </th>
    </tr>
    `

function closingHtml(payload) {
  // <form action="${config.get('servers:uri')}/api/serverApi/unsubscribeDigest/${payload.userId}" method="post">
  //   <input type="hidden" name="data" value="value">
  //   <input type="submit" value="Unsubscribe from our Daily Digest" 
  //     style="background-color: transparent; border: none; color: #999; font-style: italic; font-size: 10px; font-weight: 400; cursor: pointer; text-decoration: underline;">
  // </form>
  return `
    <table style="margin: 8px auto; font-family: 'Roboto', sans-serif;" cellpadding="0" cellspacing="0" width="600">
      <tr align="left">
        <th>
          <a>form here</a>
        </th>
      </tr>
    </table>
  </body>
  </html>`
}

function populateNotyHeader(header, type) {
  return `
      <table style="padding: 0 32px; margin: 0 auto; background: #F7F7F6; font-family: 'Roboto', sans-serif;" width="600" cellspacing="0">
        <th style="padding: 0">
          <table style="font-family: 'Roboto', sans-serif;" width="100%" cellspacing="0">
            <tr style="background-color: #FFFFFF;">
              <th style="padding: ${ type  || '32px 24px'}" colspan="2">
                <h3 style="margin: 0; font-size: 24px; font-weight: 500; color: #33343C;">
                  ${header}
                </h3>
              </th>
            </tr>
          `
}

// ? message body
function populateMessageBody(data) {
  return ` 
      <tr style="background-color: #FFFFFF;">
        <td style="padding: 0; vertical-align:  top;">
          <img style="border-radius: 50%; margin: 4px 16px 0 24px; object-fit: cover;"
            src=${data.user.user_image} alt="" width="56"
            height="56">
        </td>
        <td width="100%" style="word-break: break-word;">
          <table style="font-family: 'Roboto', sans-serif; text-align: left;">
            <tr>
              <td>
                <h5 style="font-size: 14px; display: inline; margin-right: 8px; color: #304161;">${data.user.name}</h5>
                <span style="font-size: 12px; font-weight: 400; color: #8B8B8B;">@${data.user.nicename}</span>
              </td>
            </tr>
            <tr>
              <td style="font-size: 12px; font-weight: 400; color: #33343C; display: block; margin-right: 48px;">
                ${data.body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      `
}

// ? go to conversation button
function goToConvoButton(data) {
  return `
        <tr style="background-color: #FFFFFF;">
          <th width="100%" colspan="2" align="right">
            <a href="${data}" class="button flex" target="_blank"
              style="text-decoration: none; background: #D9D9D9; padding: 6px 8px; border-radius: 4px; margin: 24px 40px 16px 0; display: inline-block; color: #1B1C1D; line-height: 14px; font-size: 14px;">
              Go to Conversation
            </a>
          </th>
        </tr>
      `
}

// ? populate more replies link
function moreRepliesButton(total, dataLen, type, cname) {
  if (total - dataLen) {
    return `
        <table style="margin: 0 auto; padding: 8px; background: #F7F7F6; font-family: 'Roboto', sans-serif;" cellpadding="0" cellspacing="0"
          width="${type === 'replies' ? '100%' : 600}">
          <tr align="right">
            <th>
            <a href="http://${cname ? cname : 'genesiv.com' + /app/}"
                style="color: #43464F; font-style: italic; font-size: 12px; font-weight: 400; padding: 0 ${type === 'replies' ? '10px' : '32px'} 40px 0; display: block;">
                And ${total - dataLen} more ${type}...
              </a>
            </th>
          </tr>
        </table>`
  } else {
    return `
        <table style="${type === 'conversations' ? 'margin: 0 auto; background: #F7F7F6; height: 32px" cellpadding="0" cellspacing="0" width="600"' : 'margin: 16px auto;'}"></table>
      `
  }
}

function filterDataForCompatibility(text) {
  let overflowCounter = 0

  // ? change hyper link colours
  if (text.includes('target="_blank')) {
    text = text.replaceAll('target="_blank">', 'target="_blank" style="color: #33343C">');
  }

  // ? resize the video =========== disabled as emails send doesn't support videos
  // if (text.includes('<video height="250"')) {
  //   text = text.replaceAll('<video height="250"', '<video height="200"');
  // }
  
  // ? replace video with [video]
  if (text.includes('<video')) {
    const toReplace = text.slice(text.indexOf('<video'), text.indexOf('</video>') + 8);
    text = text.replace(toReplace, '[video]');
  }

  // ? resize the images
  if (text.includes('<img ') ) {
    text = text.replaceAll('<img ', '<img width="300"');
  }

  // ? ------- extract emojis -------
  // ? if we want .png instead of unicode
  // if (text.includes('data-src="/img/emojis/')) {
  //   text = text
  //     .replaceAll('src="/img/emojis/', 'src="https://genesiv.com/app/img/emojis/')
  //     .replaceAll('<img width="300"', '<img width="14"')
  //     .replaceAll('<span id="emojikb-span"', '<span id="emojikb-span" style="vertical-align: middle;"');
  // }

  // ? unicode ---- doesn't seem to work on gmail
  while (text.includes('<span id="emojikb-span">')) {
    const emojiCode = text.slice(text.indexOf('data-unicode="') + 14, text.indexOf('data-category') - 2);
    const toReplace = text.slice(text.indexOf('<span id="emojikb-span">'), text.indexOf('.png">') + 6);
    text = text.replace(toReplace, `<span style="vertical-align: top; line-height: 14px;">&#x${emojiCode}`);

    if (overflowCounter++ > 1000) break;
  }

  // ? remove all the images 
  // while (text.includes('<img width="300"')) {
  //   const toReplace = text.slice(text.indexOf('<img width="300"'), text.indexOf('>') + 1);
  //   text = text.replace(toReplace, '[image]')

  //   if (overflowCounter++ > 1000) break;
  // }

  // ? remove links content
  if (text.includes('<div class="embed embed-chat">')) {
    text = text.replaceAll(text.slice(text.indexOf('<div class="embed embed-chat">'), text.indexOf('/></div></div>') + 14), '');
  }

  // ? filter out channels
  while (text.includes('<div class="ui keylabel label forum-topic-pan')) {
    const toReplace = text
      .slice(text.indexOf('<div class="ui keylabel label forum-topic-pan'), text.indexOf('</div>') + 6);
    const mentionedChannel = text
      .slice(text.indexOf('contenteditable="false">') + 24, text.indexOf('</div>'));
    text = text.replace(toReplace, `<span style="color: #304161; font-weight: bold;">${mentionedChannel}</span>`);

    if (overflowCounter++ > 1000) break;
  }

  // ? filter out the mentions 
  while (text.includes('<div class="ui keylabel label"')) {
    const toReplace = text
      .slice(text.indexOf('<div class="ui keylabel label"'), text.indexOf('</div>') + 6);
    const mentionedUser = text
      .substring(text.indexOf('</i>') + 4, text.indexOf('</div>'));

    text = text.replace(toReplace, `<span style="color: #304161;font-weight: bold;">@${mentionedUser}</span>`);

    if (overflowCounter++ > 1000) break;
  }

  // ? filter out the mentions
  while (text.includes('<div style="margin: 2px;"')) {
    const toReplace = text
      .slice(text.indexOf('<div style="margin: 2px;"'), text.indexOf('</div>') + 6);
    const mentionedUser = text
      .substring(text.indexOf('</i>') + 4, text.indexOf('</div>'));

    text = text.replace(toReplace, `<span style="color: #304161; font-weight: bold;">@${mentionedUser}</span>`);

    if (overflowCounter++ > 1000) break;
  }

  // ? analysis card extraction
  if (text.includes('{"type":') && text.includes('"fullCurrencyName":') && text.includes('"currencyPair":')) {
    var cleanStr = text.replace(/\s+/g, ' ').trim();
    let otpTemp = JSON.parse(cleanStr)

    text = otpTemp.content.trim();
  }
  
  return text;
}

//!===========================================================================
//!============================ Daily Digest =================================
async function createDigestEmail(payload) {
    // ? ===================================================================
  // ? -------Filters out the data based on Cname and non Cname ----------
  const cname_activities = payload.activities.filter(activity => activity.cname)
  const non_cname_activities = {
    mentions: [],
    replies: [],
    groupedComments: [],
    totalCount: {
      mentions: 0,
      replies: 0,
      comments: 0
    }
  };

  for (let activity of payload.activities.filter(activity => !activity.cname)) {
    non_cname_activities.mentions = non_cname_activities.mentions.concat(activity.mentions);
    non_cname_activities.replies = non_cname_activities.replies.concat(activity.replies);
    if (activity.groupedComments && activity.groupedComments.length > 0) {
      for (let comment of activity.groupedComments) {
        non_cname_activities.groupedComments.push({
          data: comment.data,
          topic: comment.topic,
          server: activity.name
        })
      }
    }
    non_cname_activities.totalCount.mentions += activity.totalCount.mentions;
    non_cname_activities.totalCount.replies += activity.totalCount.replies;
    non_cname_activities.totalCount.comments += activity.totalCount.comments;
  }

  let tempCombined = [non_cname_activities, ...cname_activities];
  for (let act of tempCombined) {
    act.mentions = act.mentions.slice(0, 5);
    act.replies = act.replies.slice(0, 5);
    if (act.groupedComments && act.groupedComments.length > 0) {
      for (let group of act.groupedComments) {
        group.data = group.data.slice(0, 5);
      }
    }
  }
  payload.activities = tempCombined;
  // ? ===================================================================

  for (let index = 0; index < payload.activities.length; index++) {
    if (payload.activities[index].totalCount.mentions + payload.activities[index].totalCount.replies + payload.activities[index].totalCount.comments) {
      let mainData = htmlHead;
      
      mainData += mainHeader(payload.activities[index]);  

      mainData += secondaryHeader(payload); 


      // ! --------------------------------------------------------------------------
      // ! ----------------------- populate mentions message ------------------------
      if (payload.activities[index].totalCount.mentions) {
        mainData += populateNotyHeader(`You got mentioned <b>${payload.activities[index].totalCount.mentions}</b> times`)


        for (let i in payload.activities[index].mentions) {
          const data = payload.activities[index].mentions[i];

          // ? --------- replace mentions ----------
          data.body = filterDataForCompatibility(data.body);

          mainData += populateMessageBody(data)

          mainData += goToConvoButton(`http://${payload.activities[index].cname ? payload.activities[index].cname : 'genesiv.com'}/app/`);

          if (i < payload.activities[index].mentions.length - 1) {
            mainData += divider;
          }
        }

        mainData += moreRepliesButton(payload.activities[index].totalCount.mentions, payload.activities[index].mentions.length, 'mentions', payload.activities[index].cname);


        mainData += `
                </table>
              </th>
            </table>
            `
      }

      // ! ---------------------------------------------------------------------
      // ! --------------------- populate replies message ----------------------
      if (payload.activities[index].totalCount.replies > 0) {
        mainData += populateNotyHeader(`<b>${payload.activities[index].totalCount.replies}</b> people replied to you`)

        for (let i in payload.activities[index].replies) {
          const data = payload.activities[index].replies[i];

          // ? --------- replace mentions ----------
          data.body = filterDataForCompatibility(data.body);
          data.replyBody = filterDataForCompatibility(data.replyBody);

          mainData += `
              <tr style="background-color: #FFFFFF;">
                <td style="padding: 0; vertical-align: top;">
                  <img style="border-radius: 50%; margin: 16px 16px 0 24px; object-fit: cover;"
                    src=${data.user.user_image} alt="" width="56"
                    height="56">
                </td>
                <td width="100%" style="word-break: break-word;">
                  <table style="font-family: 'Roboto', sans-serif; text-align: left; width: 100%;">
                    <tr>
                      <td>
                        <h5 style="font-size: 14px; display: inline; margin-right: 8px; color: #304161;">${data.user.name}</h5>
                        <span style="font-size: 12px; font-weight: 400; color: #8B8B8B;">@${data.user.nicename}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          style="background-color: #F7F7F6; width: 90%; border-radius: 5px; font-family: 'Roboto', sans-serif;"
                          cellpadding="0" cellspacing="0">
                          <tr>
                            <th style="width: 5px; background-color: #304161; border-radius: 4px 0 0 4px;"></th>
                            <th>
                              <table style="margin: 8px; font-family: 'Roboto', sans-serif;">
                                <tr>
                                  <td>
                                    <h6 style="color: #304161; margin: 0; font-size: 11px;">  
                                      ${payload.name}
                                    </h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p style="margin: 0; font-size: 10px; font-weight: 400;">
                                      ${data.replyBody} 
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </th>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 12px; font-weight: 400; color: #33343C; display: block; margin: 0 48px 0 15px;">
                        ${data.body}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              `

          mainData += goToConvoButton(`http://${payload.activities[index].cname ? payload.activities[index].cname : 'genesiv.com'}/app/`);

          if (i < payload.activities[index].replies.length - 1) {
            mainData += divider;
          }
        }
        
        mainData += `
              <tr>
                <td colspan="2">
                  ${moreRepliesButton(payload.activities[index].totalCount.replies, payload.activities[index].replies.length, 'replies', payload.activities[index].cname)}
                </td>
              </tr>
            </table>
          </th>
        </table>
        `
      }

      // ! ---------------------------------------------------------------------------
      // ! ---------------------- populate missed conversations ----------------------
      if (payload.activities[index].totalCount.comments) {
        mainData += populateNotyHeader(`You missed <b>${payload.activities[index].totalCount.comments}</b> conversations`, '32px 24px 0 24px')
        
        mainData += `
          </table>
        </th>
      </table>`

        let totalMessagesDisplayed = 0;
        for (let i in payload.activities[index].groupedComments) {
          let notyHeader = ''
          if (payload.activities[index].cname) {
            notyHeader = `<b>#${payload.activities[index].groupedComments[i].topic.topic}</b>`
          } else {
            notyHeader = `<b>[${payload.activities[index].name || payload.activities[index].groupedComments[i].server}] > #${payload.activities[index].groupedComments[i].topic.topic}</b>`
          }

          mainData += populateNotyHeader(notyHeader, '24px')

          const data = payload.activities[index].groupedComments[i].data;

          for (let j in data) {
            data[j].body = filterDataForCompatibility(data[j].body);
            mainData += populateMessageBody(data[j]);
            totalMessagesDisplayed++;
          }

          mainData += goToConvoButton(`http://${payload.activities[index].cname ? payload.activities[index].cname : 'genesiv.com'}/app/${payload.activities[index].groupedComments[i].server}/${payload.activities[index].groupedComments[i].topic.topic}`);

          if (i < payload.activities[index].groupedComments.length - 1) {
            mainData += divider;
          }

          mainData += `
                </table>
              </th>
            </table>
            `
        }

        mainData += `</table>`

        mainData += moreRepliesButton(payload.activities[index].totalCount.comments, totalMessagesDisplayed, 'conversations', payload.activities[index].cname);

      }

      // ? -------------- closing the email body --------------
      mainData += closingHtml(payload);

      // content to be send! --- mainData
      let obj = {
        email: 'whateverthe@email.com',   //! for testing
        // email: payload.email,
        name: payload.name,
        subject: payload.subject,
        title: payload.title
      }
      // If cname add serverId
      if (payload.activities[index].cname) {
        obj.serverId = payload.activities[index].serverId;
      }

      await fs.promises.writeFile('digestTemplate.html', mainData);
      // sendEmail.sendEmailToUser(obj, mainData).then((email) => {
      //   if (email.status === 'success') res.send('via Daily Digest');
      //   else console.log('Exception in sending daily digest email ::', email.message);
      // }).catch((err) => {
      //   console.log('Exception in sending daily digest email ::', err);
      // });
    }
  }
}

createDigestEmail(payload);