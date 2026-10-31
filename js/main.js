(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('partner-inquiry');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (form.elements.namedItem('name') || {}).value || '';
    var company = (form.elements.namedItem('company') || {}).value || '';
    var territory = (form.elements.namedItem('territory') || {}).value || '';
    var email = (form.elements.namedItem('email') || {}).value || '';
    var phone = (form.elements.namedItem('phone') || {}).value || '';
    var message = (form.elements.namedItem('message') || {}).value || '';

    var body = [
      'Name: ' + name,
      'Company / Territory: ' + company + (territory ? ' — ' + territory : ''),
      'Email: ' + email,
      'Phone: ' + phone,
      '',
      'Message:',
      message
    ].join('\n');

    var mailto =
      'mailto:ericsheng1011@gmail.com' +
      '?subject=' + encodeURIComponent('Partner inquiry — NUMEROLOGIE') +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
  });
})();
