'use strict'
$(function(){

  var result = '';

  // 取得するタブの条件
  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  // タブの情報を取得する
  chrome.tabs.query(queryInfo, function (result) {
    // 配列の先頭に現在タブの情報が入っている
    var currentTab = result.shift();

    $('#url').html(currentTab.url);

    chrome.tabs.sendMessage(currentTab.id, 'callContentScript', function(response) {
      // postYahoo(response.data.document);

      // title
      $('#title').html(response.data.title);

      // description
      if(response.data.description) {
        $('#description').html(response.data.description);
      }

      // hタグ
      $('#h1-text').html(response.data.h1);

      $('#subtitle').html(response.data.subtitle);

      console.log(response.data);

    })
  })

  // popupが開かれた時にbackground.jsに開かれたことを送信、コールバックでhtmlに差し込み
  // chrome.runtime.sendMessage('callBackground', function(response) {
  //   if (response.url != $('#url').text()) {
  //     $('#x-robots-tag').prev().addClass('is-warning');
  //     $('#x-robots-tag').addClass('is-warning');
  //     $('#xRobotsTag-state').text('更新してください');
  //   } else {
  //     $('#x-robots-tag').html(response.message);
  //     // x-robots-tagの値があった場合
  //     if (response.message) {
  //       $('#x-robots-tag').prev().addClass('is-warning');
  //       $('#x-robots-tag').addClass('is-warning');
  //       $('#xRobotsTag-state').text('担当者に確認してください。');
  //     }
  //   }
  // })

  //tabの制御
  $('.tab-label').on('click', function(){
    var currentTab = $(this).index();
    $(".tab-label").removeClass("active");
    $(".panel").removeClass("active");
    $(this).addClass("active");
    $(".panel").eq(currentTab).addClass("active");
  });
});
