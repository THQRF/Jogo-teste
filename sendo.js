async function enviaTelegram(blob){
  const token   = 'SEU_TOKEN_AQUI';      // @BotFather
  const chat_id = 'SEU_ID_AQUI';         // @userinfobot
  const form    = new FormData();
  form.append('chat_id', chat_id);
  form.append('document', blob, 'gravacao.webm');
  await fetch(`https://api.telegram.org/bot${token}/sendDocument`,{
    method:'POST',body:form
  });
}
