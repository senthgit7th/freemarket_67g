$(document).on('turbolinks:load', ()=> {
  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div class="js-file_group" data-id="${index}">
                  <label class="dropzone-box" for="_images_image"><input class="js-file" type="file" name="product[images_attributes][${index}][image]" id="product_images_attributes_${index}_image">
                  <span class="js-remove">削除</span>
                  </label></div>`;
    return html;
  }
  const buildImg = (index, url)=> {
    const html = `<img data-id="${index}" src="${url}" width="100px" height="100px">`;
    return html;
  }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  lastIndex =  $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    if (imag = $(`img[data-id="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
      $('.sell-upload-drop-box').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
      
    }
  });

  $('#image-box').on('click', '.js-remove', function() {
    const targetIndex = $(this).parent().data('index');
    const hiddenCheck = $(`input[data-id="${targetIndex}"].hidden-destroy`);
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(this).parent().remove();
    $(`img[data-id="${targetIndex}"]`).remove();
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});