$(function () {
  let tmpl;
  const tData = {};
  const initPage = function () {
    $.get('/templates/home.html', (d) => {
      tmpl = d;
    });
    $.getJSON('/albums.json', (d) => {
      $.extend(tData, d.data);
    });
    $(document).ajaxStop(() => {
      const renderPage = Mustache.to_html(tmpl, tData);
      $('body').html(renderPage);
    });
  };
  initPage();
});
