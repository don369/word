$(document).ready ->
  on_audio_btn_click()
  onLoadExtension()

  $('#get_word_btn').click (e)->
    e.preventDefault()
    val = $('#name').val()
    $.get '/words/search?word='+ val, ajax_callback, 'json'

  $('#btn_my_word_submit').click (e)->
    e.preventDefault()
    $.post '/words/new', ajax_on_new_callback, 'json'


ajax_on_new_callback = (data)->
    status = data.status
    my_words = data.word
    if status == 'OK'
      fillInExtension(my_words)
    else
      alertErrShow '出错了！！'

ajax_callback = (data)->
  fillWord data.lexicon
  if data.my_word?
    fillInExtension data.my_word
  else
    btn_name = "将#{data['name']}添加进单词本"
    btn_my_word_submit = $('#btn_my_word_submit')
    $('#my_word_extension').removeProp('disabled').val('')
    btn_my_word_submit.removeProp('disabled').val(btn_name)
    if data.lexicon
      btn_my_word_submit.show()
      $('#alert_div').hide()
    else
      btn_my_word_submit.hide()
      alertErrShow '找不到该单词！'
             
  on_audio_btn_click()
  return 



fillWord = (lexicon)->
  return false if not lexicon?
  $('#UK').html lexicon['UK'] 
  $('#US').html lexicon['US']
  $('#audio_uk').attr 'src', lexicon['UKMP3'] 
  $('#audio_us').attr 'src', lexicon['USMP3'] 
  $('#interpetation').html lexicon['interpetation']
  $('#my_word_word').val lexicon['name']
  return true

onLoadExtension = ()->
  val = $('#my_word_extension').val()
  fillInExtension() if val


fillInExtension = (data)->
  text = if data 
    '该单词已经添加在你个人单词本^_^' 
  else
    '已添加进单词本！'
  $('#my_word_extension').val(data.word) if data
  $('#my_word_extension').attr('disabled', 'disabled');
  alertShow text
  #$('#alert_div').addClass('alert alert-success').html(text).show();
  $('#btn_my_word_submit').hide();

on_audio_btn_click = ->
  $("button[data-id]").click (e)->
    e.preventDefault()
    mp3 = document.getElementById($(this).attr('data-id'))
    mp3.play();
    return

alertErrShow = (text)->
  alertShow text, 'alert-danger'
  return

alertShow = (text, css = 'alert-success')->
  alert_div = $('#alert_div')
  alert_div.addClass('alert ' + css).html(text).show()
  return


    